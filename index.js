console.log('JS connected');

let cart = [];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');

            // Scrape data from the card
            const productName = productCard.querySelector('h2').innerText;
            const productCategory = productCard.querySelector('p').innerText;
            const productPrice = productCard.querySelector('p:last-of-type').innerText;
            // Get image from the mobile img tag
            const productImage = productCard.querySelector('img').src;
            productQuantity = 0;
            const product = {
                name: productName,
                category: productCategory,
                price: productPrice,
                image: productImage,
                quantity: productQuantity
            };
            cart.forEach((item) => {
          // 1. Check if the product is already in the cart
const existingItem = cart.find(item => item.name === product.name);

if (existingItem) {
    // 2. If it exists, just increase the quantity
    existingItem.quantity += 1;
} else {
    // 3. If it's new, set quantity to 1 and push it
    product.quantity = 1;
    cart.push(product);
}

// 4. Always update the UI after the logic is done
updateCartUI();
            })


        });
    });
});

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyState = document.querySelector('#cartDiv .text-center.py-8');
    const cartHeader = document.querySelector('#cartDiv h2'); // Your "Your Cart" title

    if (cart.length === 0) {
        cartItemsContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
        cartHeader.innerText = `Your Cart (0)`;
        return;
    }

    // Show the cart container, hide empty state
    cartItemsContainer.classList.remove('hidden');
    if (emptyState) emptyState.classList.add('hidden');

    const listContainer = cartItemsContainer.querySelector('ul');
    let cartHTML = "";
    let totalQuantity = 0;

    cart.forEach((item) => {
        totalQuantity += item.quantity;
        cartHTML += `
            <li class="flex justify-between items-center border-b pb-4 pt-2">
                <div>
                    <p class="font-bold text-sm rose-900 mb-1">${item.name}</p>
                    <div class="flex gap-3">
                        <span class="text-[hsl(14,86%,42%)] font-bold">${item.quantity}x</span>
                        <span class="text-[hsl(7,20%,60%)]">@ ${item.price}</span>
                    </div>
                </div>
                </li>`;
    });

    cartHeader.innerText = `Your Cart (${totalQuantity})`;
    listContainer.innerHTML = cartHTML;
}