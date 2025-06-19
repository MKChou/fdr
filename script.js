// script.js

document.addEventListener("DOMContentLoaded", function () {
    // 平滑滾動導覽
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  
    // 顯示返回頂部按鈕
    const toTopBtn = document.createElement("button");
    toTopBtn.innerText = "▲ Top";
    toTopBtn.style.position = "fixed";
    toTopBtn.style.bottom = "20px";
    toTopBtn.style.right = "20px";
    toTopBtn.style.padding = "0.5rem 1rem";
    toTopBtn.style.background = "#2c3e50";
    toTopBtn.style.color = "white";
    toTopBtn.style.border = "none";
    toTopBtn.style.borderRadius = "4px";
    toTopBtn.style.display = "none";
    toTopBtn.style.cursor = "pointer";
    document.body.appendChild(toTopBtn);
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        toTopBtn.style.display = "block";
      } else {
        toTopBtn.style.display = "none";
      }
    });
  
    toTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  