import products from "./products.js";

const cart = () => {
    const listCartHTML = document.querySelector('.listCart');
    const iconCart = document.querySelector('.icon-cart');
    const iconCartSpan = iconCart.querySelector('span');
    const body = document.querySelector('body');
    const closeCart = document.querySelector('.close');
    let cart = [];

    // Open and close cart tab
    iconCart.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    });
    
    closeCart.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    });

    const setProductInCart = (idProduct, quantity) => {
        const positionThisProductInCart = cart.findIndex(item => item.product_id == idProduct);

        if (quantity <= 0) {
            if (positionThisProductInCart >= 0) {
                cart.splice(positionThisProductInCart, 1);
            }
        } else if (positionThisProductInCart < 0) {
            cart.push({
                product_id: idProduct,
                quantity: quantity
            });
        } else {
            cart[positionThisProductInCart].quantity = quantity;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        addCartToHTML();
    };

    const addCartToHTML = () => {
        listCartHTML.innerHTML = '';
        let totalQuantity = 0;

        if (cart.length > 0) {
            cart.forEach(item => {
                totalQuantity += item.quantity;

                const newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id;

                const positionProduct = products.findIndex(product => product.id == item.product_id);
                const productInfo = products[positionProduct];

                newItem.innerHTML = `
                    <div class="image">
                        <img src="${productInfo.image}" alt="${productInfo.name}">
                    </div>
                    <div class="name">${productInfo.name}</div>
                    <div class="totalPrice">$${productInfo.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus" data-id="${productInfo.id}"><</span>
                        <span>${item.quantity}</span>
                        <span class="plus" data-id="${productInfo.id}">></span>
                    </div>
                `;

                listCartHTML.appendChild(newItem);
            });
        }

        iconCartSpan.innerText = totalQuantity;
    };

    document.addEventListener('click', (event) => {
        const buttonClick = event.target;
        const idProduct = buttonClick.dataset.id;
        let quantity = null;
        const positionProductInCart = cart.findIndex(item => item.product_id == idProduct);

        if (idProduct) {
            if (buttonClick.classList.contains('addCart')) {
                quantity = (positionProductInCart < 0) ? 1 : cart[positionProductInCart].quantity + 1;
                setProductInCart(idProduct, quantity);
            } else if (buttonClick.classList.contains('minus')) {
                quantity = cart[positionProductInCart].quantity - 1;
                setProductInCart(idProduct, quantity);
            } else if (buttonClick.classList.contains('plus')) {
                quantity = cart[positionProductInCart].quantity + 1;
                setProductInCart(idProduct, quantity);
            }
        }
    });

    const initApp = () => {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    };

    initApp();
};

export default cart;
