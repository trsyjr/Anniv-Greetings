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

    if (!response.ok) throw new Error("Network response was not ok");

    resultMsg.textContent = "Submitted successfully! 🎉";
    resultMsg.classList.remove("hidden");
    form.reset();

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    resultMsg.classList.add("animate-pulse");
    setTimeout(() => resultMsg.classList.remove("animate-pulse"), 1500);

  } catch (err) {
    console.error(err);
    resultMsg.textContent = "Failed to submit form: " + err.message;
    resultMsg.classList.remove("hidden");
  }
});
