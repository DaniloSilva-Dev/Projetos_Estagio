const botoes = document.querySelectorAll(".toggle-senha");

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    const input = botao.previousElementSibling;

    const isHidden = input.type === "password";

    input.type = isHidden ? "text" : "password";
  });
});
