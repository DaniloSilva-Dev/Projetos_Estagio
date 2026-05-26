const entrada = document.querySelector(".temperatura-enviada");
const unidadeOrigem = document.querySelector(".unidade-origem");
const unidadeDestino = document.querySelector(".unidade-destino");

let converter = (temp, unidadeOrigem, unidadeDestino) => {
  if (unidadeOrigem === unidadeDestino) {
    return temp;
  }

  let tempCelsius;

  switch (unidadeOrigem) {
    case "Celsius":
      tempCelsius = temp;
      break;
    case "Fahrenheit":
      tempCelsius = (temp - 32) * (5 / 9);
      break;
    case "Kelvin":
      tempCelsius = temp - 273.15;
      break;
    default:
      return null;
  }

  switch (unidadeDestino) {
    case "Celsius":
      return tempCelsius;
    case "Fahrenheit":
      return tempCelsius * (9 / 5) + 32;
    case "Kelvin":
      return tempCelsius + 273.15;
    default:
      return null;
  }
};

document.querySelector("form").addEventListener("submit", (evento) => {
  evento.preventDefault();

  const temp = parseFloat(entrada.value);
  const origem = unidadeOrigem.value;
  const destino = unidadeDestino.value;
  const resultado = converter(temp, origem, destino);
  document.querySelector(".resultado").innerHTML =
    `<p class="resultado"> ${temp} ${origem} é ${resultado.toFixed(1)} ${destino}</p>`;
});
