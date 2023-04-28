let numero = document.getElementById("numero");
let lista = document.querySelector("select#lista");
let resultado = document.getElementById("resultado");
let form = document.getElementById('form'); 
let valores = [];

function isNumero(n) {
    if(Number(n) >= 1 && Number(n) <= 99999999999999) {
        return true
    } else {
        return false
    }
}
function inLista(n, l) {
    if (l.indexOf(Number(n)) != -1) {
        return true
    } else {
        return false
    }
}
function adicionar() {
    if (isNumero(numero.value) && !inLista(numero.value, valores)) {
        valores.push(Number(numero.value))
        let item = document.createElement("option")
        item.text = `Valor ${numero.value} adicionado`
        lista.appendChild(item);
        resultado.innerHTML = ""
    } else {
        alert ("Valor invalido ou ja encontrado na lista")
    }
    numero.value = ""
    numero.focus();
}
function finalizar() {
    if (valores.length == 0){
        alert ("adicione valores antes de finalizar")
    } else {
        let tot = valores.length
        let maior = valores[0]
        let menor = valores[0]
        let soma = 0
        let media = 0
        for (let posicao in valores) {
            soma += valores[posicao]
            if (valores[posicao] > maior)
                maior = valores[posicao]
            if (valores[posicao] < menor)
                menor = valores[posicao]
        }
        media = soma / tot
        resultado.innerHTML = ""
        resultado.innerHTML += `<p> Ao todo, temos ${tot} numeros cadastrados`
        resultado.innerHTML += `<p> O maior valor informado foi ${maior}</p>`
        resultado.innerHTML += `<p> O menor valor informado foi ${menor}</p>`
        resultado.innerHTML += `<p> A soma de todos os valores é ${soma}</p>`
        resultado.innerHTML += `<p> A média de todos os valores é ${media}</p>`
    }
}
