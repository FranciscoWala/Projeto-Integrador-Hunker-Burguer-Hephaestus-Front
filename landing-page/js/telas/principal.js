import { criarEl } from '../utils/dom.js';
import { getAllHamburguers } from './apiRoutes/telaPrincipal.js';
import { telaManager } from './telasManager.js';
import { criarTelaInformacoes } from './informacoes.js';
import { criarTelaResultados } from './resultados.js';

export async function criarTelaPrincipal(container) {
    container.innerHTML = '';

    const secCarrossel = criarEl('section', 'containerCarrossel');

    const btnCarrosselEsq = criarEl('img', 'botaoCarrossel');
    btnCarrosselEsq.id = 'btnCarrosselEsquerdo';
    btnCarrosselEsq.src = './img/botaoCarrossel.svg';

    const carrosselItem = criarEl('div', 'carrosselItem');

    const textoCarrossel = criarEl('div', 'textoCarrossel');
    textoCarrossel.append(
        criarEl('h1', '', 'Os melhores'),
        criarEl('h1', '', 'Hamburgueres')
    );

    const imgDoug = criarEl('img');
    imgDoug.src = './img/dougCarrossel.png';

    const containerBotoes = criarEl('div', 'containerBotoes');

    const btnCardapio = criarEl('div', 'button');
    const iconeCardapio = criarEl('img');
    iconeCardapio.src = './img/boatao.svg';
    btnCardapio.append(criarEl('h1', '', 'Ver Cardápio'), iconeCardapio);

    const btnEncontrar = criarEl('div', 'button');
    const iconeEncontrar = criarEl('img');
    iconeEncontrar.src = './img/boatao.svg';
    btnEncontrar.append(criarEl('h1', '', 'Onde encontrar'), iconeEncontrar);

    containerBotoes.append(btnCardapio, btnEncontrar);
    carrosselItem.append(textoCarrossel, imgDoug, containerBotoes);

    const btnCarrosselDir = criarEl('img', 'botaoCarrossel');
    btnCarrosselDir.id = 'btnCarrosselDireito';
    btnCarrosselDir.src = './img/botaoCarrossel.svg';

    secCarrossel.append(btnCarrosselEsq, carrosselItem, btnCarrosselDir);

    const secDestaque = criarEl('section', 'destaqueContainer');
    const tituloDestaque = criarEl('h1', '', 'Destaque do dia');

    const destaques = criarEl('div', 'destaques');

    const destaqueDia = criarEl('div', 'containerCard destaqueDia');
    const imgHamburguerDestaque = criarEl('img');
    imgHamburguerDestaque.src = './img/hamburguerDestaque.png';

    const destaqueDetalhes = criarEl('div', 'destaqueDetalhes');
    destaqueDetalhes.append(
        criarEl('h1', '', 'Nome Hamburguer'),
        criarEl('p', '', 'Ingrediente 1, Ingrediente 2, Ingrediente 3, Ingrediente 4, Ingrediente 5, Ingrediente 6.'),
        criarEl('button', '', 'Ver')
    );

    destaqueDia.append(imgHamburguerDestaque, destaqueDetalhes);

    const containerOutros = criarEl('div', 'containerOutrosDestaques');

    const destaqueMes = criarEl('div', 'containerDestaqueOutro');
    destaqueMes.append(criarEl('h1', '', 'Destaques do Mês'));

    const destaqueSemana = criarEl('div', 'containerDestaqueOutro');
    destaqueSemana.append(criarEl('h1', '', 'Destaques da Semana'));

    containerOutros.append(destaqueMes, destaqueSemana);
    destaques.append(destaqueDia, containerOutros);
    secDestaque.append(tituloDestaque, destaques);

    const secCardapio = criarEl('section', 'cardapioContainer');
    const headerCardapio = criarEl('header');

    const btnVerTudo = criarEl('h1', '', 'Ver tudo');
    btnVerTudo.id = 'verTudo';
    headerCardapio.append(criarEl('h1', '', 'Cardapio'), btnVerTudo);

    btnVerTudo.addEventListener('click', () => {
        telaManager.renderizar((cont) => criarTelaResultados(cont, criarTelaPrincipal));
    });

    const containerCardapioItens = criarEl('div', 'cardapioContainerItens');


    const listaHamburgueres = await getAllHamburguers();

    let limite = 8;
    if (listaHamburgueres.length < 8) {
        limite = listaHamburgueres.length;
    }

    for (let i = 0; i < limite; i++) {
        let hamburguer = listaHamburgueres[i];
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
            for (let ingrediente of hamburguer.ingredientes) {
                containerIngredientes.append(criarEl('p', '', ingrediente.nome));
            }
        } else {
            containerIngredientes.append(criarEl('p', '', 'Sem ingredientes'));
        }

        const precoFormatado = Number(hamburguer.preco).toFixed(2).replace('.', ',');
        const valorItem = criarEl('h1', '', `R$ ${precoFormatado}`);
        valorItem.id = 'valorItem';

        cardapioItem.append(containerCardHamburguer, nomeItem, containerIngredientes, valorItem);

        cardapioItem.addEventListener('click', () => {
            telaManager.renderizar((cont) => criarTelaInformacoes(cont, hamburguer.id, criarTelaPrincipal));
        });

        containerCardapioItens.append(cardapioItem);
    }

    secCardapio.append(headerCardapio, containerCardapioItens);

    const secSobre = criarEl('section', 'sobreNosContainer');

    const secaoHeader = criarEl('div', 'secaoHeader');
    secaoHeader.append(criarEl('h1', '', 'Sobre nos:'));

    const sobreNosBox = criarEl('div', 'sobreNosBox containerCard');

    const topSection = criarEl('div', 'topSection');
    const historiaTxt = criarEl('div', 'historiaTxt');
    historiaTxt.append(
        criarEl('h2', '', 'Nossa Historia:'),
        criarEl('p', '', 'Fundada na década de 1950 pelo excêntrico chapeiro William "Honker" Henderson, a lanchonete começou como um modesto trailer de drive-in nos limites de Bluffington. Diz a lenda local que William testou dezenas de receitas até acidentalmente derramar um toque de melaço em seu molho especial, criando um hambúrguer com um sabor agridoce tão irresistível que os motoristas começaram a passar buzinando freneticamente em sinal de aprovação e pedindo mais.')
    );

    const historiaImg = criarEl('div', 'historiaImg');
    const imgHonker = criarEl('img');
    imgHonker.src = './img/honkerFoto.png';
    historiaImg.append(imgHonker);

    topSection.append(historiaTxt, historiaImg);

    const bottomSection = criarEl('div', 'bottomSection');

    const fotoAberturaBox = criarEl('div', 'fotoAberturaBox');
    const imgAbertura = criarEl('img');
    imgAbertura.src = './img/honkerFotoAntiga.png';
    fotoAberturaBox.append(criarEl('h2', '', 'Foto do dia de abertura'), imgAbertura);

    const compromissosBox = criarEl('div', 'compromissosBox');
    compromissosBox.append(
        criarEl('h2', '', 'Nossos Compromissos'),
        criarEl('div', 'compromisso containerCardClaro', 'Ingredientes Sempre Frescos'),
        criarEl('div', 'compromisso containerCardClaro', 'Atendimento Ágil'),
        criarEl('div', 'compromisso containerCardClaro', 'Higiene Impecável')
    );

    bottomSection.append(fotoAberturaBox, compromissosBox);
    sobreNosBox.append(topSection, bottomSection);
    secSobre.append(secaoHeader, sobreNosBox);

    const footer = criarEl('footer');

    const imgFooterFundo = criarEl('img', 'footerFundo');
    imgFooterFundo.src = './img/footer.png';

    const containerFooter = criarEl('div', 'containerFooter');
    const footerInfos = criarEl('div', 'footerInfos');

    const col1 = criarEl('div', 'colunaFooter');
    col1.append(
        criarEl('h3', '', 'Suporte'),
        criarEl('p', '', "FAQ's"),
        criarEl('p', '', 'Politica de privacidade'),
        criarEl('p', '', 'Termos e condiçoes')
    );

    const col2 = criarEl('div', 'colunaFooter');
    const pTel = criarEl('p');
    pTel.append(criarEl('i', 'fa-solid fa-phone'), document.createTextNode(' 4002-8922'));

    const pEmail = criarEl('p');
    pEmail.append(criarEl('i', 'fa-solid fa-envelope'), document.createTextNode(' honkerBurguer.com'));

    col2.append(
        criarEl('h3', '', 'Telefone'),
        pTel,
        criarEl('h3', 'espacoCima', 'Email'),
        pEmail
    );

    const col3 = criarEl('div', 'colunaFooter');

    const pLocal = criarEl('p');
    const spanLocal = criarEl('span');
    spanLocal.append(document.createTextNode(' Cidade'), criarEl('br'), document.createTextNode('Bluffington, 73'));
    pLocal.append(criarEl('i', 'fa-solid fa-location-dot'), spanLocal);

    const redesIcones = criarEl('div', 'redesIcones');
    redesIcones.append(
        criarEl('i', 'fa-brands fa-instagram'),
        criarEl('i', 'fa-brands fa-square-facebook'),
        criarEl('i', 'fa-brands fa-reddit'),
        criarEl('i', 'fa-brands fa-x-twitter')
    );

    col3.append(
        criarEl('h3', '', 'Localizaçao'),
        pLocal,
        criarEl('h3', 'espacoCima', 'Redes'),
        redesIcones
    );

    const col4 = criarEl('div', 'colunaFooter logoCol');
    const imgLogoFooter = criarEl('img', 'logoFooter');
    imgLogoFooter.src = './img/logo.png';
    col4.append(imgLogoFooter);

    footerInfos.append(col1, col2, col3, col4);
    containerFooter.append(footerInfos);
    footer.append(imgFooterFundo, containerFooter);

    container.append(secCarrossel, secDestaque, secCardapio, secSobre, footer);
}