// Modal: show on first load
window.addEventListener("load", () => {
  const modal = document.getElementById("welcomeModal");
  const closeBtn = document.getElementById("closeModal");

  modal.classList.remove("hidden");

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});

// Form submission with confetti and button disable
const form = document.getElementById("anniversaryForm");
const resultMsg = document.getElementById("result");
const submitBtn = form.querySelector("button[type='submit']");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  // Disable button immediately
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData
    });

    const text = await response.text();

    if (text.toLowerCase().includes("success")) {
      resultMsg.textContent = "Submitted successfully! 🎉";
      resultMsg.classList.remove("hidden");
      form.reset();

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Re-enable button after short delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
      }, 2000); // optional delay to prevent spamming

    } else {
      resultMsg.textContent = "Submission failed: " + text;
      resultMsg.classList.remove("hidden");
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }

  } catch (err) {
    resultMsg.textContent = "Failed to submit form: " + err.message;
    resultMsg.classList.remove("hidden");
    console.error(err);
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});
