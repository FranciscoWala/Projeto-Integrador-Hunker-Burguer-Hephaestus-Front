import { mostrar } from '../js/utils/interface.js';

const botaoLogin = document.getElementById('btnLogin');
const inputNome = document.getElementById('emailUser');
const inputSenha = document.getElementById('senhaUser');

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {
        return true;
    } else {
        return false;
    }
}

function logar() {
    let dataAtual = new Date();
    let containerLogin = document.getElementById('containerLogin');
    let dataLogin = document.getElementById('dataLogin');
    let nomeUsuario = document.getElementById('userName');

    let emailValor = inputNome.value.trim();
    let senhaValor = inputSenha.value;

    if (inputNome.value.trim() == '') {
        mostrar.mensagem('O campo Email é obrigatório', 'fa-solid fa-user', 'erro');
        return;
    }

    if (validarEmail(emailValor) == false) {
        mostrar.mensagem('Por favor insira um e-mail válido.', 'fa-solid fa-envelope', 'erro');
        return;
    }

    if (inputSenha.value.trim() == '') {
        mostrar.mensagem('O campo Senha é obrigatório', 'fa-solid fa-user', 'erro');
        return;
    }

    containerLogin.style.display = 'none';
    containerLogin.style.pointerEvents = 'none';
    dataLogin.textContent = `Login: (${dataAtual.toLocaleTimeString('pt-BR')} ${dataAtual.toLocaleDateString('pt-BR')})`;
    nomeUsuario.textContent = `Usuário: ${inputNome.value}`;
}

inputNome.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault();
        inputSenha.focus();
    }
});

inputSenha.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault();
        botaoLogin.click();
    }
});

const dataHora = document.getElementById('dataHora');
setInterval(() => {
    let agora = new Date();
    dataHora.textContent = `${agora.toLocaleTimeString('pt-BR')}   ${agora.toLocaleDateString('pt-BR')}`;
}, 1000);

botaoLogin.addEventListener('click', logar);