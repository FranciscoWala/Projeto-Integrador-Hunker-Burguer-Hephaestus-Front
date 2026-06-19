export const telaManager = {
    container: null,

    inicializar(containerId) {
        this.container = document.getElementById(containerId);
    },

    renderizar(construtorDeTela) {
        construtorDeTela(this.container);
    }
};