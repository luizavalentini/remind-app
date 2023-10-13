// Inicialização de variáveis
let lembretes = [
]

let horaLembrete = '';
/*
  Estrutura dum item do array lembretes: 
  item[0] -> Descrição
  item[1] -> Mês
  item[2] -> Ano
  item[3] -> Hora
*/
let meses = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

let mesAtual = 10;
let anoAtual = 2023;

//Mostrar o mês e os lembretes dele quando a página carregar

window.addEventListener("load", () => {
  mostrarData();
  mostrarLembretes();
})

// Manipular mês/Ano

function mostrarData() {
  let show = document.querySelector('.mostra');
  show.innerHTML = '';
  let mes = meses[mesAtual - 1]
  show.innerHTML += `<p>${mes}, ${anoAtual}</p>`
}

function mudarDataAvançar() {
  if (mesAtual < meses.length) {
    mesAtual++;
  } else {
    mesAtual = 1
    anoAtual++
  }
  mostrarLembretes();
  mostrarData();
}

function mudarDataVoltar() {
  if (mesAtual > 1) {
    mesAtual--;
  } else {
    anoAtual--
    mesAtual = 12
  }
  mostrarLembretes();
  mostrarData();
}

//Abrir / fechar modal

function manipularModal() {
  modal = document.querySelector(".modal-container");
  modal.classList.toggle("hidden");
}

//Adicionar Lembretes

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  addLembrete(event);
});

function addLembrete(e) {
  let formData = new FormData(e.target).entries();
  let lembreteObj = Object.fromEntries(formData);
  //As duas linhas acima criam um objeto com todos os campos do formulario.
  if (validarHorario(lembreteObj.hora) && validarDescricao(lembreteObj.descricao)) {
    let lembreteArray = [];
    lembreteArray.push(lembreteObj.descricao);
    lembreteArray.push(lembreteObj.mes);
    lembreteArray.push(parseInt(lembreteObj.ano));
    lembreteArray.push(horaLembrete);
    lembretes.push(lembreteArray);
    manipularModal();
    mostrarLembretes();
  }
  limparDescricao();
}

function limparDescricao() {
  document.getElementById('descricao').value = '';
}


//Mostrar Lembretes na tela

function mostrarLembretes() {
  let show = document.querySelector('.tasks');
  show.innerHTML = '';
  let lembretesFiltrados = lembretes.sort((a, b) => parseInt(a[3].replace(':', '')) - parseInt(b[3].replace(':', '')))
    .filter((lembrete) => lembrete[1] === meses[mesAtual - 1] && lembrete[2] == anoAtual)
  if (lembretesFiltrados.length > 0) {
    lembretesFiltrados
      .forEach(el => {
        show.innerHTML += `<div class="task-container task-container-item">
      <p>${el[0]}</p> <p>${el[el.length - 1]}</p>
      </div>`
      })
  } else {
    show.innerHTML = `<div class="task-container">Nenhum lembrete cadastrado ainda</p></div>`
  }
}

// Validar o formato do horário

function validarHorario(horario) {
  const msgErro = document.getElementById('erro-horario');
  msgErro.innerText = "";
  let hora = parseInt(horario.slice(0, 2));
  let minutos = horario.slice(-2);
  if (horario.length !== 5 || horario.slice(2, 3) !== ':') {
    msgErro.innerText = 'Hora inválida, formato correto HH:MM';
    return false;
  } else {
    if (hora >= 0 && hora < 24 && minutos >= 0 && minutos < 60) {
      hora = formataHoraMinuto(hora)
      minutos = minutos;
      horaLembrete = `${hora}:${minutos}`;
      return true;
    } else {
      msgErro.innerText = "Hora inválida, formato correto HH:MM";
      return false;
    }
  }
}

function formataHoraMinuto(a) {
  return a < 10 ? `0${a}` : a;
}

//Outras validações na descrição 

function validarDescricao(descricao) {
  let msgErro1 = document.getElementById('erro-descricao');
  msgErro1.innerText = ''
  if (descricao != undefined) {
    if (descricao.length == 0) {
      msgErro1.innerText = 'Descrição deve não estar vazia'
      return false
    } else if (descricao.trim().length == 0) {
      msgErro1.innerText = 'Descrição não deve ser formada apenas por espaço'
      return false
    } else if (descricao.trim().length <= 3) {
      msgErro1.innerText = 'Descrição deve ter mais que 3 caracteres válidos'
      return false
    }
    return true
  } else {
    return false
  }
}
