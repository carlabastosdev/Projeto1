const nomeItemLocalStorage = "toDoListItens";

function carregarLocalStorage() {
  const itens = localStorage.getItem(nomeItemLocalStorage);
  return itens ? JSON.parse(itens) : [];
}

function salvarLocalStorage(listaItens) {
  localStorage.setItem(nomeItemLocalStorage, JSON.stringify(listaItens));
}

function inserirAtividade() {
  const atividade = document.getElementById("atividade");
  const novoItem = {
    feito: false,
    descricao: atividade.value,
  };
  atividade.value = " ";

  const listaDeItens = carregarLocalStorage();
  const novaLista = [...listaDeItens, novoItem];

  salvarLocalStorage(novaLista);
  carregarListaAtividades(novaLista);
}

function deleteAtividade(index) {
  const itens = carregarLocalStorage();
  itens.splice(index, 1);
  salvarLocalStorage(itens);
  carregarListaAtividades(itens);
}

function selecionarAtividade(index, checked) {
  const listaDeItens = carregarLocalStorage();
  listaDeItens[index].feito = checked;
  salvarLocalStorage(listaDeItens);

  const item = document.getElementById(`span${index}`);
  if (checked) {
    item.style.textDecoration = "line-through";
  } else {
    item.style.textDecoration = "none";
  }
}

function carregarListaAtividades(listaItens) {
  const lista = document.getElementById("toDoList");
  lista.innerHTML = " ";

  listaItens.map((item, index) => {
    const atividade = document.createElement("li");
    atividade.style.display = "flex";

    const divCheckBox = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", (event) =>
      selecionarAtividade(index, event.target.checked)
    );
    divCheckBox.appendChild(checkbox);

    const divSpan = document.createElement("div");
    divSpan.className = "atividade";
    const span = document.createElement("span");
    span.id = `span${index}`;
    span.innerHTML = item.descricao;
    divSpan.appendChild(span);

    if (item.feito) {
      checkbox.checked = true;
      span.style.textDecoration = "line-through";
    }

    const divButton = document.createElement("div");
    divButton.style.justifyContent = "flex-end";
    const button = document.createElement("button");
    button.innerHTML = "X";
    button.addEventListener("click", () => deleteAtividade(index));
    divButton.appendChild(button);

    atividade.appendChild(divCheckBox);
    atividade.appendChild(divSpan);
    atividade.appendChild(divButton);

    lista.appendChild(atividade);
  });
}
function Inicio() {
  const itens = carregarLocalStorage();
  carregarListaAtividades(itens);
}

Inicio();
