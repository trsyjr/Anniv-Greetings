const form = document.getElementById("anniversaryForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    position: document.getElementById("position").value,
    date: document.getElementById("date").value,
    message: document.getElementById("message") ? document.getElementById("message").value : ""
  };

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyvra60dHlLAObUJxFWLeHdrjYBkLTqpfebZ2772WYlHtlKV_GkTDuxdIIcGrQ75mPn/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();

    const resultMsg = document.getElementById("result");

    if (result.status === "success") {
      resultMsg.textContent = "Submitted successfully! 🎉";
      resultMsg.classList.remove("hidden");
      form.reset();
    } else {
      resultMsg.textContent = "Error: " + result.message;
      resultMsg.classList.remove("hidden");
    }
  } catch (err) {
    const resultMsg = document.getElementById("result");
    resultMsg.textContent = "Failed to submit form: " + err.message;
    resultMsg.classList.remove("hidden");
    console.error(err);
  }
});
