var toDoListGeral = [];

function carregarLocalStorage() {
    return toDoListGeral;
}

function salvarLocalStorage(listaItens) {
    toDoListGeral = listaItens;
}

function inserirAtividade() {
    const atividade = document.getElementById("atividade");
    const novoItem = {
        feito: false,
        descricao: atividade.value
    };
    atividade.value = " ";

    const listaDeItens = carregarLocalStorage();
    const novaLista = [
        ...listaDeItens,
        novoItem
    ];

    salvarLocalStorage(novaLista);
    carregarListaAtividades(novaLista);
}
function carregarListaAtividades(listaItens) {
    const lista = document.getElementById("toDoList");

    lista.innerHTML = " ";

    listaItens.map((item, index) => {
        const atividade = document.createElement('div');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener("change", event => selecionarAtividade(index, event.target.checked));

        const span = document.createElement('span');
        span.id = `span${index}`;
        span.innerHTML = item.descricao;

        if (item.feito) {
            checkbox.checked = true;
            span.style.textDecoration = "line-through";
        }

        const button = document.createElement('button');
        button.innerHTML = 'X';
        button.addEventListener("click", () => deleteAtividade(index));

        atividade.appendChild(checkbox);
        atividade.appendChild(span);
        atividade.appendChild(button);

        lista.appendChild(atividade);
    })
}

function Inicio() {
    const itens = carregarLocalStorage();
    carregarListaAtividades(itens);
}

Inicio();
