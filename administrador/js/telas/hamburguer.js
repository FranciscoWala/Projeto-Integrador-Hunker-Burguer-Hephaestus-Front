import { criarHeaderBotao, criarEl } from '../utils/dom.js';
import { criarSecaoPesquisa } from '../components/pesquisa.js';
import { criarModal } from '../components/modal.js';
import { getAllcategorias, getAllHamburguers, getHamburguerById } from './apiRoutes/hamburguerRoutes.js';
import { mostrar } from '../utils/interface.js';

export async function telaHamburguer(container, header) {
  container.innerHTML = '';
  header.innerHTML = '';

  const listaCategorias = await getAllcategorias();

  if (listaCategorias == false) {
    console.warn('Não foi possível carregar as categorias do cabeçalho.');
  } else if (listaCategorias.length > 0) {
    for (let categoria of listaCategorias) {
      const botaoCategoria = criarHeaderBotao(categoria.foto, categoria.nome);
      botaoCategoria.dataset.id = categoria.id;

      botaoCategoria.addEventListener('click', () => {
        console.log(botaoCategoria.dataset.id);
      });

      header.appendChild(botaoCategoria);
    }
  }

  const containerResultados = criarEl('div', 'containerResultados');

  async function recarregarCards() {
      containerResultados.innerHTML = '';
      const listaHamburgueres = await getAllHamburguers();

      if (listaHamburgueres == false) {
          const txtErro = criarEl('p', 'texto-aviso', 'Não foi possível carregar os hambúrgueres.');
          containerResultados.appendChild(txtErro);
          
      } else if (listaHamburgueres.length == 0) {
          const txtVazio = criarEl('p', 'texto-aviso', 'Nenhum hambúrguer encontrado.');
          containerResultados.appendChild(txtVazio);
          
      } else {
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
                      mostrar.mensagem("Erro ao carregar detalhes do item.", "fa-solid fa-xmark", "erro"); // Substituído
                  }
              });

              card.append(itemDados, infosItem);
              containerResultados.appendChild(card);
          }
      }
  }

  const modal = await criarModal(recarregarCards);

  function pesquisaHamburguer(texto) {
    console.log(texto);
  }

  function abrirModalAdicionar() {
    modal.abrirModal(null);
  }

  const secaoPesquisa = criarSecaoPesquisa(pesquisaHamburguer, abrirModalAdicionar);
  await recarregarCards();

  container.append(secaoPesquisa, containerResultados, modal);
}