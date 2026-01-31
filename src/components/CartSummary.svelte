<script lang="ts">
    import { cartTotals, appliedPromo, promoCode, PROMO_CODES } from '../lib/store';

    let codeInput = '';

    function applyPromo() {
        const normalizedCode = codeInput.trim().toUpperCase();
        const promo = PROMO_CODES[normalizedCode];

        if (promo) {
            appliedPromo.set(promo);
            promoCode.set(normalizedCode);
            codeInput = ''; 
        } else {
            alert('Invalid promo code');
        }
    }

    function removePromo() {
        appliedPromo.set(null);
        promoCode.set('');
    }
</script>

<div class="summary-card">
    <h2>Order Summary</h2>
    
    <div class="line-item">
        <span>Subtotal</span>
        <span>${$cartTotals.subtotal.toFixed(2)}</span>
    </div>
    
    {#if $appliedPromo}
    <div class="line-item discount">
        <div class="promo-tag">
            <span>Code: {$appliedPromo.code}</span>
            <button class="remove-promo" on:click={removePromo}>✕</button>
        </div>
        <span>- ${$cartTotals.discount.toFixed(2)}</span>
    </div>
    {/if}

    <div class="line-item">
        <span>Shipping</span>
        <span>${$cartTotals.shipping === 0 ? 'Free' : '$' + $cartTotals.shipping.toFixed(2)}</span>
    </div>

    <div class="divider"></div>

    <div class="line-item total">
        <span>Total</span>
        <span>${$cartTotals.total.toFixed(2)}</span>
    </div>

    <div class="promo-section">
        <label for="promo">Promo Code</label>
        <div class="input-group">
            <input 
                type="text" 
                id="promo" 
                bind:value={codeInput} 
                placeholder="Enter code" 
                on:keydown={(e) => e.key === 'Enter' && applyPromo()}
            />
            <button on:click={applyPromo}>Apply</button>
        </div>
        <div class="available-codes">
            <small>Try: SAVE10, SAVE20, FREESHIP, FLAT50</small>
        </div>
    </div>
    
    <button class="checkout-btn">Proceed to Checkout</button>
</div>

<style>
    .summary-card {
        background: var(--color-bg-card);
        padding: 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
        border: 1px solid var(--color-border);
        position: sticky;
        top: 2rem;
    }

    h2 {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: var(--color-text-primary);
    }

    .line-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        color: var(--color-text-secondary);
        font-size: 0.95rem;
    }

    .line-item.total {
        color: var(--color-text-primary);
        font-weight: 700;
        font-size: 1.2rem;
        margin-top: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .line-item.discount {
        color: var(--color-success);
    }

    .divider {
        height: 1px;
        background: var(--color-border-light);
        margin: 1rem 0;
    }

    .promo-section {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        font-size: 0.85rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: var(--color-text-secondary);
    }

    .input-group {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }

    input {
        flex: 1;
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border-input);
        border-radius: var(--radius-sm);
        background: var(--color-bg-input);
        color: var(--color-text-primary);
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s;
    }

    input:focus {
        border-color: var(--color-border-input-focus);
    }

    button {
        padding: 0.5rem 1rem;
        background: var(--color-primary);
        color: #fff;
        border: none;
        border-radius: var(--radius-sm);
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s;
    }

    button:hover {
        background: var(--color-primary-hover);
    }

    .promo-tag {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--color-success);
        color: white;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
    }

    .remove-promo {
        background: none;
        border: none;
        padding: 0;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
        display: flex;
        align-items: center;
    }
    
    .remove-promo:hover {
        background: none;
        opacity: 0.8;
    }

    .checkout-btn {
        width: 100%;
        padding: 1rem;
        background: var(--color-text-primary);
        color: var(--color-text-inverse);
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: 1rem;
        transition: opacity 0.2s;
    }
    
    .checkout-btn:hover {
        opacity: 0.9;
        background: var(--color-text-primary);
    }

    .available-codes {
        font-size: 0.75rem;
        color: var(--color-text-muted);
    }
</style>
