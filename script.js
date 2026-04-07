document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form");
  const input = document.getElementById("url");
  const result = document.getElementById("result");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 🚨 CLAVE

    const url = input.value.trim();

    if (url === "") {
      errorMessage.textContent = "Por favor ingresa una URL";
      return;
    }

    if (!url.startsWith("http")) {
      errorMessage.textContent = "La URL debe comenzar con http o https";
      return;
    }

    errorMessage.textContent = "";

    try {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
      let shortUrl = await response.text();

shortUrl = shortUrl.replace("preview/", "");

      mostrarResultado(url, shortUrl);

    } catch (error) {
      console.error(error);
      errorMessage.textContent = "Error de conexión con la API";
    }
  });

  function mostrarResultado(original, corta) {
    const div = document.createElement("div");
    div.classList.add("result-item");

    div.innerHTML = `
      <p>${original}</p>
      <div class="result-links">
        <a href="${corta}" target="_blank">${corta}</a>
        <button class="copy-btn">Copy</button>
      </div>
    `;

    result.appendChild(div);

    const botonCopiar = div.querySelector(".copy-btn");

    botonCopiar.addEventListener("click", () => {
      navigator.clipboard.writeText(corta);
      botonCopiar.textContent = "Copied!";
      botonCopiar.style.background = "#3b3054";
    });
  }

});