'use strict';

import './login.js';
import { telas } from './menuManager.js';
import { telaHamburguer } from './telas/hamburguer.js';
import { telaCategorias } from './telas/categoria.js';
import { telaIngredientes } from './telas/ingredientes.js';

window.addEventListener("load", () => {
    const logoSvg = document.getElementById("logoSvg");
    const logoContainer = document.getElementById("logoContainer");
    const elementosLogin = document.getElementById("elementosLogin");

    setTimeout(() => {
        logoSvg.src = "./img/animated.svg?v=" + new Date().getTime();
        logoSvg.style.opacity = "1";

        setTimeout(() => {
            logoContainer.classList.add("substituir");
            logoContainer.classList.add("encolher");
            elementosLogin.classList.add("mostrar");
        }, 2920);

    }, 100);

    telas.adicionar([
        {
            nome: "Hamburguer",
            icone: "fa-solid fa-burger",
            criar: telaHamburguer
        },
        {
            nome: "Categoria",
            icone: "fa-solid fa-layer-group",
            criar: telaCategorias
        },
        {
            nome: "Ingredientes",
            icone: "fa-solid fa-seedling",
            criar: telaIngredientes
        }
    ]);
});