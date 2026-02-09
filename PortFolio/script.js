const toggle = document.getElementById("theme-toggle");
const body = document.body;

toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    toggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// fade-in animation
document.querySelectorAll(".project-card").forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
});

window.addEventListener("scroll", () => {
    document.querySelectorAll(".project-card").forEach(card => {
        if (card.getBoundingClientRect().top < window.innerHeight - 80) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
            card.style.transition = "0.6s";
        }
    });
});
