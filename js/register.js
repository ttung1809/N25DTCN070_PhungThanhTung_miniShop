
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const phone = document.getElementById("phone").value.trim();

    if (password !== password2) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(function(user) {
        return user.email === email;
    });

    if (existingUser) {
        alert("Email này đã được đăng ký!");
        return;
    }

   const newUser = {
        fullname: fullname,
        email: email,
        password: password,
        phone: phone
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Vui lòng đăng nhập.");

    window.location.href = "login.html";
});
