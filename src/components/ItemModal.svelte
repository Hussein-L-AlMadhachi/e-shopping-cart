<script lang="ts">
import { createEventDispatcher } from 'svelte';
import type { CartItem } from '../lib/types';
import { cartItems } from '../lib/store';

export let show = false;
export let editingItem: CartItem | null = null;

const dispatch = createEventDispatcher();

let formData = {
    name: '',
    price: 0,
    image: 'https://images.unsplash.com/photo-1593642632823-8fa79879a636?w=500&q=80',
    description: '',
    limit: 5,
    quantity: 1
};

$: if (editingItem) {
    formData = { ...editingItem };
} else {
    // Only reset if showing for new item (controlled by parent resetting editingItem)
}

// Reset when modal opens for new item
$: if(show && !editingItem) {
    formData = {
        name: '',
        price: 0,
        image: 'https://images.unsplash.com/photo-1593642632823-8fa79879a636?w=500&q=80',
        description: '',
        limit: 5,
        quantity: 1
    };
}

function handleSubmit() {
    if (!formData.name || formData.price <= 0) {
        alert('Please fill valid name and price');
        return;
    }

    if (editingItem) {
        // Update
        cartItems.update(items => items.map(i => i.id === editingItem?.id ? { ...formData, id: i.id } : i));
    } else {
        // Create
        const newItem: CartItem = {
            ...formData,
            id: Date.now().toString()
        };
        cartItems.update(items => [...items, newItem]);
    }
    close();
}

function close() {
    dispatch('close');
}
</script>

{#if show}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="backdrop" on:click={close}>
    <div class="modal" on:click|stopPropagation>
        <div class="modal-header">
            <h3>{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
            <button class="close-btn" on:click={close}>&times;</button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="name">Product Name</label>
                <input type="text" id="name" bind:value={formData.name} placeholder="e.g. Mechanical Keyboard" />
            </div>
            
            <div class="form-row">
                 <div class="form-group">
                    <label for="price">Price ($)</label>
                    <input type="number" id="price" bind:value={formData.price} min="0" step="0.01" />
                </div>
                <div class="form-group">
                    <label for="limit">Order Limit</label>
                    <input type="number" id="limit" bind:value={formData.limit} min="1" max="100" />
                </div>
            </div>

            <div class="form-group">
                <label for="image">Image URL</label>
                <input type="url" id="image" bind:value={formData.image} placeholder="https://..." />
            </div>

            <div class="form-group">
                <label for="desc">Description</label>
                <textarea id="desc" bind:value={formData.description} rows="3"></textarea>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn-cancel" on:click={close}>Cancel</button>
            <button class="btn-save" on:click={handleSubmit}>Save Item</button>
        </div>
    </div>
</div>
{/if}

<style>
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color-bg-modal-backdrop);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(4px);
    }

    .modal {
        background: var(--color-bg-card);
        width: 90%;
        max-width: 500px;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        display: flex;
        flex-direction: column;
        max-height: 90vh;
        animation: dropIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes dropIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }

    .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid var(--color-border-light);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-header h3 {
        margin: 0;
        font-weight: 600;
        color: var(--color-text-primary);
    }

    .close-btn {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--color-text-muted);
        line-height: 1;
        padding: 0 0.5rem;
    }
    
    .close-btn:hover {
        color: var(--color-text-primary);
    }

    .modal-body {
        padding: 1.5rem;
        overflow-y: auto;
    }

    .form-group {
        margin-bottom: 1.25rem;
    }

    .form-row {
        display: flex;
        gap: 1rem;
    }
    
    .form-row .form-group {
        flex: 1;
    }

    label {
        display: block;
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: var(--color-text-secondary);
    }

    input, textarea {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid var(--color-border-input);
        border-radius: var(--radius-sm);
        background: var(--color-bg-input);
        font-family: inherit;
        color: var(--color-text-primary);
        transition: all 0.2s;
    }

    input:focus, textarea:focus {
        outline: none;
        border-color: var(--color-border-input-focus);
        background: var(--color-bg-card);
        box-shadow: 0 0 0 3px var(--color-primary-light);
    }

    .modal-footer {
        padding: 1.5rem;
        border-top: 1px solid var(--color-border-light);
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    }

    .btn-cancel {
        padding: 0.75rem 1.5rem;
        background: transparent;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        cursor: pointer;
        font-weight: 500;
        color: var(--color-text-secondary);
    }
    
    .btn-cancel:hover {
        background: var(--color-bg-page);
        color: var(--color-text-primary);
    }

    .btn-save {
        padding: 0.75rem 1.5rem;
        background: var(--color-primary);
        border: none;
        border-radius: var(--radius-sm);
        cursor: pointer;
        font-weight: 600;
        color: white;
    }

    .btn-save:hover {
        background: var(--color-primary-hover);
        transform: translateY(-1px);
    }
</style>
