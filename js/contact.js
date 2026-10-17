const contactForm = document.querySelector(".form");
const messageInput = document.getElementById("message");

contactForm.addEventListener("submit", function (event) {
  const message = messageInput.value.trim();

  if (message.length < 10) {
    event.preventDefault();
    alert("Nội dung tin nhắn phải có ít nhất 10 ký tự!");
  }
});
