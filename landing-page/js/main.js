import { telaManager } from './telas/telasManager.js';
import { criarTelaPrincipal } from './telas/principal.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('conteudo');
    telaManager.inicializar('conteudo');
    telaManager.renderizar(() => criarTelaPrincipal(container));
});