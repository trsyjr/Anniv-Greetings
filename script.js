// Modal: show on first load
window.addEventListener("load", () => {
  const modal = document.getElementById("welcomeModal");
  const closeBtn = document.getElementById("closeModal");

  modal.classList.remove("hidden");

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});

// Form submission with confetti
const form = document.getElementById("anniversaryForm");
const resultMsg = document.getElementById("result");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData
    });

    // Since Apps Script returns HTML, parse text instead of JSON
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

    } else {
      resultMsg.textContent = "Submission failed: " + text;
      resultMsg.classList.remove("hidden");
    }

  } catch (err) {
    resultMsg.textContent = "Failed to submit form: " + err.message;
    resultMsg.classList.remove("hidden");
    console.error(err);
  }
});
