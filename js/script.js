const buttons = document.querySelectorAll(".btn-add-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const product = cart.find(function (item) {
            return item.name === name;
        });

        if (product) {
            product.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }


        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Đã thêm " + name + " vào giỏ hàng!");
    });
});