const consentimentoPopup = document.querySelector(".cookie-consentimento");

const aceitarCookies = () => {
  localStorage.setItem("cookieConsentimento", "aceito");
  consentimentoPopup.classList.remove("ativo");
};

const recusarCookies = () => {
  localStorage.setItem("cookieConsentimento", "recusado");
  consentimentoPopup.classList.remove("ativo");
};

const verificarConsentimento = () => {
  const consentimento = localStorage.getItem("cookieConsentimento");

  if (!consentimento) {
    consentimentoPopup.classList.add("ativo");
  }
};

document.addEventListener("DOMContentLoaded", verificarConsentimento);

document
  .querySelector(".aceitar-cookies")
  .addEventListener("click", aceitarCookies);

document
  .querySelector(".recusar-cookies")
  .addEventListener("click", recusarCookies);
