


export const telas = {
    adicionar: function (listaDeTelas) {
        const menu = document.querySelector('.botoesOpcoes');
        const conteudo = document.querySelector('.containerPrincipal');
        const containerCategorias = document.querySelector('.containerCategorias');

        menu.innerHTML = '';

        listaDeTelas.forEach((tela, index) => {
            const botao = document.createElement('div');
            botao.className = 'opcao';
            
            const icone = document.createElement('i');
            icone.className = tela.icone;
            botao.append(icone, ' ', tela.nome);

            botao.onclick = () => {
                menu.querySelectorAll('.opcao').forEach(bot => bot.classList.remove('containerCinza'));
                botao.classList.add('containerCinza');

                conteudo.innerHTML = '';
                containerCategorias.innerHTML = ''; 

                tela.criar(conteudo, containerCategorias);

                if (index == 0) {
                    containerCategorias.style.borderTopLeftRadius = '0';
                } else {
                    containerCategorias.style.borderRadius = '';
                }
            };

            menu.appendChild(botao);

            if (index == 0) botao.click();
        });
    }
};