import connection from "../database.js";

export async function ListarCategorias (req, res) {
    try {
        const categorias = await connection.query('SELECT * FROM categories;');
        res.send(categorias.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function InserirCategorias (req, res) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send('Campo name não pode estar vazio.');;
    }

    try {
        const nomeExistente = await connection.query('SELECT * FROM categories WHERE name = $1;', [name]);
        const listarNome = nomeExistente.rows.map(item => item.name); 
        if (listarNome[0] === name) {
            return res.status(409).send('Categoria já existente.');
        }

        await connection.query(`INSERT INTO categories (name) VALUES ($1);`, [name]);
        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}