// cart.js
document.addEventListener("DOMContentLoaded", () => {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutButton = document.querySelector('.checkout-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCart = () => {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
            total += item.price;
        });

        cartCount.textContent = `(${cart.length})`;
        cartTotal.textContent = `$${total.toFixed(2)}`;
    };

    const addToCart = (product) => {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    };

    const removeFromCart = (productName) => {
        cart = cart.filter(item => item.name !== productName);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    };

    const clearCart = () => {
        cart = [];
        localStorage.removeItem('cart');
        updateCart();
    };

    // Actualizar el carrito al cargar la página
    updateCart();

    // Evento para agregar productos al carrito
    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                name: button.closest('.content-card-product').querySelector('h3').textContent,
                price: parseFloat(button.closest('.content-card-product').querySelector('.price').textContent.replace('$', ''))
            };
            addToCart(product);
        });
    });

    // Evento para remover productos del carrito
    document.querySelectorAll('.remove-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.closest('.content-card-product').querySelector('h3').textContent;
            removeFromCart(productName);
        });
    });

    // Evento para vaciar el carrito
    checkoutButton.addEventListener('click', () => {
        clearCart();
        // Aquí puedes redirigir al formulario de pago o realizar alguna acción de pago
    });
});
