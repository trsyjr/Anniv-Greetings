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

  // 🔒 Lock submit button
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

    if (!text.toLowerCase().includes("success")) {
      throw new Error(text);
    }

    // ✅ Success message
    resultMsg.textContent = "Submitted successfully!";
    resultMsg.classList.remove("hidden", "text-red-600");
    resultMsg.classList.add("text-green-600")

    form.reset();

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    // 🔓 Re-enable submit button after 1.5s
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
      submitBtn.classList.remove("opacity-60", "cursor-not-allowed");
    }, 1500);

    // 👻 Hide success message after 3 seconds
    setTimeout(() => {
      resultMsg.classList.add("hidden");
      resultMsg.textContent = "";
    }, 3000);

  } catch (error) {
    // ❌ Failure
    resultMsg.textContent = "Submission failed. Please try again.";
    resultMsg.classList.remove("hidden", "text-green-600");
    resultMsg.classList.add("text-red-600");


    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
    submitBtn.classList.remove("opacity-60", "cursor-not-allowed");

    console.error(error);
  }
});
