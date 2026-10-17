import { criarEl } from '../utils/dom.js';
import { insertHamburguer, updateHamburguer, deleteHamburguer, getAllIngredientes, getAllcategorias } from '../telas/apiRoutes/hamburguerRoutes.js';
import { uploadParaCloudinary } from '../utils/cloudnary.js';
import { mostrar } from '../utils/interface.js';

export async function criarModal(onUpdateCallback) {
    const modal = criarEl('div', 'janela container');
    modal.id = 'modalAdicionarEditar';
    modal.style.display = 'none';

    let idAtual = 0;
    let urlFotoAtual = "";
    let arquivoSelecionado = null;

    const janelaConteudo = criarEl('div', 'janelaConteudo');

    const imgPreview = criarEl('img', 'imgJanela');
    imgPreview.id = 'imgPreview';
    imgPreview.src = './img/fotoPadrao.png';
    imgPreview.style.cursor = 'pointer';

    const inputImagem = criarEl('input');
    inputImagem.type = 'file';
    inputImagem.id = 'inputImagem';
    inputImagem.accept = 'image/png, image/jpeg';
    inputImagem.style.display = 'none';

    imgPreview.addEventListener('click', () => {
        inputImagem.click();
    });

    inputImagem.addEventListener('change', (event) => {
        arquivoSelecionado = event.target.files[0];
        if (arquivoSelecionado) {
            imgPreview.src = URL.createObjectURL(arquivoSelecionado);
        }
    });

    const janelaValores = criarEl('div', 'janelaValores');
    janelaValores.append(
        criarEl('p', '', 'Custo R$ 9.999'),
        criarEl('p', '', 'Venda R$ 9.999')
    );

    const janelaInputs = criarEl('div', 'janelaInputs');

    const grupoNome = criarEl('div', 'inputGroup');
    grupoNome.append(criarEl('label', '', 'Nome'), criarEl('input'));
    grupoNome.querySelector('input').type = 'text';

    const grupoCategorias = criarEl('div', 'container-multiselect');
    grupoCategorias.id = 'containerMulti';
    const labelCat = criarEl('label', '', 'Categorias');

    const selectFalso = criarEl('div', 'select-falso');
    selectFalso.id = 'btnSelectCategorias';
    const selectRaw = criarEl('select');
    const optionSelecionadas = criarEl('option');
    optionSelecionadas.id = 'texto-categorias';
    const mascaraClique = criarEl('div', 'mascara-clique');
    selectRaw.appendChild(optionSelecionadas);
    selectFalso.append(selectRaw, mascaraClique);

    const listaCategorias = criarEl('div');
    listaCategorias.id = 'lista-categorias';
    listaCategorias.style.display = 'none';

    const categoriasMenu = await getAllcategorias();
    const checkboxes = [];

    if (categoriasMenu) {
        for (let cat of categoriasMenu) {
            const label = criarEl('label');
            const checkbox = criarEl('input');
            checkbox.type = 'checkbox';
            checkbox.value = cat.nome.toLowerCase();
            checkbox.dataset.id = cat.id;

            checkbox.addEventListener('change', () => {
                let selecionados = [];
                for (let cb of checkboxes) {
                    if (cb.checked) {
                        selecionados.push(cb.value);
                    }
                }

                if (selecionados.length > 0) {
                    optionSelecionadas.textContent = selecionados.join(', ');
                } else {
                    optionSelecionadas.textContent = '';
                }
            });

            checkboxes.push(checkbox);
            label.append(checkbox, ` ${cat.nome}`);
            listaCategorias.appendChild(label);
        }
    }

    let categoriasAbertas = false;
    selectFalso.addEventListener('click', (e) => {
        e.stopPropagation();

        if (categoriasAbertas === false) {
            categoriasAbertas = true;
            listaCategorias.style.display = "block";
        } else {
            categoriasAbertas = false;
            listaCategorias.style.display = "none";
        }
    });

    document.addEventListener('click', (event) => {
        if (categoriasAbertas) {
            if (!grupoCategorias.contains(event.target)) {
                listaCategorias.style.display = "none";
                categoriasAbertas = false;
            }
        }
    });

    grupoCategorias.append(labelCat, selectFalso, listaCategorias);

    const grupoIngredientes = criarEl('div', 'inputGroup');
    const inputIngredientes = criarEl('input');
    inputIngredientes.type = 'text';
    inputIngredientes.readOnly = true;
    inputIngredientes.style.cursor = 'pointer';

    grupoIngredientes.append(criarEl('label', '', 'Ingredientes'), inputIngredientes);

    const modalIngredientes = await criarModalIngredientes(inputIngredientes);

    inputIngredientes.addEventListener('click', () => {
        modalIngredientes.style.display = 'flex';
    });

    modal.appendChild(modalIngredientes);

    const grupoDescricao = criarEl('div', 'inputGroup');
    const inputDescricao = criarEl('input');
    inputDescricao.type = 'text';
    grupoDescricao.append(criarEl('label', '', 'Descrição'), inputDescricao);

    const grupoPreco = criarEl('div', 'inputGroup');
    grupoPreco.append(criarEl('label', '', 'Preço'), criarEl('input'));
    grupoPreco.querySelector('input').type = 'number';

    janelaInputs.append(grupoNome, grupoCategorias, grupoIngredientes, grupoDescricao, grupoPreco);

    const janelaBotoes = criarEl('div', 'janelaBotoes');
    const btnSalvar = criarEl('button', 'btnSalvar', 'Salvar');
    const btnExcluir = criarEl('button', 'vermelho btnExcluir', 'Excluir');

    btnExcluir.addEventListener('click', async () => {
        if (idAtual === 0) {
            modal.style.display = 'none';
        } else {
            let confirmacao = confirm("Tem certeza que deseja excluir este hambúrguer?");

            if (confirmacao === true) {
                btnExcluir.textContent = "Excluindo...";
                btnExcluir.disabled = true;

                let sucesso = await deleteHamburguer(idAtual);

                if (sucesso === true) {
                    mostrar.mensagem("Excluído com sucesso!", "fa-solid fa-check");
                    modal.style.display = 'none';

                    if (onUpdateCallback) await onUpdateCallback();
                } else {
                    mostrar.mensagem("Erro ao excluir.", "fa-solid fa-xmark", "erro");
                }

                btnExcluir.textContent = "Excluir";
                btnExcluir.disabled = false;
            }
        }
    });

    modal.abrirModal = (hamburguer = null) => {
        if (hamburguer) {
            idAtual = hamburguer.id;
            urlFotoAtual = hamburguer.foto;
            arquivoSelecionado = null;

            grupoNome.querySelector('input').value = hamburguer.nome;
            inputDescricao.value = hamburguer.descricao;
            grupoPreco.querySelector('input').value = hamburguer.preco;
            
            if (hamburguer.foto) {
                imgPreview.src = hamburguer.foto;
            } else {
                imgPreview.src = './img/fotoPadrao.png';
            }
            
            btnExcluir.textContent = "Excluir";

            let textoCatSelecionadas = [];

            let listCat = [];
            if (hamburguer.categorias) {
                listCat = hamburguer.categorias;
            } else if (hamburguer.categoria) {
                listCat = hamburguer.categoria;
            }

            for (let cb of checkboxes) {
                cb.checked = false;
                for (let cat of listCat) {
                    if (parseInt(cb.dataset.id) === cat.id) {
                        cb.checked = true;
                        textoCatSelecionadas.push(cb.value);
                        break;
                    }
                }
            }
            optionSelecionadas.textContent = textoCatSelecionadas.join(', ');

            let idsIngs = [];
            let listIng = [];
            if (hamburguer.ingredientes) {
                listIng = hamburguer.ingredientes;
            }
            
            for (let ing of listIng) {
                idsIngs.push(ing.id);
            }
            modalIngredientes.setIngredientesSelecionados(idsIngs);

        } else {
            idAtual = 0;
            urlFotoAtual = "";
            arquivoSelecionado = null;

            grupoNome.querySelector('input').value = '';
            inputDescricao.value = '';
            grupoPreco.querySelector('input').value = '';
            imgPreview.src = './img/fotoPadrao.png';
            inputImagem.value = '';
            btnExcluir.textContent = "Cancelar";

            for (let cb of checkboxes) {
                cb.checked = false;
            }
            optionSelecionadas.textContent = '';

            modalIngredientes.setIngredientesSelecionados([]);
        }

        modal.style.display = 'flex';
    };

    btnSalvar.addEventListener('click', async () => {
        const nomeDigitado = grupoNome.querySelector('input').value.trim();
        const descricaoDigitada = inputDescricao.value.trim();

        let precoDigitado = parseFloat(grupoPreco.querySelector('input').value);
        if (isNaN(precoDigitado)) {
            precoDigitado = 0;
        }

        const categoriasArray = [];
        for (let cb of checkboxes) {
            if (cb.checked) {
                categoriasArray.push({ id: parseInt(cb.dataset.id) });
            }
        }

        let idsIngredientes = [];
        if (inputIngredientes.dataset.idsSelecionados) {
            idsIngredientes = JSON.parse(inputIngredientes.dataset.idsSelecionados);
        }

        const ingredientesArray = [];
        for (let id of idsIngredientes) {
            ingredientesArray.push({ id: parseInt(id) });
        }

        if (nomeDigitado === "") {
            mostrar.mensagem("O item deve ter um nome.", "fa-solid fa-triangle-exclamation", "erro");
            return;
        }

        if (descricaoDigitada === "") {
            mostrar.mensagem("Digite uma descrição.", "fa-solid fa-circle-exclamation", "erro");
            return;
        }

        if (precoDigitado <= 0) {
            mostrar.mensagem("O preço não pode ser menor ou igual a 0.", "fa-solid fa-circle-exclamation", "erro");
            return;
        }

        if (categoriasArray.length === 0) {
            mostrar.mensagem("Escolha pelo menos uma categoria.", "fa-solid fa-list", "erro");
            return;
        }

        if (ingredientesArray.length === 0) {
            mostrar.mensagem("Escolha pelo menos um ingrediente.", "fa-solid fa-burger", "erro");
            return;
        }

        if (idAtual === 0) {
            if (arquivoSelecionado === null) {
                mostrar.mensagem("A foto não pode ser vazia.", "fa-regular fa-image", "erro");
                return;
            }
        }

        btnSalvar.textContent = "Salvando...";
        btnSalvar.disabled = true;

        let urlDaFoto = urlFotoAtual;

        if (arquivoSelecionado) {
            console.log("upando imagem");
            const urlCloudinary = await uploadParaCloudinary(arquivoSelecionado);

            if (urlCloudinary) {
                urlDaFoto = urlCloudinary;
            } else {
                mostrar.mensagem("Falha ao fazer upload da imagem.", "fa-solid fa-cloud-arrow-up", "erro");
            }
        }

        const jsonFinal = {
            nome: nomeDigitado,
            preco: precoDigitado,
            foto: urlDaFoto,
            descricao: descricaoDigitada,
            categoria: categoriasArray,
            ingredientes: ingredientesArray
        };

        if (idAtual > 0) {
            jsonFinal.id = idAtual;
        }

        let sucesso = false;

        if (idAtual > 0) {
            console.log(JSON.stringify(jsonFinal, null, 2));
            sucesso = await updateHamburguer(jsonFinal);
        } else {
            console.log(JSON.stringify(jsonFinal, null, 2));
            sucesso = await insertHamburguer(jsonFinal);
        }

        if (sucesso) {
            mostrar.mensagem("Salvo com sucesso!", "fa-solid fa-check");
            modal.style.display = 'none';

            if (onUpdateCallback) await onUpdateCallback();
        } else {
            mostrar.mensagem("Erro ao salvar no banco de dados.", "fa-solid fa-database", "erro");
        }

        btnSalvar.textContent = "Salvar";
        btnSalvar.disabled = false;
    });

    janelaBotoes.append(btnSalvar, btnExcluir);
    janelaConteudo.append(imgPreview, inputImagem, janelaValores, janelaInputs, janelaBotoes);
    modal.appendChild(janelaConteudo);

    return modal;
}

async function criarModalIngredientes(inputDestino) {
    const modal = criarEl('div', 'janela modal-ingredientes');
    modal.style.display = 'none';

    const header = criarEl('div', 'containerCinza header-ing');
    const title = criarEl('h3', '', 'Ingredientes');
    const btnFechar = criarEl('i', 'fa-solid fa-x btn-fechar-ing');
    header.append(title, btnFechar);

    const barraPesquisa = criarEl('div', 'pesquisa-ing');
    const containerInput = criarEl('div', 'containerInputPesquisa containerIng');
    const inputBusca = criarEl('input');
    inputBusca.type = 'text';

    const itensPesquisa = criarEl('div', 'itensPesquisa');
    const iconeLupa = criarEl('i', 'fa-solid fa-magnifying-glass');
    itensPesquisa.appendChild(iconeLupa);

    containerInput.append(inputBusca, itensPesquisa);
    barraPesquisa.appendChild(containerInput);

    const abas = criarEl('div', 'abas-ing');
    const abaSelecionados = criarEl('span', '', 'Selecionados');
    const abaTodos = criarEl('span', 'ativo', 'Todos');
    abas.append(abaSelecionados, abaTodos);

    const listaFlex = criarEl('div', 'lista-ing-flex');

    const listaIngredientes = await getAllIngredientes();
    let selecionados = new Set();

    function atualizarInputDestino() {
        let nomes = [];
        
        if (listaIngredientes) {
            for (let ing of listaIngredientes) {
                if (selecionados.has(ing.id)) {
                    nomes.push(ing.nome);
                }
            }
        }
        
        inputDestino.value = nomes.join(', ');

        let idsArray = [];
        for (let id of selecionados) {
            idsArray.push(id);
        }
        inputDestino.dataset.idsSelecionados = JSON.stringify(idsArray);
    }

    function renderizarCards() {
        listaFlex.innerHTML = '';

        if (listaIngredientes) {
            for (let ing of listaIngredientes) {
                const card = criarEl('div', 'card-ingrediente');

                const imgBox = criarEl('div', 'img-box-ing');

                if (ing.foto) {
                    const img = criarEl('img');
                    img.src = ing.foto;
                    imgBox.appendChild(img);
                } else {
                    const iconeImg = criarEl('i', 'fa-regular fa-image');
                    imgBox.appendChild(iconeImg);
                }

                const checkBtn = criarEl('div', 'check-ing');
                if (selecionados.has(ing.id)) {
                    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
                    checkBtn.classList.add('marcado');
                }

                const infoBox = criarEl('div', 'info-ing');
                const nome = criarEl('p', 'nome-ing', ing.nome);
                const precoStr = ing.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                const preco = criarEl('p', 'preco-ing', `R$ ${precoStr}`);
                infoBox.append(nome, preco);

                card.append(imgBox, checkBtn, infoBox);

                card.addEventListener('click', () => {
                    if (selecionados.has(ing.id)) {
                        selecionados.delete(ing.id);
                    } else {
                        selecionados.add(ing.id);
                    }
                    renderizarCards();
                    atualizarInputDestino();
                });

                listaFlex.appendChild(card);
            }
        } else {
            const txtErro = criarEl('p', 'texto-aviso', 'Ingredientes indisponíveis no momento.');
            listaFlex.appendChild(txtErro);
        }
    }

    modal.setIngredientesSelecionados = (arrayDeIds) => {
        selecionados.clear();
        for (let id of arrayDeIds) {
            selecionados.add(id);
        }
        renderizarCards();
        atualizarInputDestino();
    };

    btnFechar.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    renderizarCards();
    modal.append(header, barraPesquisa, abas, listaFlex);

    return modal;
}