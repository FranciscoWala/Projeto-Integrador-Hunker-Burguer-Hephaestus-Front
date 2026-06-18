
import { criarEl } from '../utils/dom.js';
import { criarSecaoPesquisa } from '../components/pesquisa.js';
import { criarModalIngrediente } from '../components/modalIngredientes.js';
import { getAllIngredientes, getIngredienteById } from '../telas/apiRoutes/ingredienteRoutes.js';

export async function telaIngredientes(container) {
    container.innerHTML = '';

    const modal = await criarModalIngrediente();

    function pesquisaIngrediente(texto) {
        console.log(texto);
    }

    function abrirModalAdicionar() {
        modal.abrirModal(null);
    }

    const secaoPesquisa = criarSecaoPesquisa(pesquisaIngrediente, abrirModalAdicionar);
    const containerResultados = criarEl('div', 'containerResultados');

    const listaIngredientes = await getAllIngredientes();

    if (listaIngredientes) {
        for (let ingrediente of listaIngredientes) {
            const card = criarEl('div', 'containerCard');

            const itemDados = criarEl('div', 'itemDados');
            const img = criarEl('img');

            if (ingrediente.foto) {
                img.src = ingrediente.foto;
            } else {
                img.src = './img/fotoPadrao.png';
            }

            const nome = criarEl('p', '', ingrediente.nome);
            itemDados.append(img, nome);
            const infosItem = criarEl('div', 'infosItem');

            const idFormatado = String(ingrediente.id).padStart(2, '0');
            const precoFormatado = `R$ ${ingrediente.preco.toFixed(2).replace('.', ',')}`;

            infosItem.append(
                criarEl('p', '', idFormatado),
                criarEl('p', '', precoFormatado)
            );

            card.dataset.id = ingrediente.id;

            card.addEventListener('click', async () => {
                const dadosDoIngrediente = await getIngredienteById(ingrediente.id);

                if (dadosDoIngrediente) {
                    if (dadosDoIngrediente.foto === './img/fotoPadrao.png' || !dadosDoIngrediente.foto) {
                        dadosDoIngrediente.foto = ingrediente.foto;
                    }
                    modal.abrirModal(dadosDoIngrediente);
                } else {
                    alert('não foi possível carregar esse ingrediente');
                }
            });

            card.append(itemDados, infosItem);
            containerResultados.appendChild(card);
        }
    } else {
        alert('não foi possivel listar os ingredientes');
    }

    container.append(secaoPesquisa, containerResultados, modal);
}