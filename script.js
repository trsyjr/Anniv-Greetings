// Modal: show on first load
window.addEventListener("load", () => {
  const modal = document.getElementById("welcomeModal");
  const closeBtn = document.getElementById("closeModal");
  modal.classList.remove("hidden");

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});

// Form submission via hidden iframe
const form = document.getElementById("anniversaryForm");
const resultMsg = document.getElementById("result");
const submitBtn = form.querySelector("button[type='submit']");
const iframe = document.getElementById("hidden_iframe");

iframe.onload = function () {
  resultMsg.textContent = "Submitted successfully! 🎉";
  resultMsg.classList.remove("hidden");
  form.reset();
  submitBtn.disabled = false;
  submitBtn.textContent = "Submit";

  // Confetti effect
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });
};

form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  // Actually submit the form via iframe
  form.submit();
});
