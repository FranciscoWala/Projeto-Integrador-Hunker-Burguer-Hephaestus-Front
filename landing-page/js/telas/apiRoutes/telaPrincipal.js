export async function getAllHamburguers() {
    let url = "http://localhost:8080/v1/hephaestus/honkerburguer/hamburguer";

    try {
        let response = await fetch(url);

        if (response.ok) {
            let respostaAPI = await response.json();
            let hamburgueres = [];
            for (let item of respostaAPI.response.hamburguer) {
                hamburgueres.push({
                    id: item.id,
                    nome: item.nome,
                    preco: item.preco,
                    foto: item.foto,
                    descricao: item.descricao,
                    categoria: item.categoria || [],
                    ingredientes: item.ingredientes || []
                });
            }

            return hamburgueres;
        } else {
            console.log(response.status);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getHamburguerById(id) {
    let url = `http://localhost:8080/v1/hephaestus/honkerburguer/hamburguer/${id}`;

    try {
        let response = await fetch(url);

        if (response.ok) {
            let respostaAPI = await response.json();
            let item = respostaAPI.response.hamburguer[0];
            return {
                id: item.id,
                nome: item.nome,
                preco: item.preco,
                foto: item.foto,
                descricao: item.descricao,
                categoria: item.categoria || [],
                ingredientes: item.ingredientes || []
            }

            return false;
        } else {
            console.log(response.status);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getAllCategorias() {
    let url = "http://localhost:8080/v1/hephaestus/honkerburguer/categoria/";

    try {
        let response = await fetch(url);

        if (response.ok) {
            let respostaAPI = await response.json();
            let categorias = [];

            for (let item of respostaAPI.response.categorias) {
                categorias.push({
                    id: item.id,
                    categoria: item.categoria,
                    foto: item.foto
                });
            }
            return categorias;
        } else {
            console.log(response.status);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getHamburguersByCategoria(idCategoria) {
    let url = `http://localhost:8080/v1/hephaestus/honkerburguer/categoria/${idCategoria}/hamburgueres`;

    try {
        let response = await fetch(url);

        if (response.ok) {
            let respostaAPI = await response.json();
            let hamburgueres = [];

            for (let item of respostaAPI.response.hamburgueres) {
                hamburgueres.push({
                    id: item.id,
                    nome: item.nome,
                    preco: item.preco,
                    foto: item.foto,
                    descricao: item.descricao,
                    ingredientes: item.ingredientes || []
                });
            }
            return hamburgueres;
        } else {
            console.log(response.status);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}