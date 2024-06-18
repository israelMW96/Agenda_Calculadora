//Seleção dos campos
const inputElement = document.querySelector(".nova-tarefa-input");
const buttonElement = document.querySelector(".nova-tarefa-botao");
const tarefasConteiner = document.querySelector(".tarefas-conteiner");

//verifica se o usuário tentar adicionar uma tarefa em branco
const validaInput = () => inputElement.value.trim().length > 0;

//adiciona uma tarefa
const addTarefa = () => {
    const inputEhValido = validaInput();
    if (!inputEhValido) {
        return inputElement.classList.add("error"); //insere o "error" no elemento nova-tarefa-input
    }
    const itemTarefaConteiner = document.createElement("div"); //cria uma div no html
    itemTarefaConteiner.classList.add("item-tarefa"); //atribui a classe item-tarefa a div

    const conteudoTarefa = document.createElement("p"); //cria um parágrafo no html
    conteudoTarefa.innerText = inputElement.value; //atribui o valor do input no parágrafo

    conteudoTarefa.addEventListener("click", () => concluirTarefa(conteudoTarefa));

    const deletarItem = document.createElement("i"); //cria um icone no html
    deletarItem.classList.add("fa-regular"); //atribui a classe ao item
    deletarItem.classList.add("fa-trash-can"); //atribui a classe ao item

    deletarItem.addEventListener("click", () => deletarTarefa(itemTarefaConteiner, conteudoTarefa));

    itemTarefaConteiner.appendChild(conteudoTarefa); //insere o parágrafo dentro da div
    itemTarefaConteiner.appendChild(deletarItem); //insere o ícone dentro da div

    tarefasConteiner.appendChild(itemTarefaConteiner); //insere a div dentro da classe tarefas-conteiner no html

    inputElement.value = "";
};

//concluir a tarefa
const concluirTarefa = (conteudoTarefa) => {
    const tarefas = tarefasConteiner.childNodes; //atribui todas as tarefas a const
    for (const tarefa of tarefas) { //realiza um loop passando por cada tarefa
        if (tarefa.firstChild.isSameNode(conteudoTarefa)) { //verifica se o paragrafo é o mesmo do conteudoTarefa
            tarefa.firstChild.classList.toggle("completed"); //se for adiciona o completed na classe
        }
    }
}

//deletar a tarefa
const deletarTarefa = (itemTarefaConteiner, conteudoTarefa) => {
    const tarefas = tarefasConteiner.childNodes; //atribui todas as tarefas a const
    for (const tarefa of tarefas) { //realiza um loop passando por cada tarefa
        if (tarefa.firstChild.isSameNode(conteudoTarefa)) { //verifica se o paragrafo é o mesmo do conteudoTarefa
            itemTarefaConteiner.remove(); //se for remove a tarefa
        }
    }
}

//verifica a mudança do input
const mudaInput = () => {
    const inputEhValido = validaInput();
    if (inputEhValido) {
        return inputElement.classList.remove("error");
    }
}

buttonElement.addEventListener("click", () => addTarefa());
inputElement.addEventListener("change", () => mudaInput())