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
