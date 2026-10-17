const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const emptyCart = document.getElementById("empty-cart");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function formatMoney(number) {
    return number.toLocaleString("vi-VN") + " đ";
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
    cartItems.innerHTML = "";
    let total = 0;

    emptyCart.hidden = cart.length !== 0;
    checkoutBtn.disabled = cart.length === 0;

    cart.forEach(function (product, index) {
        const subtotal = product.price * product.quantity;
        total += subtotal;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${formatMoney(product.price)}</td>
            <td>
                <input
                    type="number"
                    min="1"
                    value="${product.quantity}"
                    class="quantity-input"
                    data-index="${index}"
                >
            </td>
            <td>${formatMoney(subtotal)}</td>
            <td>
                <button type="button" class="remove-btn"
                    data-index="${index}">
                    Xóa
                </button>
            </td>
        `;

        cartItems.appendChild(row);
    });

    cartTotal.innerHTML = "<strong>" + formatMoney(total) + "</strong>";
}

cartItems.addEventListener("change", function (event) {
    if (event.target.classList.contains("quantity-input")) {
        const index = Number(event.target.dataset.index);
        const quantity = Number(event.target.value);

        if (quantity < 1 || !Number.isInteger(quantity)) {
            event.target.value = cart[index].quantity;
            return;
        }

        cart[index].quantity = quantity;
        saveCart();
        displayCart();
    }
});

cartItems.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-btn")) {
        const isConfirmed = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

        if (isConfirmed) {
            const index = Number(event.target.dataset.index);

            cart.splice(index, 1);
            saveCart();
            displayCart();
        }
    }
});

checkoutBtn.addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }

    const isConfirmed = confirm("Bạn có chắc chắn muốn đặt hàng không?");

    if (isConfirmed) {
        alert("Đặt hàng thành công!");

        cart = [];
        saveCart();
        displayCart();
    }
});

displayCart();


const clearCartBtn = document.getElementById("clear-cart-btn");

clearCartBtn.addEventListener("click", function() {
    const isConfirmed = confirm("Xóa toàn bộ giỏ hàng!");

    if (isConfirmed) {
        cart = [];
        saveCart();
        displayCart();
    }
});