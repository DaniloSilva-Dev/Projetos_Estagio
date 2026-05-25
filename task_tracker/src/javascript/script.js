const forms = document.querySelector("form");

const containerTarefas = document.querySelector(".tarefas");

let tarefas = localStorage.getItem("tarefas")
  ? JSON.parse(localStorage.getItem("tarefas"))
  : [];

const mostrarTarefas = () => {
  const tarefasOrdendadas = tarefas.sort((a, b) => a.concluida - b.concluida);

  containerTarefas.innerHTML = "";
  tarefasOrdendadas.forEach((e) => {
    containerTarefas.innerHTML += `
                <li id="${e.id}" class="${e.concluida ? "concluida" : ""}">
                    <input type="checkbox"  class="check"${e.concluida ? "checked" : ""}/>
                    <span>${e.nome}</span>
                    <button class="apagar-task"> <img src="src/assets/trash.svg" alt="Apagar"></button>
                    </li>
            `;
  });
  tarefa();
};
const tarefa = () => {
  document.querySelectorAll("li").forEach((e) => {
    e.addEventListener("click", (a) => {
      if (a.target.parentElement.classList.contains("apagar-task")) {
        tarefas = tarefas.filter((t) => t.id != +e.id);
        save();
        mostrarTarefas();
      }

      if (a.target.classList.value.includes("check")) {
        const index = tarefas.findIndex((t) => t.id == +e.id);
        tarefas[index].concluida = !tarefas[index].concluida;
        save();
        mostrarTarefas();
      }
    });
  });
};

const save = () => {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
};

forms.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target[0].value.length > 0) {
    tarefas.push({
      nome: e.target[0].value,
      id: Math.random(),
      concluida: false,
    });
  }
  save();
  mostrarTarefas();
  e.target.reset();
});

window.addEventListener("load", mostrarTarefas);
