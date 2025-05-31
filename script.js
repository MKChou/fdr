// 表單送出事件
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('formMsg').textContent = "感謝您的來信，我們會盡快回覆！";
  this.reset();
});
