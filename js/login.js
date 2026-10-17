
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(function(item) {
        return item.email === email && item.password === password;
    });

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify({
            fullname: user.fullname,
            email: user.email
        }));

        alert("Đăng nhập thành công!");

        window.location.href = "index.html";
    } else {
        alert("Email hoặc mật khẩu không chính xác!");
    }
});
