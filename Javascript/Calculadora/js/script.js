//Seleção dos elementos
const operacaoAnteriorText = document.querySelector("#operacao-anterior");
const operacaoAtualText = document.querySelector("#operacao-atual");
const botoes = document.querySelectorAll("#botoes button");

//Criação da classe e lógica
class Calculadora {
    constructor(operacaoAnteriorText, operacaoAtualText) {
        this.operacaoAnteriorText = operacaoAnteriorText;
        this.operacaoAtualText = operacaoAtualText;
        this.operacaoAtual = "";
    }

    //adicionar dígito ao visor da calculadora
    adicionarDigito(digito) {
        //verificação se a operação atual já possui um ponto
        if (digito == "." && this.operacaoAtualText.innerText.includes(".")) {
            return;
        }
        this.operacaoAtual = digito;
        this.alterarVisor();
    }

    //processador das operações da calculadora
    processaOperacao(operacao) {
        //verifica se o valor atual é vazio
        if (this.operacaoAtualText.innerText == "" && operacao != "C") {
            //mudança de operação
            if (this.operacaoAnteriorText.innerText != "") {
                this.mudarOperacao(operacao);
            }
            return;
        }
        //buscar valor atual e anterior
        let valorOperacao;
        const anterior = +this.operacaoAnteriorText.innerText.split(" ")[0];
        const atual = +this.operacaoAtualText.innerText;

        switch (operacao) {
            case "+":
                valorOperacao = anterior + atual;
                this.alterarVisor(valorOperacao, operacao, anterior, atual);
                break;
            case "-":
                valorOperacao = anterior - atual;
                this.alterarVisor(valorOperacao, operacao, anterior, atual);
                break;
            case "/":
                valorOperacao = anterior / atual;
                this.alterarVisor(valorOperacao, operacao, anterior, atual);
                break;
            case "*":
                valorOperacao = anterior * atual;
                this.alterarVisor(valorOperacao, operacao, anterior, atual);
                break;
            case "DEL":
                this.processaOperacaoDel();
                break;
            case "CE":
                this.processaClearOperacaoAtual();
                break;
            case "C":
                this.processaClearTodasOperacoes();
                break;
            case "=":
                this.processaOperacaoIgual();
                break;
            default:
                return;
        }
    }

    //mudar valores do visor da calculadora
    alterarVisor(valorOperacao = null, operacao = null, anterior = null, atual = null) {
        if (valorOperacao == null) {
            this.operacaoAtualText.innerText += this.operacaoAtual;
        } else {
            //verifica se o valor é 0, se é adiciona o valor atual
            if (anterior == 0) {
                valorOperacao = atual;
            }

            //adiciona o valor atual para anterior
            this.operacaoAnteriorText.innerText = `${valorOperacao} ${operacao}`;
            this.operacaoAtualText.innerText = "";
        }
    }

    //mudar operação matemática
    mudarOperacao(operacao) {
        const operacoesMatematicas = ["*", "/", "+", "-"]
        if (!operacoesMatematicas.includes(operacao)) {
            return;
        }
        this.operacaoAnteriorText.innerText = this.operacaoAnteriorText.innerText.slice(0, -1) + operacao;
    }

    //DEL => deletar o último dígito da operação atual
    processaOperacaoDel() {
        this.operacaoAtualText.innerText = this.operacaoAtualText.innerText.slice(0, -1);
    }

    //CE => limpa a tela da operação atual
    processaClearOperacaoAtual() {
        this.operacaoAtualText.innerText = "";
    }

    //C => limpa a tela da operação anterior e atual
    processaClearTodasOperacoes(){
        this.operacaoAtualText.innerText = "";
        this.operacaoAnteriorText.innerText = "";
    }

    //= => processa a operação
    processaOperacaoIgual(){
        const operacao = this.operacaoAnteriorText.innerText.split(" ")[1];
        this.processaOperacao(operacao);
    }
}

//Instanciação do objeto Calculadora
const calc = new Calculadora(operacaoAnteriorText, operacaoAtualText);

//Eventos
botoes.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const valor = e.target.innerText; //innerText captura o texto de cada botão

        if (parseInt(valor) >= 0 || valor == ".") {
            calc.adicionarDigito(valor);
        } else {
            calc.processaOperacao(valor);
        }
    })
})