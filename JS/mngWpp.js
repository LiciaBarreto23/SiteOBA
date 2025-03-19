const agora = new Date();
const hora = agora.getHours();
let saudacao = "";

if (hora >= 5 && hora < 12) {
  saudacao = "Bom dia";
} else if (hora >= 12 && hora < 18) {
  saudacao = "Boa tarde";
} else {
  saudacao = "Boa noite";
}

const tipoVooSelect = document.querySelector(".tipoVoo-textSelect");
function getTipoVoo() {
  const estilo = window.getComputedStyle(tipoVooSelect, "::after");
  let tipoVoo = estilo.getPropertyValue("content").replace(/(^")|("$)/g, "");
  return tipoVoo;
}
const tipoVooOptions = document.querySelector("#tipoVoo .options");
tipoVooOptions.addEventListener("click", () => {
  const estilo = window.getComputedStyle(tipoVooSelect, "::after");
  let valor = estilo.getPropertyValue("content").replace(/(^")|("$)/g, "");
  if (valor == "Ida") {
    document.querySelector("#dataVolta").classList.add("oculto");
    document.querySelector("#input_dataVolta").required = false;
    document.querySelector(".input_detalhe").style.backgroundImage = "url('../img/icon_Ida.svg')";
  } else {
    document.querySelector("#dataVolta").classList.remove("oculto");
    document.querySelector("#input_dataVolta").required = true;
    document.querySelector(".input_detalhe").style.backgroundImage = "url('../img/icon_IdaVolta.svg')"; 
  }
});

const tipoClasseSelect = document.querySelector(".tipoClasse-textSelect");
function getTipoClasse() {
  const estilo1 = window.getComputedStyle(tipoClasseSelect, "::after");
  let tipoClasse = estilo1
    .getPropertyValue("content")
    .replace(/(^")|("$)/g, "");
  return tipoClasse;
}

const hospedagemInput = document.querySelector("#cbx");
function getHospedagem() {
  let hospedagem = hospedagemInput.checked;
  if(hospedagem){
    return "pacote"
  } else{
    return "passagem aérea";
  }
}

const origemInput = document.querySelector("#input_origem");
function getOrigem() {
  let origem = origemInput.value;
  return origem;
}

const destinoInput = document.querySelector("#input_destino");
function getDestino() {
  let destino = destinoInput.value;
  return destino;
}

const dataIdaInput = document.querySelector("#input_dataIda");
function getDataIda() {
  let dataIda = dataIdaInput.value;
  const [ano, mes, dia] = dataIda.split('-');
  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}

const dataVoltaInput = document.querySelector("#input_dataVolta");
function getDataVolta() {
  let dataVolta = dataVoltaInput.value;
  const [ano, mes, dia] = dataVolta.split('-');
  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}

dataVoltaInput.addEventListener('focus', () => {
  if(getTipoVoo() == "Ida"){
    origemInput.focus() 
  }
});

const form = document.querySelector("#form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (getTipoVoo() == "Ida") {
    enviarWhatsApp(saudacao, getHospedagem(), getOrigem(), getDestino(), getDataIda(), getTipoClasse())

  } else {
    enviarWhatsApp(saudacao, getHospedagem(), getOrigem(), getDestino(), getDataIda(), getDataVolta(), getTipoClasse())
  }
});

function enviarWhatsApp(
  saudacao,
  hospedagem,
  origem,
  destino,
  dataIda,
  dataVolta,
  classe
) {
  const numero = "558591684922";
  const mensagem = `${saudacao}, desejo uma cotação de ${hospedagem}. De ${origem} para ${destino}, nas datas ${dataIda} - ${dataVolta}, classe ${classe}.`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");

  hospedagemInput.checked = false
  origemInput.value = "";
  destinoInput.value = "";
  dataIdaInput.value = "";
  dataVoltaInput.value = "";
}

function enviarWhatsApp(
  saudacao,
  hospedagem,
  origem,
  destino,
  dataIda,
  classe
) {
  const numero = "558591684922";
  const mensagem = `${saudacao}, desejo uma cotação de ${hospedagem}. De ${origem} para ${destino}, somente ida, nas data ${dataIda}, classe ${classe}.`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");

  hospedagemInput.checked = false
  origemInput.value = "";
  destinoInput.value = "";
  dataIdaInput.value = "";
  dataVoltaInput.value = "";
}
