var randomnb = function(){ return Math.round(Math.random()*300)};

var options = {
    responsive:true
};

var data = [
    {
        value: randomnb(),
        color:"#ffff00",
        highlight: "#ffff66",
        label: "Ontem"
    },
    {
        value: randomnb(),
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Azul"
    },
    {
        value: randomnb(),
        color: "#009900",
        highlight: "#00e600",
        label: "Hoje"
    }
]

window.onload = function(){

    var ctx = document.getElementById("GraficoDonut").getContext("2d");
    var PizzaChart = new Chart(ctx).Doughnut(data, options);
}

function ligar(){
  document.getElementById('lamp').src='files/images/lamp_off.png'

}

function desligar(){
  document.getElementById('lamp').src='files/images/lamp_on.png'

}


function enviar(){

  var dados, usr, senha_confirm, senha, mail, date;

  dados = document.getElementById('cadastro');

  usr = dados.user.value;
  senha = dados.pass.value;
  senha_confirm = dados.pass_confirm.value;
  mail = dados.email.value;
  date = dados.nascimento.value;

    if ((senha != false) && (senha_confirm != false) && (senha == senha_confirm)){
        alert("Bem vindo, "+usr+"!");
    }
    else{
        alert("As senhas nao coincidem!")

    }
 //  window.location.replace("index.html");
}
    function entrar(){
        dados1 = document.getElementById('login');

          usr = dados1.user.value;
          pss = dados1.senha.value;

alert("O usuario nao existe!")

  }
