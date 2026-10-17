import { criarEl } from '../utils/dom.js';
import { telaManager } from './telasManager.js';
import { getHamburguerById } from './apiRoutes/telaPrincipal.js';

export async function criarTelaInformacoes(container, idHamburguer, funcaoVoltar) {
    container.innerHTML = '';

    const hamburguer = await getHamburguerById(idHamburguer);

    if (!hamburguer) {
        const secErro = criarEl('section', 'containerInformacoes');
        const h1Erro = criarEl('h1', '', 'Hambúrguer não encontrado');
        secErro.append(h1Erro);
        container.append(secErro);
        return;
    }

    const secInformacoes = criarEl('section', 'containerInformacoes');
    const wrapperInfo = criarEl('div', 'infoProdutoWrapper');

    const btnVoltar = criarEl('a', 'btnVoltar');
    btnVoltar.href = '#';
    
    const imgVoltar = criarEl('img');
    imgVoltar.src = './img/botaoCarrossel.svg';
    
    btnVoltar.append(imgVoltar, document.createTextNode(' Voltar'));

    btnVoltar.addEventListener('click', (evento) => {
        evento.preventDefault();
        telaManager.renderizar(funcaoVoltar);
    });

    const divProdutoDestaque = criarEl('div', 'produtoDestaque');
    const imgProduto = criarEl('img');
    
    if (hamburguer.foto && hamburguer.foto !== '') {
        imgProduto.src = hamburguer.foto;
    } else {
        imgProduto.src = './img/haborgue.png';
    }
    divProdutoDestaque.append(imgProduto);

    const divProdutoDetalhes = criarEl('div', 'produtoDetalhes');
    
    const h1Titulo = criarEl('h1', 'produtoTitulo', hamburguer.nome);

    let precoFormatado = '0,00';
    if (hamburguer.preco) {
        precoFormatado = Number(hamburguer.preco).toFixed(2).replace('.', ',');
    }
    const h2Preco = criarEl('h2', 'produtoPreco', `RS ${precoFormatado}`);
    
    const h3IngredientesTitulo = criarEl('h3', 'ingredientesTitulo', 'Ingredientes');

    const ulIngredientesLista = criarEl('ul', 'ingredientesLista');

    if (hamburguer.ingredientes && hamburguer.ingredientes.length > 0) {
        for (let i = 0; i < hamburguer.ingredientes.length; i++) {
            let ingrediente = hamburguer.ingredientes[i];
            
            const liItem = criarEl('li', 'ingredienteItem');
            const divIcone = criarEl('div', 'ingredienteIcone');
            const imgIcone = criarEl('img');
            
            if (ingrediente.foto && ingrediente.foto !== '') {
                imgIcone.src = ingrediente.foto;
            } else {
                imgIcone.src = './img/tomate.png';
            }

            divIcone.append(imgIcone);
            liItem.append(divIcone, document.createTextNode(` ${ingrediente.nome}`));
            
            ulIngredientesLista.append(liItem);
        }
    } else {
        const liVazio = criarEl('li', 'ingredienteItem', 'Sem ingredientes cadastrados');
        ulIngredientesLista.append(liVazio);
    }

    divProdutoDetalhes.append(h1Titulo, h2Preco, h3IngredientesTitulo, ulIngredientesLista);
    wrapperInfo.append(btnVoltar, divProdutoDestaque, divProdutoDetalhes);
    secInformacoes.append(wrapperInfo);
    
    container.append(secInformacoes);
}