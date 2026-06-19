export async function getAllCategorias() {
    let url = "http://localhost:8080/v1/hephaestus/honkerburguer/categoria/";

    try {
        let response = await fetch(url);
        if (response.ok) {
            let respostaAPI = await response.json();
            let categorias = [];

            if (respostaAPI.response && respostaAPI.response.categorias) {
                for (let item of respostaAPI.response.categorias) {
                    categorias.push({
                        id: item.id,
                        nome: item.categoria,
                        foto: item.foto
                    });
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

export async function getCategoriaById(id) {
    let url = `http://localhost:8080/v1/hephaestus/honkerburguer/categoria/${id}`;

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
        return false;
    }
}

export async function insertCategoria(categoria) {
    let url = "http://localhost:8080/v1/hephaestus/honkerburguer/categoria/";
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
        return false;
    }
}

export async function updateCategoria(categoria) {
    let url = `http://localhost:8080/v1/hephaestus/honkerburguer/categoria/${categoria.id}`;
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
    let url = `http://localhost:8080/v1/hephaestus/honkerburguer/categoria/${id}`;
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