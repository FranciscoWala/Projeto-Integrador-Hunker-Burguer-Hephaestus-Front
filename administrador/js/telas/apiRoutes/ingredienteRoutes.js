export async function getAllIngredientes() {
    let url = "http://localhost:8080/v1/hephaestus/honkerburguer/ingrediente";
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
        console.error(error);
        return false;
    }
}

export async function getIngredienteById(id) {
    let url = `http://localhost:8080/v1/hephaestus/honkerburguer/ingrediente/${id}`;
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
        return false;
    }
}

export async function insertIngrediente(ingrediente) {
    let url = "http://localhost:8080/v1/hephaestus/honkerburguer/ingrediente";
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
    let url = `http://localhost:8080/v1/hephaestus/honkerburguer/ingrediente/${ingrediente.id}`;
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
    let url = `http://localhost:8080/v1/hephaestus/honkerburguer/ingrediente/${id}`;
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