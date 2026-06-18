import { criarHeaderBotao, criarEl } from '../utils/dom.js';
import { criarSecaoPesquisa } from '../components/pesquisa.js';
import { criarModal } from '../components/modal.js';

import { getAllcategorias, getAllHamburguers, getHamburguerById } from './apiRoutes/hamburguerRoutes.js';

export async function telaHamburguer(container, header) {
  container.innerHTML = '';
  header.innerHTML = '';

  const listaCategorias = await getAllcategorias();

  if (listaCategorias) {
    for (let categoria of listaCategorias) {
      const botaoCategoria = criarHeaderBotao(categoria.foto, categoria.nome);
      botaoCategoria.dataset.id = categoria.id;

      botaoCategoria.addEventListener('click', () => {
        console.log(botaoCategoria.dataset.id);
      });

      header.appendChild(botaoCategoria);
    }
  } else {
    alert('erro ao carregar categorias');
  }
  
  const modal = await criarModal();

  function pesquisaHamburguer(texto) {
    console.log(texto);
  }

  function abrirModalAdicionar() {
    modal.abrirModal(null);
  }

  const secaoPesquisa = criarSecaoPesquisa(pesquisaHamburguer, abrirModalAdicionar);
  const containerResultados = criarEl('div', 'containerResultados');
  const listaHamburgueres = await getAllHamburguers();

  if (listaHamburgueres) {
    for (let hamburguer of listaHamburgueres) {
      const card = criarEl('div', 'containerCard');

      const itemDados = criarEl('div', 'itemDados');
      const img = criarEl('img');

      if (hamburguer.foto) {
          img.src = hamburguer.foto;
      } else {
          img.src = './img/haborgue.png'; 
      }
      
      const nome = criarEl('p', '', hamburguer.nome);
      itemDados.append(img, nome);

      const infosItem = criarEl('div', 'infosItem');
      const idFormatado = String(hamburguer.id).padStart(2, '0');
      const precoFormatado = `R$ ${hamburguer.preco.toFixed(2).replace('.', ',')}`;

      infosItem.append(
        criarEl('p', '', idFormatado),
        criarEl('p', '', precoFormatado)
      );

      card.dataset.id = hamburguer.id;

      card.addEventListener('click', async () => {
        const dadosDoHamburguer = await getHamburguerById(hamburguer.id);
        
        if (dadosDoHamburguer) {
            modal.abrirModal(dadosDoHamburguer);
        } else {
            alert('erro ao carregar detalhes do item');
        }
      });

      card.append(itemDados, infosItem);
      containerResultados.appendChild(card);
    }
  } else {
    alert('erro ao carregar hamburgueres');
  }

  container.append(secaoPesquisa, containerResultados, modal);
}