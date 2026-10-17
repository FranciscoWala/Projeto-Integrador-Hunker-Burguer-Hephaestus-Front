import { criarEl } from '../utils/dom.js';
import { getAllHamburguers, getAllCategorias, getHamburguersByCategoria } from './apiRoutes/telaPrincipal.js';
import { telaManager } from './telasManager.js';
import { criarTelaInformacoes } from './informacoes.js';

export async function criarTelaResultados(container, funcaoVoltar) {
    container.innerHTML = '';
    const secResultado = criarEl('section', 'containerResultado');
    const topoResultado = criarEl('div', 'topoResultado');
    const btnVoltar = criarEl('a', 'btnVoltarResultados');
    btnVoltar.href = '#';

    const imgVoltar = criarEl('img');
    imgVoltar.src = './img/botaoCarrossel.svg';

    btnVoltar.append(imgVoltar, document.createTextNode(' Voltar'));
    topoResultado.append(btnVoltar);

    btnVoltar.addEventListener('click', (evento) => {
        evento.preventDefault();
        telaManager.renderizar(funcaoVoltar);
    });

    const ilustracaoDoug = criarEl('div', 'ilustracaoDoug');
    const imgDoug = criarEl('img');
    imgDoug.src = './img/dougDesenhando.png';
    ilustracaoDoug.append(imgDoug);

    const barraCategoriasWrapper = criarEl('div', 'barraCategoriasWrapper');
    const barraCategorias = criarEl('div', 'barraCategorias containerCard');

    const categoriaTodosItem = criarEl('div', 'categoriaItem');
    const imgTodos = criarEl('img');
    imgTodos.src = './img/haborgue.png';
    const pTodos = criarEl('p', '', 'Todos');
    categoriaTodosItem.append(imgTodos, pTodos);
    barraCategorias.append(categoriaTodosItem);

    categoriaTodosItem.addEventListener('click', async () => {
        const listaTodos = await getAllHamburguers();
        await renderizarProdutos(listaTodos);
    });

    const listaCategorias = await getAllCategorias();
    
    if (listaCategorias && listaCategorias.length > 0) {
        for (let i = 0; i < listaCategorias.length; i++) {
            let cat = listaCategorias[i];

            const categoriaItem = criarEl('div', 'categoriaItem');
            const imgCategoria = criarEl('img');
            
            if (cat.foto && cat.foto !== '') {
                imgCategoria.src = cat.foto;
            } else {
                imgCategoria.src = './img/haborgue.png';
            }

            const pCategoria = criarEl('p', '', cat.categoria);
            categoriaItem.append(imgCategoria, pCategoria);
            barraCategorias.append(categoriaItem);

            categoriaItem.addEventListener('click', async () => {
                const listaFiltrada = await getHamburguersByCategoria(cat.id);
                await renderizarProdutos(listaFiltrada);
            });
        }
    }
    barraCategoriasWrapper.append(barraCategorias);

    const gridResultados = criarEl('div', 'gridResultados');

    async function renderizarProdutos(produtos) {
        gridResultados.innerHTML = '';

        if (produtos && produtos.length > 0) {
            for (let i = 0; i < produtos.length; i++) {
                let hamburguer = produtos[i];

                const cardapioItem = criarEl('div', 'cardapioItem');
                const containerCardHamburguer = criarEl('div', 'containerCard');
                const imgItem = criarEl('img');

                if (hamburguer.foto && hamburguer.foto !== '') {
                    imgItem.src = hamburguer.foto;
                } else {
                    imgItem.src = './img/haborgue.png';
                }
                
                containerCardHamburguer.append(imgItem);

                const nomeItem = criarEl('p', '', hamburguer.nome);
                nomeItem.id = 'nomeItem';

                const containerIngredientes = criarEl('div', 'ingredientes');
                if (hamburguer.ingredientes && hamburguer.ingredientes.length > 0) {
                    for (let j = 0; j < hamburguer.ingredientes.length; j++) {
                        containerIngredientes.append(criarEl('p', '', hamburguer.ingredientes[j].nome));
                    }
                } else {
                    containerIngredientes.append(criarEl('p', '', 'Sem ingredientes'));
                }

                const precoFormatado = Number(hamburguer.preco).toFixed(2).replace('.', ',');
                const valorItem = criarEl('h1', '', `R$ ${precoFormatado}`);
                valorItem.id = 'valorItem';

                cardapioItem.append(containerCardHamburguer, nomeItem, containerIngredientes, valorItem);
                
                cardapioItem.addEventListener('click', () => {
                    telaManager.renderizar((cont) => criarTelaInformacoes(cont, hamburguer.id, () => criarTelaResultados(cont, funcaoVoltar)));
                });

                gridResultados.append(cardapioItem);
            }
        } else {
            gridResultados.append(criarEl('h2', '', 'Nenhum hambúrguer encontrado para esta categoria.'));
        }
    }

    const listaInicial = await getAllHamburguers();
    await renderizarProdutos(listaInicial);

    secResultado.append(topoResultado, ilustracaoDoug, barraCategoriasWrapper, gridResultados);
    container.append(secResultado);
}