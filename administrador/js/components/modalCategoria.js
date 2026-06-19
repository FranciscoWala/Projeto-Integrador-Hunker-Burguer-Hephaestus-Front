import { criarEl } from '../utils/dom.js';
import { insertCategoria, updateCategoria, deleteCategoria } from '../telas/apiRoutes/categoriaRoutes.js';
import { uploadParaCloudinary } from '../utils/cloudnary.js';
import { mostrar } from '../utils/interface.js';

export async function criarModalCategoria(onUpdateCallback) {
    const modal = criarEl('div', 'janela container');
    modal.id = 'modalCategoria';
    modal.style.display = 'none';

    let idAtual = 0;
    let urlFotoAtual = "";
    let arquivoSelecionado = null;

    const janelaConteudo = criarEl('div', 'janelaConteudo');

    const imgPreview = criarEl('img', 'imgJanela');
    imgPreview.id = 'imgPreviewCategoria';
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

    janelaInputs.append(grupoNome);

    const janelaBotoes = criarEl('div', 'janelaBotoes');
    const btnSalvar = criarEl('button', 'btnSalvar', 'Salvar');
    const btnExcluir = criarEl('button', 'vermelho btnExcluir', 'Excluir');
    janelaBotoes.append(btnSalvar, btnExcluir);

    modal.abrirModal = (categoria = null) => {
        if (categoria) {
            idAtual = categoria.id;
            urlFotoAtual = categoria.foto;
            arquivoSelecionado = null;

            if (categoria.nome) {
                grupoNome.querySelector('input').value = categoria.nome;
            } else {
                grupoNome.querySelector('input').value = '';
            }

            if (categoria.foto) {
                imgPreview.src = categoria.foto;
            } else {
                imgPreview.src = './img/fotoPadrao.png';
            }

            btnExcluir.textContent = "Excluir";
        } else {
            idAtual = 0;
            urlFotoAtual = "";
            arquivoSelecionado = null;

            grupoNome.querySelector('input').value = '';
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
            let confirmacao = confirm("Tem certeza que deseja excluir esta categoria?");
            if (confirmacao === true) {
                btnExcluir.textContent = "Excluindo...";
                btnExcluir.disabled = true;

                let sucesso = await deleteCategoria(idAtual);

                if (sucesso === true) {
                    mostrar.mensagem("Excluído com sucesso!", "fa-solid fa-check");
                    modal.style.display = 'none';

                    if (onUpdateCallback) {
                        await onUpdateCallback();
                    }
                } else {
                    mostrar.mensagem("Erro ao excluir a categoria.", "fa-solid fa-xmark", "erro");
                }

                btnExcluir.textContent = "Excluir";
                btnExcluir.disabled = false;
            }
        }
    });

    btnSalvar.addEventListener('click', async () => {
        const nomeDigitado = grupoNome.querySelector('input').value.trim();

        if (nomeDigitado === "") {
            mostrar.mensagem("O nome da categoria não pode ser vazio.", "fa-solid fa-triangle-exclamation", "erro");
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
            const urlCloudinary = await uploadParaCloudinary(arquivoSelecionado);
            if (urlCloudinary) {
                urlDaFoto = urlCloudinary;
            } else {
                mostrar.mensagem("Falha ao fazer upload da imagem.", "fa-solid fa-cloud-arrow-up", "erro");
            }
        }

        const jsonFinal = {
            categoria: nomeDigitado,
            foto: urlDaFoto
        };

        if (idAtual > 0) {
            jsonFinal.id = idAtual;
        }

        let sucesso = false;

        if (idAtual > 0) {
            console.log(JSON.stringify(jsonFinal, null, 2));
            sucesso = await updateCategoria(jsonFinal);
        } else {
            console.log(JSON.stringify(jsonFinal, null, 2));
            sucesso = await insertCategoria(jsonFinal);
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