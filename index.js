console.log('JS is connected');
let cart = [];

const buttons = document.querySelectorAll('.add-to-cart-btn');
const cartItemsContainer = document.querySelector('#cartItems'); 
const cartList = document.querySelector('ul');
const emptyCartView = document.querySelector('.emptyCart');

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); 

        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('h2').innerText;
        const priceString = productCard.querySelector('.price').innerText;
        const productPrice = parseFloat(priceString.replace('$', ''));
        const existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity++;
            existingItem.totalPrice = existingItem.quantity * existingItem.price;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1,
                totalPrice: productPrice
            });
        }
        renderUI();
    });
});

const renderUI = () => {
    cartList.innerHTML = '';
    let grandTotal = 0;
    cart.forEach(item => {
        grandTotal += item.totalPrice;

        const list = document.createElement('li');
        list.className = 'flex justify-between items-center border-b pb-2';
        list.innerHTML = `
            <div>
                <h4 class="font-bold text-sm">${item.name}</h4>
                <span class="text-[hsl(14,86%,42%)] font-semibold">${item.quantity}x</span>
                <span class="text-[hsl(12,80%,40%)] font-normal">@ $${item.price.toFixed(2)}</span>
                <span class="text-[hsl(14,86%,42%)] font-semibold">$${item.totalPrice.toFixed(2)}</span>
            </div>
            <button class="remove-btn text-[hsl(14,86%,42%)] hover:text-black" data-name="${item.name}">×</button>
        `;
        cartList.appendChild(list);
    });

    
    const orderTotalDisplay = document.querySelector('.order-total'); 
    if(orderTotalDisplay) {
        orderTotalDisplay.innerHTML = `$${grandTotal.toFixed(2)}`;
    }
    if (cart.length > 0) {
        emptyCartView?.classList.add('hidden');
        cartItemsContainer?.classList.remove('hidden');
    } else {
        emptyCartView?.classList.remove('hidden');
        cartItemsContainer?.classList.add('hidden');
    }
};
cartList.addEventListener('click',(e)=>{
    if (e.target.classList.contains('remove-btn')){
        const nameToRemove=e.target.getAttribute('data-name')
        cart=cart.filter(item=>item.name !== nameToRemove)

        renderUI();
    }
})