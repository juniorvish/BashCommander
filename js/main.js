document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("user-input");
  const output = document.getElementById("output");
  const submitButton = document.getElementById("submit-button");

  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const userPrompt = userInput.value;
    const systemPrompt = "Convert the following natural language command to a bash command:";

    const message = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    const response = await fetch("/api/command", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: message }),
    });

    if (response.ok) {
      const data = await response.json();
      const gptMessage = data.choices[0].message.content;
      output.textContent = gptMessage;
    } else {
      output.textContent = "Error: Unable to process the request.";
    }
  });
});