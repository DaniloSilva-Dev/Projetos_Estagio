const abas = document.querySelectorAll(".botoes");

abas.forEach((abas) => abas.addEventListener("click", () => abasClicada(abas)));

const abasClicada = (aba) => {
  abas.forEach((aba) => aba.classList.remove("ativo"));
  aba.classList.add("ativo");

  const conteudos = document.querySelectorAll(".conteudo");
  conteudos.forEach((conteudo) => conteudo.classList.remove("mostrar"));

  const conteudoId = aba.getAttribute("content-id");
  const conteudo = document.getElementById(conteudoId);

  conteudo.classList.add("mostrar");
};

const abaAtualAtivo = document.querySelector(".botoes.ativo");
abasClicada(abaAtualAtivo);
