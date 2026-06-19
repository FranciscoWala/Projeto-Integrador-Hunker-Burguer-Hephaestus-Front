import { criarEl } from '../utils/dom.js';
import { criarSecaoPesquisa } from '../components/pesquisa.js';
import { criarModalCategoria } from '../components/modalCategoria.js';
import { getAllCategorias, getCategoriaById } from '../telas/apiRoutes/categoriaRoutes.js';
import { mostrar } from '../utils/interface.js';

export async function telaCategorias(container) {
  container.innerHTML = '';
  const containerResultados = criarEl('div', 'containerResultados');

  async function recarregarCards() {
    containerResultados.innerHTML = '';
    const listaCategorias = await getAllCategorias();

    if (listaCategorias == false) {
      const txtErro = criarEl('p', 'texto-aviso', 'Não foi possível carregar as categorias.');
      containerResultados.appendChild(txtErro);

    } else if (listaCategorias.length == 0) {
      const txtVazio = criarEl('p', 'texto-aviso', 'Nenhuma categoria encontrada.');
      containerResultados.appendChild(txtVazio);

    } else {
      for (let categoria of listaCategorias) {
        const card = criarEl('div', 'containerCard');

        const itemDados = criarEl('div', 'itemDados');
        const img = criarEl('img');

        if (categoria.foto) {
          img.src = categoria.foto;
        } else {
          img.src = './img/fotoPadrao.png';
        }

        const nome = criarEl('p', '', categoria.nome);
        itemDados.append(img, nome);

        const infosItem = criarEl('div', 'infosItem');
        const idFormatado = String(categoria.id).padStart(2, '0');

        infosItem.append(
          criarEl('p', '', idFormatado)
        );

        card.dataset.id = categoria.id;

        card.addEventListener('click', async () => {
          const dadosDaCategoria = await getCategoriaById(categoria.id);

          if (dadosDaCategoria) {
            modal.abrirModal(dadosDaCategoria);
          } else {
            mostrar.mensagem("Erro ao carregar a categoria.", "fa-solid fa-xmark", "erro"); // Substituído
          }
        });

        card.append(itemDados, infosItem);
        containerResultados.appendChild(card);
      }
    }
  }

  const modal = await criarModalCategoria(recarregarCards);

  function pesquisaCategoria(texto) {
    console.log(texto);
  }

  function abrirModalAdicionar() {
    modal.abrirModal(null);
  }

  const secaoPesquisa = criarSecaoPesquisa(pesquisaCategoria, abrirModalAdicionar);
  await recarregarCards();

  container.append(secaoPesquisa, containerResultados, modal);
}