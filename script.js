// Modal: show on first load
window.addEventListener("load", () => {
  const modal = document.getElementById("welcomeModal");
  const closeBtn = document.getElementById("closeModal");
  modal.classList.remove("hidden");

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});

// Form submission: normal POST + success overlay
const form = document.getElementById("anniversaryForm");
const resultMsg = document.getElementById("result");
const submitBtn = form.querySelector("button[type='submit']");

form.addEventListener("submit", (e) => {
  // Show confetti immediately
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });

  // Disable button to prevent double submit
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  // Let the browser handle the POST (no fetch)
  // After submission, the Apps Script can redirect to a "thank you" page if desired
  // or you can stay on the same page with a query param, e.g., ?submitted=true
});

// Optional: show success if ?submitted=true
const params = new URLSearchParams(window.location.search);
if (params.get("submitted") === "true") {
  resultMsg.textContent = "Submitted successfully! 🎉";
  resultMsg.classList.remove("hidden");
}
