<script lang="ts">
  import type { CartItem } from '../lib/types';
  import { cartItems } from '../lib/store';
  import { createEventDispatcher } from 'svelte';

  export let item: CartItem;
  
  const dispatch = createEventDispatcher();

  function increaseQuantity() {
    cartItems.update(items => {
        return items.map(i => {
            if (i.id === item.id) {
                if (i.quantity < i.limit) {
                    return { ...i, quantity: i.quantity + 1 };
                } else {
                    alert(`Order limit reached! Maximum ${i.limit} allowed.`);
                }
            }
            return i;
        });
    });
  }

  function decreaseQuantity() {
    cartItems.update(items => {
        return items.map(i => {
            if (i.id === item.id && i.quantity > 1) {
                return { ...i, quantity: i.quantity - 1 };
            }
            return i;
        });
    });
  }

  function deleteItem() {
      if(confirm('Are you sure you want to remove this item?')) {
          cartItems.update(items => items.filter(i => i.id !== item.id));
      }
  }

  function editItem() {
      dispatch('edit', item);
  }
</script>

<div class="cart-item">
    <!-- Image -->
    <div class="item-image">
        <img src={item.image} alt={item.name} />
    </div>

    <!-- Details -->
    <div class="item-details">
        <div class="header">
            <h3>{item.name}</h3>
            <span class="price">${item.price.toFixed(2)}</span>
        </div>
        <p class="description">{item.description}</p>
        
        <div class="actions">
            <!-- Quantity -->
            <div class="quantity-control">
                <button on:click={decreaseQuantity} disabled={item.quantity <= 1}>-</button>
                <span>{item.quantity}</span>
                <button on:click={increaseQuantity} disabled={item.quantity >= item.limit}>+</button>
            </div>
            
            <!-- Tools -->
             <div class="tools">
                 <button class="btn-icon edit" on:click={editItem} title="Edit Item">
                     <!-- Edit SVG -->
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                 </button>
                 <button class="btn-icon delete" on:click={deleteItem} title="Remove Item">
                     <!-- Trash SVG -->
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                 </button>
             </div>
        </div>
    </div>
</div>

<style>
    .cart-item {
        display: flex;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1rem;
        gap: 1.5rem;
        margin-bottom: 1rem;
        box-shadow: var(--shadow-sm);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .cart-item:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
        border-color: var(--color-border-light);
    }

    .item-image img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: var(--radius-sm);
        background-color: var(--color-skeleton);
    }

    .item-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
    }

    h3 {
        font-weight: 600;
        font-size: 1.1rem;
        color: var(--color-text-primary);
        margin: 0;
    }

    .price {
        font-weight: 700;
        color: var(--color-text-primary);
        font-size: 1.1rem;
    }

    .description {
        color: var(--color-text-secondary);
        font-size: 0.9rem;
        margin-bottom: 1rem;
        line-height: 1.4;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .quantity-control {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--color-bg-input);
        padding: 4px;
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-border-input);
    }

    .quantity-control button {
        width: 28px;
        height: 28px;
        border: none;
        background: var(--color-bg-card);
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text-primary);
        font-weight: bold;
        transition: background 0.2s;
    }

    .quantity-control button:hover:not(:disabled) {
        background: var(--color-border-light);
    }

    .quantity-control button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .quantity-control span {
        min-width: 24px;
        text-align: center;
        font-weight: 600;
        font-size: 0.9rem;
    }

    .tools {
        display: flex;
        gap: 0.5rem;
    }

    .btn-icon {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 6px;
        border-radius: var(--radius-sm);
        color: var(--color-text-secondary);
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-icon:hover {
        background: var(--color-bg-input);
        color: var(--color-text-primary);
    }

    .btn-icon.delete:hover {
        background: var(--color-danger-light);
        color: var(--color-danger);
    }
    
    @media (max-width: 600px) {
        .cart-item {
            flex-direction: column;
            gap: 1rem;
        }
        .item-image img {
            width: 100%;
            height: 200px;
        }
        .header {
            flex-direction: column;
            gap: 0.25rem;
        }
    }
</style>
