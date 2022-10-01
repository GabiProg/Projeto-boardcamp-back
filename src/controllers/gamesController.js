import connection from "../database.js";

export async function ListarGames (req, res) {
    //const { name } = req.query;
    // WHERE games.name ILIKE 'in%'
    try {
        const games = await connection.query(`
            SELECT games.*, categories.name as "categoryName", games.name FROM games JOIN categories ON games."categoryId"=categories.id;
        `);
        res.send(games.rows);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function InserirGames (req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    if (!name) {
        return res.status(400).send('Campo name não pode estar vazio.');
    }

    if (Number(stockTotal) <= 0 || Number(pricePerDay) <= 0) {
        return res.status(400).send('O campo stockTotal ou pricePerDay deve ser maior que 0.');
    }

    try {
        const categoriaExistente = await connection.query(
            `SELECT * FROM categories WHERE id = $1;`, [categoryId]
        );
        const listarCategoria = categoriaExistente.rows.map(item => item.id); 
        
        if (listarCategoria[0] !== Number(categoryId)) {
            return res.status(400).send('Categoria não existe.');
        }

        const nomeExistente = await connection.query(
            `SELECT * FROM games WHERE name = $1;`, [name]
        );
        const listarNome = nomeExistente.rows.map(item => item.name); 

        if (listarNome[0] === name) {
            return res.status(409).send('Nome já existente.');
        }

        console.log(name, image, stockTotal, categoryId, pricePerDay);
        await connection.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);
        `, [name, image, Number(stockTotal), categoryId, Number(pricePerDay)]
        );
        
        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}