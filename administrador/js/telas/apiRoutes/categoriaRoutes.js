
// const BASE_URL = "http://localhost:8080";

// export async function getAllCategorias() {
//     let url = `${BASE_URL}/v1/hephaestus/honkerburguer/categoria/`;

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
//             console.warn(response.status);
//             return getJsonFalhaCategorias();
//         }
//     } catch (error) {
//         console.error(error);
//         return getJsonFalhaCategorias();
//     }
// }

// function getJsonFalhaCategorias() {
//     return [
//         { id: 1, nome: "Hambúrguer", foto: "./img/haborgue.png" },
//         { id: 2, nome: "Bebida", foto: "./img/haborgue.png" },
//         { id: 3, nome: "Sobremesa", foto: "./img/haborgue.png" }
//     ];
// }

// export async function getCategoriaById(id) {
//     let url = `${BASE_URL}/v1/hephaestus/honkerburguer/categoria/${id}`;

//     try {
//         let response = await fetch(url);
//         if (response.ok) {
//             let respostaAPI = await response.json();
//             return {
//                 id: respostaAPI.id,
//                 nome: respostaAPI.nome,
//                 foto: respostaAPI.foto
//             };
//         } else {
//             console.warn(response.status);
//             return getJsonFalhaCategoriaUnica(id);
//         }
//     } catch (error) {
//         console.error(error);
//         return getJsonFalhaCategoriaUnica(id);
//     }
// }

// function getJsonFalhaCategoriaUnica(id) {
//     return {
//         id: id,
//         nome: "Categoria Teste",
//         foto: "./img/haborgue.png"
//     };
// }

// export async function insertCategoria(categoria) {
//     let url = `${BASE_URL}/v1/hephaestus/honkerburguer/categoria/`;
//     try {
//         let response = await fetch(url, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(categoria)
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

// export async function updateCategoria(categoria) {
//     let url = `${BASE_URL}/v1/hephaestus/honkerburguer/categoria/${categoria.id}`;
//     try {
//         let response = await fetch(url, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(categoria)
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

// export async function deleteCategoria(id) {
//     let url = `${BASE_URL}/v1/hephaestus/honkerburguer/categoria/${id}`;
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

const BASE_URL = "http://localhost:8080";

export async function getAllCategorias() {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/categoria/`;

    try {
        let response = await fetch(url);
        if (response.ok) {
            let respostaAPI = await response.json();
            let categorias = [];
            let listaDeCategorias = respostaAPI.response.categorias;
            for (let item of listaDeCategorias) {
                categorias.push({
                    id: item.id,
                    nome: item.categoria, // Corrigido aqui
                    foto: item.foto  // Corrigido aqui
                });
            }
            return categorias;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return getJsonFalhaCategorias();
    }
}

export async function getCategoriaById(id) {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/categoria/${id}`;

    try {
        let response = await fetch(url);
        if (response.ok) {
            let respostaAPI = await response.json();

            if (respostaAPI.response && respostaAPI.response.categoria && respostaAPI.response.categoria.length > 0) {
                let item = respostaAPI.response.categoria[0];
                return {
                    id: item.id,
                    nome: item.categoria,
                    foto: item.foto
                };
            }
            return false;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return getJsonFalhaCategoriaUnica(id);
    }
}

export async function insertCategoria(categoria) {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/categoria/`;
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoria)
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

export async function updateCategoria(categoria) {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/categoria/${categoria.id}`;
    try {
        let response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoria)
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

export async function deleteCategoria(id) {
    let url = `${BASE_URL}/v1/hephaestus/honkerburguer/categoria/${id}`;
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