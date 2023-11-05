const gameInicio = document.querySelector('.gameInicio');
const gameContent = document.querySelector('.gameContent');
const formDificultad = document.querySelector('.dificultad');
const divInicio = document.querySelector('.inicio');
const btnGameStart = document.getElementById('btn-gameStart');

const formComprobarNumber = document.querySelector('.formComprobarNumber');
const numberInput = document.getElementById('numberInput');
const contentInfo = document.querySelector('.contentInfo');
const divIntentos = document.getElementById('divIntentos');
const divCronometro = document.getElementById('divCronometro');
const divRandom = document.getElementById('divRandom');

let numRandom;
let intentos;
let numIntentos = 0;
let tiempo = 30;
let win = false; 

let cronometro;

for(const dificultad of formDificultad.children){
    dificultad.addEventListener('click',()=>{
        gameInicio.style.display = 'none';
        gameContent.style.animation = 'aparecer 1s forwards';
        setDificultad(dificultad.value);
        startGame();
    });
}

btnGameStart.addEventListener('click',()=>{
    divInicio.style.display = 'none';
    formDificultad.style.display = 'flex';
});
function comprobarNumber(number) {
    if (number != "") {
        if (number > numRandom){
            contentInfo.textContent = 'El numero es menor al que ingreso';
            contentInfo.style.color = '#fff';
            numIntentos++;
        }
        else if (number < numRandom){
            contentInfo.textContent = 'El numero es mayor al que ingreso';
            contentInfo.style.color = '#111';
            numIntentos++;
        }else win = true;
        divIntentos.textContent = `Intentos: ${numIntentos}/${intentos}`;
        endGame();
    }
}
const setDificultad=(dificultad)=>{
    if(dificultad == 'Fácil')intentos=10;
    if(dificultad == 'Difícil')intentos=5;
    if(dificultad == 'Imposible')intentos=3;
}
const startGame =()=>{
    numberInput.focus();
    numRandom = Math.floor(Math.random()*1000)+1;
    divIntentos.textContent = `Intentos: 0/${intentos}`;
    cronometro = setInterval(() => {
        tiempo--;
        divCronometro.textContent = tiempo;
        if (tiempo == 0) {
            endGame();
        }
    }, 1000);
}
const endGame=()=>{
    if(win || numIntentos == intentos || tiempo == 0){
        if(win)contentInfo.textContent = `Ganaste adivinaste el numero`;
        if(numIntentos == intentos)contentInfo.textContent = `Perdiste por intentos terminados`;
        if(tiempo == 0)contentInfo.textContent = `Perdiste por falta de tiempo`;
        clearInterval(cronometro);
        divRandom.textContent = numRandom;
    }
}
formComprobarNumber.addEventListener('submit',(e)=>{
    e.preventDefault();
    comprobarNumber(numberInput.value);
    formComprobarNumber.reset();
});