import Swal from 'sweetalert2';

const input = document.querySelector('input');
const botao = document.querySelector('button');
const divContainer = document.querySelector('section');

botao.addEventListener('click', () => {
  const moeda = input.value;
  if (!moeda) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Você precisa passar uma moeda',
    });
  } else {
    fetch(`https://api.exchangerate.host/latest?base=${moeda}`)
      .then((res) => res.json())
      .then((data) => {
        const tiposDeMoeda = Object.keys(data.rates);
        if (!tiposDeMoeda.includes(moeda)) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Moeda inexistente',
          });
        } else {
          const h2Div = document.createElement('h2');
          h2Div.innerText = `Valores referentes a 1 ${moeda}`;
          divContainer.appendChild(h2Div);
          const arrayDeMoedas = Object.entries(data.rates);
          arrayDeMoedas.forEach((dinheiro) => {
            const boxMoeda = document.createElement('div');
            const tipoMoeda = document.createElement('p');
            const valorMoeda = document.createElement('p');
            const [tipo, valor] = dinheiro;
            tipoMoeda.innerText = tipo;
            valorMoeda.innerText = valor;
            boxMoeda.appendChild(tipoMoeda);
            boxMoeda.appendChild(valorMoeda);
            divContainer.appendChild(boxMoeda);
          });
        }
      });
  }
});
