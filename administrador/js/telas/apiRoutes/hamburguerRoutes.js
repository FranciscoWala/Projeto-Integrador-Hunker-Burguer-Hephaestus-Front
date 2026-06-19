export async function getAllcategorias() {
    let url = "http://localhost:8080/v1/hephaestus/honkerburguer/categoria";

    try {
        let response = await fetch(url);

        if (response.ok) {
            let respostaAPI = await response.json();
            let categorias = [];

            if (respostaAPI.response) {
                if (respostaAPI.response.categorias) {
                    for (let item of respostaAPI.response.categorias) {
                        categorias.push({
                            id: item.id,
                            nome: item.categoria,
                            foto: item.foto
                        });
                    }
                }
            }
            return categorias;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export async function getAllHamburguers() {
    let url = "http://localhost:8080/v1/hephaestus/honkerburguer/hamburguer";

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
            return false;
        }
    } catch (error) {
        return false;
    }
}

export async function getHamburguerById(id) {
    let url = `http://localhost:8080/v1/hephaestus/honkerburguer/hamburguer/${id}`;

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
            return false;
        }
    } catch (error) {
        return false;
    }
}

export async function insertHamburguer(dadosHamburguer) {
    let url = "http://localhost:8080/v1/hephaestus/honkerburguer/hamburguer";

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
        return false;
    }
}

export async function getAllIngredientes() {
    let url = "http://localhost:8080/v1/hephaestus/honkerburguer/ingrediente";
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
        return false;
    }
}

export async function updateHamburguer(hamburguer) {
    let url = `http://localhost:8080/v1/hephaestus/honkerburguer/hamburguer/${hamburguer.id}`;

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
        return false;
    }
}

export async function deleteHamburguer(id) {
    let url = `http://localhost:8080/v1/hephaestus/honkerburguer/hamburguer/${id}`;

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