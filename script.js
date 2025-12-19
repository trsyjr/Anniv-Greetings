const form = document.getElementById("anniversaryForm");
const resultMsg = document.getElementById("result");
const iframe = document.getElementById("hidden_iframe");

iframe.onload = function () {
  try {
    const content = iframe.contentDocument.body.innerText;

    if (content.includes("success")) {
      resultMsg.textContent = "Submitted successfully! 🎉";
      resultMsg.classList.remove("hidden");
      form.reset();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      resultMsg.textContent = "Submission failed.";
      resultMsg.classList.remove("hidden");
    }
  } catch (err) {
    console.error(err);
  }
};
