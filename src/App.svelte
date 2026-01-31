<script lang="ts">
  import CartItem from './components/CartItem.svelte';
  import CartSummary from './components/CartSummary.svelte';
  import ItemModal from './components/ItemModal.svelte';
  import { cartItems } from './lib/store';
  import type { CartItem as CartItemType } from './lib/types';
  
  let showModal = false;
  let editingItem: CartItemType | null = null;
  
  function openAddModal() {
      editingItem = null;
      showModal = true;
  }
  
  function openEditModal(event: CustomEvent<CartItemType>) {
      editingItem = event.detail;
      showModal = true;
  }
  
  function closeModal() {
      showModal = false;
      editingItem = null;
  }
</script>

<main>
    <div class="container">
        <header>
            <h1>Shopping Cart</h1>
            <button class="add-btn" on:click={openAddModal}>+ Add Item</button>
        </header>

        <div class="content-grid">
            <div class="cart-list">
                {#each $cartItems as item (item.id)}
                    <CartItem {item} on:edit={openEditModal} />
                {:else}
                    <div class="empty-state">
                        <p>Your cart is empty.</p>
                        <button class="link-btn" on:click={openAddModal}>Add some items</button>
                    </div>
                {/each}
            </div>
            
            <div class="summary-col">
                <CartSummary />
            </div>
        </div>
    </div>
    
    <ItemModal show={showModal} {editingItem} on:close={closeModal} />
</main>

<style>
    main {
        min-height: 100vh;
        padding: 2rem 1rem;
        background-color: var(--color-bg-page);
        color: var(--color-text-primary);
    }
    
    .container {
        max-width: 1000px;
        margin: 0 auto;
    }
    
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }
    
    h1 {
        font-size: 2rem;
        font-weight: 800;
        margin: 0;
        color: var(--color-text-primary);
    }
    
    .add-btn {
        background: var(--color-primary);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius-sm);
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, background 0.2s;
        box-shadow: var(--shadow-sm);
    }
    
    .add-btn:hover {
        background: var(--color-primary-hover);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }
    
    .content-grid {
        display: grid;
        grid-template-columns: 1fr 340px;
        gap: 2rem;
        align-items: start;
    }
    
    .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        background: var(--color-bg-card);
        border-radius: var(--radius-md);
        border: 2px dashed var(--color-border);
        color: var(--color-text-secondary);
    }
    
    .link-btn {
        background: none;
        border: none;
        color: var(--color-primary);
        text-decoration: underline;
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        margin-top: 1rem;
    }
    
    @media (max-width: 800px) {
        .content-grid {
            grid-template-columns: 1fr;
        }
        
        .summary-col {
            order: 1; /* Keep summary below items on mobile */
        }
    }
</style>
