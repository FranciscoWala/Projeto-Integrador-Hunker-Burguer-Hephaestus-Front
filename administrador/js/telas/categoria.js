import { criarEl } from '../utils/dom.js';
import { criarSecaoPesquisa } from '../components/pesquisa.js';
import { criarModalCategoria } from '../components/modalCategoria.js';
import { getAllCategorias, getCategoriaById } from '../telas/apiRoutes/categoriaRoutes.js';

export async function telaCategorias(container) {
  container.innerHTML = '';
  
  const modal = await criarModalCategoria();

  function pesquisaCategoria(texto) {
    console.log(texto);
  }

  function abrirModalAdicionar() {
    modal.abrirModal(null);
  }

  const secaoPesquisa = criarSecaoPesquisa(pesquisaCategoria, abrirModalAdicionar);
  const containerResultados = criarEl('div', 'containerResultados');
  
  const listaCategorias = await getAllCategorias();

  if (listaCategorias) {
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
            alert('erro ao carregar a categoria.');
        }
      });

      card.append(itemDados, infosItem);
      containerResultados.appendChild(card);
    }
  } else {
    alert('não foi possivel carregar a lista de categorias');
  }

  container.append(secaoPesquisa, containerResultados, modal);
}