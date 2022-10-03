import connect from '../database.js';
import joi from 'joi';

export async function ListaCustomers (req, res) {
    const { cpf } = req.query;
    
    try {
        if (cpf) {
            const listaClientes = await connect.query(
                `SELECT * FROM customers WHERE cpf  ILIKE '${cpf}%';`
            );
            res.send(listaClientes.rows);
            return;
        }

        const listaClientes = await connect.query(
            'SELECT * FROM customers;'
        );
        res.send(listaClientes.rows);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function ListaCustomersPorId (req, res) {
    const { id } = req.params;

    try {
        const idExistente = await connect.query(
            'SELECT * FROM customers WHERE id = $1;', [id]
        );
        const listarId = idExistente.rows.map(item => item.id);
        if (!listarId[0]) {
            return res.status(404).send('Cliente não existe.');
        }

        res.send(idExistente.rows);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function InserirDadosDoCliente (req, res) {
    const { name, phone, cpf, birthday } = req.body;

    const clienteSchema = joi.object({
        name: joi.string().required(),
        phone: joi.string().required().min(10).max(11),
        cpf: joi.string().required().min(11).max(11),
        birthday: joi.string().isoDate().required()
    });

    const validation = clienteSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const erros = validation.error.details.map(detail => detail.message);
        res.status(400).send(erros);
        return;
    }

    try {
        const cpfExistente = await connect.query(
            'SELECT * FROM customers WHERE cpf = $1;', [cpf]
        );
        const listarCpf = cpfExistente.rows.map(item => item.cpf);
        if (listarCpf[0]) {
            return res.sendStatus(409);
        }

        await connect.query(`
            INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);
            `, [name, phone, cpf, birthday]
        );

        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function AtualizarCustomers (req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const {id} = req.params;

    const clienteSchema = joi.object({
        name: joi.string().required(),
        phone: joi.string().required().min(10).max(11),
        cpf: joi.string().required().min(11).max(11),
        birthday: joi.string().isoDate().required()
    });

    const validation = clienteSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const erros = validation.error.details.map(detail => detail.message);
        res.status(400).send(erros);
        return;
    }

    try {
        const cpfExistente = await connect.query(
            'SELECT * FROM customers WHERE cpf = $1;', [cpf]
        );
        const listarCpf = cpfExistente.rows.map(item => item.cpf);
        if (listarCpf.length > 1) {
            return res.status(409).send('CPF inserido não existe.');
        }

        const listarId = await connect.query(
            'SELECT * FROM customers WHERE id = $1;', [id]
        );
        const ids = listarId.rows.map(item => item.id);

        await connect.query(`
            UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;
            `, [name, phone, cpf, birthday, ids[0]]
        );

        res.sendStatus(200);
        
    } catch (error) {
        res.sendStatus(500);
    }
}