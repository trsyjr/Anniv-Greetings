document.getElementById("anniversaryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const years = document.getElementById("years").value;
  const date = document.getElementById("date").value;
  const message = document.getElementById("message").value;

  console.log({
    name,
    years,
    date,
    message
  });

  const result = document.getElementById("result");
  result.textContent = `Submitted successfully! 🎉`;
  result.classList.remove("hidden");

  this.reset();
});


const form = document.getElementById('anniversaryForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById('name').value,
      position: document.getElementById('position').value,
      date: document.getElementById('date').value
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyvra60dHlLAObUJxFWLeHdrjYBkLTqpfebZ2772WYlHtlKV_GkTDuxdIIcGrQ75mPn/exec", {
        method: "POST",
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("Your submission has been saved!");
        form.reset();
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      alert("Failed to submit form. " + err);
    }
  });