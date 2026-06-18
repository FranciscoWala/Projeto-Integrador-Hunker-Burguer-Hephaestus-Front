export async function getAllIngredientes() {
    let url = "url";
    try {
        let response = await fetch(url);
        if (response.ok) {
            let respostaAPI = await response.json();
            let ingredientes = [];
            for (let item of respostaAPI) {
                ingredientes.push({
                    id: item.id,
                    nome: item.nome,
                    preco: item.preco,
                    foto: item.foto
                });
            }
            return ingredientes;
        } else {
            console.warn(response.status);
            return getJsonFalhaIngredientes();
        }
    } catch (error) {
        console.error(error);
        return getJsonFalhaIngredientes();
    }
}

function getJsonFalhaIngredientes() {
    return [
        { id: 1, nome: "Malaquita", preco: 30.00, foto: "./img/haborgue.png" },
        { id: 2, nome: "Cobalto", preco: 30.00, foto: "./img/haborgue.png" },
        { id: 3, nome: "Arsênio", preco: 30.00, foto: "./img/haborgue.png" },
        { id: 4, nome: "Bismuto", preco: 30.00, foto: "./img/haborgue.png" }
    ];
}

export async function getIngredienteById(id) {
    let url = `url/${id}`;
    try {
        let response = await fetch(url);
        if (response.ok) {
            let respostaAPI = await response.json();
            return {
                id: respostaAPI.id,
                nome: respostaAPI.nome,
                preco: respostaAPI.preco,
                foto: respostaAPI.foto
            };
        } else {
            console.warn(response.status);
            return getJsonFalhaIngredienteUnico(id);
        }
    } catch (error) {
        console.error(error);
        return getJsonFalhaIngredienteUnico(id);
    }
}

function getJsonFalhaIngredienteUnico(id) {
    return {
        id: id,
        nome: "Ingrediente Teste",
        preco: 30.00,
        foto: "./img/fotoPadrao.png"
    };
}

export async function insertIngrediente(ingrediente) {
    let url = "url";
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
    let url = `url/${ingrediente.id}`;
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
    let url = `url/${id}`;
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