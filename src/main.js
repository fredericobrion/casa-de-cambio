import Swal from 'sweetalert2';

const input = document.querySelector('input');
const botao = document.querySelector('button');
const sectionContainer = document.querySelector('section');

const removeItens = () => {
  const container = document.querySelector('.container-boxes');
  const subTitulo = document.querySelector('h2');
  container.remove();
  subTitulo.remove();
};

const erroMoedaInexistente = () => Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Moeda inexistente',
});

const erroSemMoeda = () => Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Você precisa passar uma moeda',
});

const criaMensagemh2 = (moeda) => {
  const h2Div = document.createElement('h2');
  h2Div.innerText = `Valores referentes a 1 ${moeda}`;
  sectionContainer.appendChild(h2Div);
};

const anexaLogoMoeda = (elementoPai) => {
  const logoMoeda = document.createElement('img');
  logoMoeda.classList.add('logo-moeda');
  logoMoeda.src = 'ico/coins.svg';
  elementoPai.appendChild(logoMoeda);
};

const anexaTipoMoeda = (tipo, elementoPai) => {
  const tipoMoeda = document.createElement('p');
  tipoMoeda.classList.add('tipo-moeda');
  tipoMoeda.innerText = tipo;
  elementoPai.appendChild(tipoMoeda);
};

const anexaValorMoeda = (valor, elementoPai) => {
  const valorMoeda = document.createElement('p');
  valorMoeda.classList.add('valor-moeda');
  valorMoeda.innerText = valor.toFixed(3);
  elementoPai.appendChild(valorMoeda);
};

const criaBoxes = (moeda, data) => {
  const container = document.createElement('div');
  container.classList.add('container-boxes');
  criaMensagemh2(moeda);
  const arrayDeMoedas = Object.entries(data.rates);
  arrayDeMoedas.forEach((dinheiro) => {
    const boxMoeda = document.createElement('div');
    boxMoeda.classList.add('box-moeda');
    const [tipo, valor] = dinheiro;
    anexaLogoMoeda(boxMoeda);
    anexaTipoMoeda(tipo, boxMoeda);
    anexaValorMoeda(valor, boxMoeda);
    container.appendChild(boxMoeda);
  });
  sectionContainer.appendChild(container);
};

botao.addEventListener('click', () => {
  const moeda = input.value.toUpperCase();
  if (!moeda) {
    erroSemMoeda();
  } else {
    fetch(`https://api.exchangerate.host/latest?base=${moeda}`)
      .then((res) => res.json())
      .then((data) => {
        const tiposDeMoeda = Object.keys(data.rates);
        if (!tiposDeMoeda.includes(moeda)) {
          erroMoedaInexistente();
        } else {
          if (document.querySelector('.container-boxes')) removeItens();
          criaBoxes(moeda, data);
        }
      });
  }
});
