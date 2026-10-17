// export async function getAllcategorias() {
//     let url = "/v1/hephaestus/honkerburguer/hamburguer";

//     try {
//         let response = await fetch(url);

//         if (response.ok) {
//             let respostaAPI = await response.json();
//             let categorias = [];
//             for (let item of respostaAPI) {
//                 categorias.push({
//                     id: item.id,
//                     nome: item.nome,
//                     foto: item.foto
//                 });
//             }
//             return categorias;
//         } else {
//             console.log(response.status)
//             return getJsonFalhaCategorias(); 
//         }
//     } catch (error) {
//         console.log(error);
//         return getJsonFalhaCategorias(); 
//     }
// }

// function getJsonFalhaCategorias() {
//     return [
//         { id: 1, nome: "Tradicionais", foto: "./img/haborgue.png" },
//         { id: 2, nome: "Artesanais", foto: "./img/haborgue.png" },
//         { id: 3, nome: "Veganos", foto: "./img/haborgue.png" }
//     ];
// }

// export async function getAllHamburguers() {
//     let url = "/v1/hephaestus/honkerburguer/hamburguer";

//     try {
//         let response = await fetch(url);

//         if (response.ok) {
//             let respostaAPI = await response.json();
//             let hamburgueres = [];
//             for (let item of respostaAPI) {
//                 hamburgueres.push({
//                     id: item.id,
//                     nome: item.nome,
//                     preco: item.preco,
//                     foto: item.foto,
//                     descricao: item.descricao,
//                     categoria: item.categoria, 
//                     ingredientes: item.ingredientes
//                 });
//             }
//             return hamburgueres;
//         } else {
//             console.log(response.status)
//             return getJsonFalhaHamburgueres(); 
//         }
//     } catch (error) {
//         console.log(error);
//         return getJsonFalhaHamburgueres(); 
//     }
// }

// function getJsonFalhaHamburgueres() {
//     return [
//         {
//             id: 1,
//             nome: "nome",
//             preco: 28.50,
//             foto: "./img/haborgue.png",
//             descricao: "descrição",
//             categoria: [{ id: 1, categoria: "Artesanais" }],
//             ingredientes: [
//                 { id: 1, foto: "./img/haborgue.png", preco: 3.50 },
//                 { id: 2, foto: "./img/haborgue.png", preco: 4.00 }
//             ]
//         },
//         {
//             id: 2,
//             nome: "nome",
//             preco: 22.00,
//             foto: "./img/haborgue.png",
//             descricao: "descricao",
//             categoria: [{ id: 2, categoria: "Tradicionais" }],
//             ingredientes: [
//                 { id: 2, foto: "./img/haborgue.png", preco: 4.00 }
//             ]
//         }
//     ];
// }

// export async function getHamburguerById(id) {
//     let url = `/v1/hephaestus/honkerburguer/hamburguer/${id}`;

//     try {
//         let response = await fetch(url);

//         if (response.ok) {
//             let respostaAPI = await response.json();
//             let hamburguer = {
//                 id: respostaAPI.id,
//                 nome: respostaAPI.nome,
//                 preco: respostaAPI.preco,
//                 foto: respostaAPI.foto,
//                 descricao: respostaAPI.descricao,
//                 categoria: respostaAPI.categoria, 
//                 ingredientes: respostaAPI.ingredientes
//             };
//             return hamburguer;
//         } else {
//             console.log(response.status)
//             return getJsonFalhaHamburguerUnico(id); 
//         }
//     } catch (error) {
//         console.log(error)
//         return getJsonFalhaHamburguerUnico(id); 
//     }
// }

// function getJsonFalhaHamburguerUnico(id) {
//     return {
//         id: id || 99,
//         nome: "Nome",
//         preco: 35.90,
//         foto: "./img/haborgue.png",
//         descricao: "descrição",
//         categoria: [{ id: 1, categoria: "Artesanais" }],
//         ingredientes: [
//             { id: 1, foto: "./img/haborgue.png", preco: 3.50 },
//             { id: 3, foto: "./img/haborgue.png", preco: 2.00 }
//         ]
//     };
// }

// export async function insertHamburguer(dadosHamburguer) {
//     let url = "/v1/hephaestus/honkerburguer/hamburguer";

//     try {
//         let response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(dadosHamburguer)
//         });

//         if (response.ok) {
//             return await response.json();
//         } else {
//             console.warn(response.status);
//             return false;
//         }
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// }

// export async function getAllIngredientes() {
//     let url = "/v1/hephaestus/honkerburguer/hamburguer";

//     try {
//         let response = await fetch(url);

//         if (response.ok) {
//             let respostaAPI = await response.json();
            
//             let ingredientes = [];
//             for (let item of respostaAPI) {
//                 ingredientes.push({
//                     id: item.id,
//                     nome: item.nome,
//                     preco: item.preco,
//                     foto: item.foto
//                 });
//             }
//             return ingredientes;
//         } else {
//             console.warn(response.status);
//             return getJsonFalhaIngredientes();
//         }
//     } catch (error) {
//         console.error(error);
//         return getJsonFalhaIngredientes();
//     }
// }

// function getJsonFalhaIngredientes() {
//     return [
//         { id: 1, nome: 'Tomate', preco: 2.50, foto: './img/haborgue.png' },
//         { id: 2, nome: 'Alface', preco: 1.50, foto: './img/haborgue.png' },
//         { id: 3, nome: 'Bacon', preco: 5.00, foto: './img/haborgue.png' },
//         { id: 4, nome: 'Queijo', preco: 4.00, foto: './img/haborgue.png' },
//         { id: 5, nome: 'Cebola', preco: 2.00, foto: './img/haborgue.png' },
//         { id: 6, nome: 'Picles', preco: 3.00, foto: './img/haborgue.png' }
//     ];
// }

// export async function updateHamburguer(hamburguer) {
//     let url = `/v1/hephaestus/honkerburguer/hamburguer/${hamburguer.id}`;

//     try {
//         let response = await fetch(url, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(hamburguer)
//         });

//         if (response.ok) {
//             return await response.json(); 
//         } else {
//             console.warn(response.status);
//             return false;
//         }
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// }

// export async function deleteHamburguer(id) {
//     let url = `/v1/hephaestus/honkerburguer/hamburguer/${id}`;

//     try {
//         let response = await fetch(url, {
//             method: 'DELETE'
//         });

//         if (response.ok) {
//             return true;
//         } else {
//             console.warn(response.status);
//             return false;
//         }
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// }

// ATENÇÃO: Substitua '8080' pela porta real do seu back-end!
const BASE_URL = "http://localhost:8080";

export async function getAllcategorias() {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/hamburguer`;

    try {
        let response = await fetch(url);

        if (response.ok) {
            let respostaAPI = await response.json();
            let categorias = [];
            for (let item of respostaAPI) {
                categorias.push({
                    id: item.id,
                    nome: categoria.nome,
                    foto: item.foto
                });
            }
            return categorias;
        } else {
            console.log(response.status);
            return getJsonFalhaCategorias(); 
        }
    } catch (error) {
        return false;
    }
}

export async function getAllHamburguers() {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/hamburguer`;

    try {
        let response = await fetch(url);

        if (response.ok) {
            let respostaAPI = await response.json();
            let hamburgueres = [];

            if (respostaAPI.response) {
                if (respostaAPI.response.hamburguer) {
                    for (let item of respostaAPI.response.hamburguer) {
                        hamburgueres.push({
                            id: item.id,
                            nome: item.nome,
                            preco: parseFloat(item.preco),
                            foto: item.foto,
                            descricao: item.descricao,
                            categoria: item.categoria,
                            ingredientes: item.ingredientes
                        });
                    }
                }
            }
            return hamburgueres;
        } else {
            console.log(response.status);
            return getJsonFalhaHamburgueres(); 
        }
    } catch (error) {
        return false;
    }
}

export async function getHamburguerById(id) {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/hamburguer/${id}`;

    try {
        let response = await fetch(url);

        if (response.ok) {
            let respostaAPI = await response.json();
            console.log(respostaAPI);
            
            if (respostaAPI.response) {
                if (respostaAPI.response.hamburguer) {
                    if (respostaAPI.response.hamburguer.length > 0) {
                        let item = respostaAPI.response.hamburguer[0];
                        
                        let objRetorno = {
                            id: item.id,
                            nome: item.nome,
                            preco: item.preco,
                            foto: item.foto,
                            descricao: item.descricao,
                            categorias: [],
                            ingredientes: []
                        };

                        if (Array.isArray(item.categorias)) {
                            objRetorno.categorias = item.categorias;
                        } else if (Array.isArray(item.categoria)) {
                            objRetorno.categorias = item.categoria;
                        }

                        if (Array.isArray(item.ingredientes)) {
                            objRetorno.ingredientes = item.ingredientes;
                        }

                        return objRetorno;
                    }
                }
            }
            return false;
        } else {
            console.log(response.status);
            return getJsonFalhaHamburguerUnico(id); 
        }
    } catch (error) {
        console.log(error);
        return getJsonFalhaHamburguerUnico(id); 
    }
}

export async function insertHamburguer(dadosHamburguer) {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/hamburguer`;

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosHamburguer)
        });

        if (response.ok) {
            return await response.json();
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getAllIngredientes() {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/hamburguer`;

    try {
        let response = await fetch(url);
        if (response.ok) {
            let respostaAPI = await response.json();
            console.log(respostaAPI);
            let ingredientes = [];

            if (respostaAPI.response) {
                if (respostaAPI.response.ingrediente) {
                    for (let item of respostaAPI.response.ingrediente) {
                        ingredientes.push({
                            id: item.id,
                            nome: item.nome,
                            preco: parseFloat(item.preco),
                            foto: item.foto
                        });
                    }
                }
            }
            return ingredientes;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return getJsonFalhaIngredientes();
    }
}

export async function updateHamburguer(hamburguer) {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/hamburguer/${hamburguer.id}`;

    try {
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hamburguer)
        });

        if (response.ok) {
            return await response.json();
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function deleteHamburguer(id) {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/hamburguer/${id}`;

    try {
        let response = await fetch(url, {
            method: 'DELETE'
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}