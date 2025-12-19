const form = document.getElementById("anniversaryForm");
const resultMsg = document.getElementById("result");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  // Collect form data
  const formData = new FormData(form);

  // Convert FormData to URLSearchParams for Apps Script
  const params = new URLSearchParams();
  for (const pair of formData) {
    params.append(pair[0], pair[1]);
  }

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: params
    });

    if (!response.ok) throw new Error("Network response was not ok");

    // Show success message
    resultMsg.textContent = "Submitted successfully! 🎉";
    resultMsg.classList.remove("hidden");

    // Reset form
    form.reset();

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

  } catch (err) {
    resultMsg.textContent = "Failed to submit form: " + err.message;
    resultMsg.classList.remove("hidden");
    console.error(err);
  }
});

function submitted() {
  const resultMsg = document.getElementById("result");
  resultMsg.textContent = "Submitted successfully! 🎉";
  resultMsg.classList.remove("hidden");

  const form = document.getElementById("anniversaryForm");
  form.reset();

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

