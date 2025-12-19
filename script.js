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

    const result = await response.json(); // now safely parse JSON

    if (result.status === "success") {
      resultMsg.textContent = "Submitted successfully! 🎉";
      resultMsg.classList.remove("hidden");
      form.reset();

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

    } else {
      resultMsg.textContent = "Submission failed: " + (result.message || "Unknown error");
      resultMsg.classList.remove("hidden");
    }

  } catch (err) {
    resultMsg.textContent = "Failed to submit form: " + err.message;
    resultMsg.classList.remove("hidden");
    console.error(err);
  }
});
