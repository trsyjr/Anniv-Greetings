// Show modal on page load
window.addEventListener("load", () => {
  const modal = document.getElementById("welcomeModal");
  const closeBtn = document.getElementById("closeModal");

  modal.classList.remove("hidden");

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});

// Handle form submission
const form = document.getElementById("anniversaryForm");
const resultMsg = document.getElementById("result");
const submitBtn = form.querySelector("button[type='submit']");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 🔒 Lock the button
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";
  submitBtn.classList.add("opacity-60", "cursor-not-allowed");

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

      // ✅ Keep button disabled after success
      submitBtn.textContent = "Submitted";
    } else {
      throw new Error(text);
    }

  } catch (error) {
    resultMsg.textContent = "Submission failed. Please try again.";
    resultMsg.classList.remove("hidden");

    // 🔓 Re-enable button if failed
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
    submitBtn.classList.remove("opacity-60", "cursor-not-allowed");

    console.error(error);
  }
});
