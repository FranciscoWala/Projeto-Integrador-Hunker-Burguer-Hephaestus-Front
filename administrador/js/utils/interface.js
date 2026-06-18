export const mostrar = {

    /**
     * Mostra um popup de notificação.
     * @param {string} mensagem - O texto da mensagem
     * @param {string|null} icone - (Opcional) Uma classe de icone (Font Awesome Ex: fa-solid fa-check)
     * @param {string} tipo - (Opcional) Se colocar 'erro' a mensagem fica vermelha
     */
    mensagem(mensagem, icone, tipo) {
        let container = document.getElementById('containerMensagem');

        if (container == undefined || container == null) {
            container = document.createElement('div');
            container.id = 'containerMensagem';
            container.className = 'containerMensagem';
            document.body.append(container);
        }

        const mensagensExistentes = container.querySelectorAll('.mensagem');
        let mensagemRepetida = null;

        mensagensExistentes.forEach(message => {
            const textoP = message.querySelector('.infosMensagem p');
            if (textoP && textoP.textContent == mensagem) {
                mensagemRepetida = message;
            }
        });

        if (mensagemRepetida) {
            mensagemRepetida.classList.remove('sair');

            mensagemRepetida.classList.remove('shake');
            void mensagemRepetida.offsetWidth; 
            mensagemRepetida.classList.add('shake');

            clearTimeout(mensagemRepetida.timeoutId);

            mensagemRepetida.timeoutId = setTimeout(() => {
                if (mensagemRepetida.classList.contains('sair')) return;
                mensagemRepetida.classList.remove('shake');
                mensagemRepetida.classList.add('sair');
                setTimeout(() => mensagemRepetida.remove(), 300);
            }, 5000);

            return; 
        }

        let containerMensagem = document.createElement('div');

        containerMensagem.className = 'mensagem container';

        if (tipo == 'erro') {
            containerMensagem.className = 'mensagem vermelho container';
        }

        let infosMensagem = document.createElement('div');
        infosMensagem.className = 'infosMensagem';
        containerMensagem.append(infosMensagem);

        if (icone != null && icone != undefined) {
            let iconeMensagem = document.createElement('i');
            iconeMensagem.className = icone;
            infosMensagem.append(iconeMensagem);
        }

        let texto = document.createElement('p');
        texto.textContent = mensagem;
        infosMensagem.append(texto);

        let fecharMensagem = document.createElement('i');
        fecharMensagem.className = 'fa-solid fa-x';
        containerMensagem.append(fecharMensagem);

        const _remover = function () {
            if (containerMensagem.classList.contains('sair')) {
                return;
            }

            containerMensagem.classList.remove('shake');
            containerMensagem.classList.add('sair');

            setTimeout(() => {
                containerMensagem.remove();
            }, 300);
        }

        fecharMensagem.addEventListener('click', _remover);
        containerMensagem.timeoutId = setTimeout(_remover, 5000 + (mensagensExistentes.length * 1500));

        container.append(containerMensagem);
    },
}