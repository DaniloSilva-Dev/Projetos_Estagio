const subreddits = [];
const posts = [
  {
    title:
      "[AskJS] construiu um runtime de navegador experimental para aprender WebAssembly, Workers, SharedArrayBuffer, Atomics e arquitetura de runtime Exemplo de Post",
    upvotes: 5,
    url: "https://www.reddit.com/r/javascript/comments/1ttoch2/askjs_built_an_experimental_browser_runtime_to/",
  },
];

const botaoAdicionarSubreddit = document.querySelector(
  ".botao-adicionar-subreddit",
);

const popup = document.querySelector(".popup");

const inputSubreddit = document.querySelector(".input-subreddit");

const botaoEnviarSubreddit = document.querySelector(".enviar-nome-subreddit");

const container = document.querySelector(".container-subreddit");

const renderizarSubreddits = () => {
  container.innerHTML = "";
  subreddits.forEach((sub) => {
    container.innerHTML += /* html */ `
     <div class="container-subreddit">
        <div class="subreddit" data-nome="${sub}">
          <div class="menu">
            <h2>/r/${sub}</h2>

            <button class="dot-menu-button">
              <img class="dot-menu" src="assets/dot-menu.svg">
            </button>

            <div class="opcoes-menu">
              <button class="apagar-subreddit">Apagar</button>
              <button class="atualizar-subreddit">Atualizar</button>
            </div>
          </div>

          <ul class="lista-posts" id="lista-${sub}"></ul>
        </div>
      </div>
    `;
  });
};

function renderizarPosts(subreddit) {
  const lista = document.getElementById(`lista-${subreddit}`);

  lista.innerHTML = "";

  const postsOrdenados = [...posts].sort((a, b) => b.upvotes - a.upvotes);

  postsOrdenados.forEach((post) => {
    lista.innerHTML += /* html */ `
        <li>
            <div class="upvotes">
                ▲
                <span class="upvote">${post.upvotes}</span>
            </div>
            <a href="${post.url}" target="_blank" rel="noopener" title="${post.title}">${post.title}</a>
        </li>
        `;
  });
}

function buscarColuna(subreddit) {
  fetch(`/api/r/${subreddit}.json`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((erro) => {
      console.log("Erro:", erro);
    });
}

const atualizarInterface = () => {
  renderizarSubreddits();
  ativarEventosMenu();
  ativarEventosApagar();
};

const ativarEventosMenu = () => {
  const botoesMenu = document.querySelectorAll(".dot-menu-button");

  botoesMenu.forEach((botao) => {
    botao.addEventListener("click", () => {
      const container = botao.closest(".subreddit");
      const menu = botao.parentElement.querySelector(".opcoes-menu");

      const jaAtivo = menu.classList.contains("ativo");

      document.querySelectorAll(".opcoes-menu").forEach((fecharMenu) => {
        fecharMenu.classList.remove("ativo");
      });

      document.querySelectorAll(".subreddit").forEach((s) => {
        s.classList.remove("menu-ativo");
      });

      if (!jaAtivo) {
        menu.classList.add("ativo");
        container.classList.add("menu-ativo");
      }
    });
  });
};

ativarEventosApagar = () => {
  const botoesDelete = document.querySelectorAll(".apagar-subreddit");

  botoesDelete.forEach((botao) => {
    botao.addEventListener("click", () => {
      const coluna = botao.closest(".subreddit");
      const nome = coluna.dataset.nome;

      const index = subreddits.indexOf(nome);

      if (index !== -1) {
        subreddits.splice(index, 1);
      }
      atualizarInterface();
    });
  });
};

botaoAdicionarSubreddit.addEventListener("click", () => {
  popup.classList.toggle("ativo");
});

botaoEnviarSubreddit.addEventListener("click", () => {
  const nomeSubreddit = inputSubreddit.value.toLowerCase();
  if (nomeSubreddit === "") {
    alert("Digite um valor válido");
    return;
  }

  subreddits.push(nomeSubreddit);
  atualizarInterface();

  inputSubreddit.value = "";
  popup.classList.remove("ativo");
});

atualizarInterface();
