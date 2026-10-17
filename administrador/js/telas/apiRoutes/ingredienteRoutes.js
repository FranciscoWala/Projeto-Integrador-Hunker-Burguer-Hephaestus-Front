// export async function getAllIngredientes() {
//     let url = "/v1/hephaestus/honkerburguer/ingrediente";
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
//         { id: 1, nome: "Malaquita", preco: 30.00, foto: "./img/haborgue.png" },
//         { id: 2, nome: "Cobalto", preco: 30.00, foto: "./img/haborgue.png" },
//         { id: 3, nome: "Arsênio", preco: 30.00, foto: "./img/haborgue.png" },
//         { id: 4, nome: "Bismuto", preco: 30.00, foto: "./img/haborgue.png" }
//     ];
// }

// export async function getIngredienteById(id) {
//     let url = `/v1/hephaestus/honkerburguer/ingrediente/${id}`;
//     try {
//         let response = await fetch(url);
//         if (response.ok) {
//             let respostaAPI = await response.json();
//             return {
//                 id: respostaAPI.id,
//                 nome: respostaAPI.nome,
//                 preco: respostaAPI.preco,
//                 foto: respostaAPI.foto
//             };
//         } else {
//             console.warn(response.status);
//             return getJsonFalhaIngredienteUnico(id);
//         }
//     } catch (error) {
//         console.error(error);
//         return getJsonFalhaIngredienteUnico(id);
//     }
// }

// function getJsonFalhaIngredienteUnico(id) {
//     return {
//         id: id,
//         nome: "Ingrediente Teste",
//         preco: 30.00,
//         foto: "./img/fotoPadrao.png"
//     };
// }

// export async function insertIngrediente(ingrediente) {
//     let url = "/v1/hephaestus/honkerburguer/ingrediente";
//     try {
//         let response = await fetch(url, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(ingrediente)
//         });
//         if (response.ok) {
//             return true;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         return false;
//     }
// }

// export async function updateIngrediente(ingrediente) {
//     let url = `/v1/hephaestus/honkerburguer/ingrediente/${ingrediente.id}`;
//     try {
//         let response = await fetch(url, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(ingrediente)
//         });
//         if (response.ok) {
//             return true;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         return false;
//     }
// }

// export async function deleteIngrediente(id) {
//     let url = `/v1/hephaestus/honkerburguer/ingrediente/${id}`;
//     try {
//         let response = await fetch(url, {
//             method: 'DELETE'
//         });
//         if (response.ok) {
//             return true;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         return false;
//     }
// }

// ATENÇÃO: Substitua '8080' pela porta real do seu back-end!
const BASE_URL = "http://localhost:8080";

export async function getAllIngredientes() {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/ingrediente`;
    try {
        let response = await fetch(url);
        if (response.ok) {
            let respostaAPI = await response.json();
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
            console.warn(response.status);
            return false;
        }
    } catch (error) {
        console.log(error);
        return getJsonFalhaIngredientes();
    }
}

export async function getIngredienteById(id) {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/ingrediente/${id}`;
    try {
        let response = await fetch(url);
        if (response.ok) {
            let respostaAPI = await response.json();
            if (respostaAPI.response) {
                if (respostaAPI.response.ingrediente) {
                    if (respostaAPI.response.ingrediente.length > 0) {
                        let item = respostaAPI.response.ingrediente[0];
                        return {
                            id: item.id,
                            nome: item.nome,
                            preco: item.preco,
                            foto: item.foto
                        };
                    }
                }
            }
            return false;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return getJsonFalhaIngredienteUnico(id);
    }
}

export async function insertIngrediente(ingrediente) {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/ingrediente`;
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ingrediente)
        });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export async function updateIngrediente(ingrediente) {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/ingrediente/${ingrediente.id}`;
    try {
        let response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ingrediente)
        });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export async function deleteIngrediente(id) {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/ingrediente/${id}`;
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
        return false;
    }
}