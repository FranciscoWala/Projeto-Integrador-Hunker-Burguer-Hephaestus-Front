import { criarEl } from '../utils/dom.js';
import { insertIngrediente, updateIngrediente, deleteIngrediente } from '../telas/apiRoutes/ingredienteRoutes.js'; 
import { uploadParaCloudinary } from '../utils/cloudnary.js';
import { mostrar } from '../utils/interface.js';

export async function criarModalIngrediente(onUpdateCallback) {
    const modal = criarEl('div', 'janela container');
    modal.id = 'modalIngrediente';
    modal.style.display = 'none';

    let idAtual = 0;
    let urlFotoAtual = "";
    let arquivoSelecionado = null;

    const janelaConteudo = criarEl('div', 'janelaConteudo');

    const imgPreview = criarEl('img', 'imgJanela');
    imgPreview.id = 'imgPreviewIngrediente';
    imgPreview.src = './img/fotoPadrao.png';
    imgPreview.style.cursor = 'pointer';

    const inputImagem = criarEl('input');
    inputImagem.type = 'file';
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

    const janelaInputs = criarEl('div', 'janelaInputs');
    
    const grupoNome = criarEl('div', 'inputGroup');
    grupoNome.append(criarEl('label', '', 'Nome'), criarEl('input'));
    grupoNome.querySelector('input').type = 'text';

    const grupoPreco = criarEl('div', 'inputGroup');
    grupoPreco.append(criarEl('label', '', 'Preço'), criarEl('input'));
    grupoPreco.querySelector('input').type = 'number';

    janelaInputs.append(grupoNome, grupoPreco);

    const janelaBotoes = criarEl('div', 'janelaBotoes');
    const btnSalvar = criarEl('button', 'btnSalvar', 'Salvar');
    const btnExcluir = criarEl('button', 'vermelho btnExcluir', 'Excluir');
    janelaBotoes.append(btnSalvar, btnExcluir);

    modal.abrirModal = (ingrediente = null) => {
        if (ingrediente) {
            idAtual = ingrediente.id;
            urlFotoAtual = ingrediente.foto;
            arquivoSelecionado = null;

            if (ingrediente.nome) {
                grupoNome.querySelector('input').value = ingrediente.nome;
            } else {
                grupoNome.querySelector('input').value = '';
            }

            if (ingrediente.preco) {
                grupoPreco.querySelector('input').value = ingrediente.preco;
            } else {
                grupoPreco.querySelector('input').value = 0;
            }

            if (ingrediente.foto) {
                imgPreview.src = ingrediente.foto;
            } else {
                imgPreview.src = './img/fotoPadrao.png';
            }

            btnExcluir.textContent = "Excluir";
        } else {
            idAtual = 0;
            urlFotoAtual = "";
            arquivoSelecionado = null;

            grupoNome.querySelector('input').value = '';
            grupoPreco.querySelector('input').value = '';
            imgPreview.src = './img/fotoPadrao.png';
            inputImagem.value = '';

            btnExcluir.textContent = "Cancelar";
        }
        modal.style.display = 'flex';
    };

    btnExcluir.addEventListener('click', async () => {
        if (idAtual === 0) {
            modal.style.display = 'none';
        } else {
            let confirmacao = confirm("Tem certeza que deseja excluir este ingrediente?");
            if (confirmacao === true) {
                btnExcluir.textContent = "Excluindo...";
                btnExcluir.disabled = true;

                let sucesso = await deleteIngrediente(idAtual);

                if (sucesso === true) {
                    mostrar.mensagem("Excluído com sucesso!", "fa-solid fa-check");
                    modal.style.display = 'none';

                    if (onUpdateCallback) {
                        await onUpdateCallback();
                    }
                } else {
                    mostrar.mensagem("Erro ao excluir do banco de dados.", "fa-solid fa-database", "erro");
                }

                btnExcluir.textContent = "Excluir";
                btnExcluir.disabled = false;
            }
        }
    });

    btnSalvar.addEventListener('click', async () => {
        const nomeDigitado = grupoNome.querySelector('input').value.trim();
        
        let precoDigitado = parseFloat(grupoPreco.querySelector('input').value);
        if (isNaN(precoDigitado)) {
            precoDigitado = 0;
        }

        if (nomeDigitado === "") {
            mostrar.mensagem("O nome não pode ser vazio.", "fa-solid fa-triangle-exclamation", "erro");
            return;
        }

        if (precoDigitado <= 0) {
            mostrar.mensagem("O preço deve ser maior que 0.", "fa-solid fa-circle-exclamation", "erro");
            return;
        }

        if (idAtual === 0) {
            if (arquivoSelecionado === null) {
                mostrar.mensagem("Escolha uma foto.", "fa-regular fa-image", "erro");
                return;
            }
        }

        btnSalvar.textContent = "Salvando...";
        btnSalvar.disabled = true;

        let urlDaFoto = urlFotoAtual;
        if (arquivoSelecionado) {
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
            foto: urlDaFoto
        };

        if (idAtual > 0) {
            jsonFinal.id = idAtual;
        }

        let sucesso = false;
        
        if (idAtual > 0) {
            console.log(JSON.stringify(jsonFinal, null, 2));
            sucesso = await updateIngrediente(jsonFinal);
        } else {
            console.log(JSON.stringify(jsonFinal, null, 2));
            sucesso = await insertIngrediente(jsonFinal);
        }

        if (sucesso) {
            mostrar.mensagem("Salvo com sucesso!", "fa-solid fa-check");
            modal.style.display = 'none';

            if (onUpdateCallback) {
                await onUpdateCallback();
            }
        } else {
            mostrar.mensagem("Erro ao salvar no banco de dados.", "fa-solid fa-database", "erro");
        }

        btnSalvar.textContent = "Salvar";
        btnSalvar.disabled = false;
    });

    janelaConteudo.append(imgPreview, inputImagem, janelaInputs, janelaBotoes);
    modal.appendChild(janelaConteudo);

    return modal;
}