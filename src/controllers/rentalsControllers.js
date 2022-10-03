// import connect from '../database.js';
// import dayjs from "dayjs";

// export async function ListaRentals (req, res) {
//     const { customerId } = req.query;

//     try {
//         if (customerId) {
//             const listarCliente = await connect.query(
//                 'SELECT id , name FROM customers WHERE id = $1;', [customerId]
//             );
//             const id = listarCliente.rows.map(item => item.id);
//             const listarRentals = await connect.query(
//                 'SELECT * FROM rentals WHERE id = $1;', [id[0]]
//             );
//             const game = listarRentals.rows.map(item => item.gameId)
//             const listarGame = await connect.query(
//                 'SELECT id, name, "categoryId", "categoryName" FROM games WHERE id = 1$;', [game[0]]
//             );
    
//             res.status(200).send({
//                 ...listarRentals,
//                 customer: {
//                     ...listarCliente
//                 },
//                 game: {
//                     ...listarGame
//                 }
//             });
//         }

//         const listarRentals = await connect.query(`
//             SELECT rentals.*, customers.id, customers.name
//         `);

//     } catch (error) {
//         res.sendStatus(500);
//     }
// }

// export async function InserirRentals (req, res) {
//     const { customerId, gameId, daysRented } = req.body;

//     const dia = dayjs().format(YYYY-MM-DD);
    
//     try {
//         const preco = await connect.query(`
//             SELECT * FROM games WHERE id = $1;
//         `, [gameId]);
//         const listapreco = preco.rows.map(item => item.pricePerDay);
//         if (!listapreco[0]) {
//             return res.sendStatus(400);
//         }

//         const cliente = await connect.query(`
//             SELECT * FROM customers WHERE id = $1;
//         `, [customerId]);
//         const listaCliente = cliente.rows.map(item => item.id);
//         if (!listaCliente[0]) {
//             return res.sendStatus(400);
//         }

//         if (Number(daysRented) < 1) {
//             return res.sendStatus(400);
//         }
//         const price = (Number(daysRented) * Number(listapreco[0]));
 
//         await connect.query(
//             `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFree") VALUES ($1, $2, $3, $4, $5, $6, $7);
//             `, [customerId, gameId, dia, daysRented, null, Number(price), null]
//         );

//         res.sendStatus(201);

//     } catch (error) {
//         res.sendStatus(500);
//     }
// }

// export async function RetornoRentals (req, res) {
//     const { id } = req.params;

//     const dia = dayjs().format(YYYY-MM-DD);

//     try {
//         const listarRental = await connect.query(
//             'SELECT * FROM rentals WHERE id = $1;', [id]
//         );
//         const diaDoAluguel = listarRental.rows.map(item => item.rentDate);
//         const diasAlugados = listarRental.rows.map(item => item.daysRented);
//         const diasAlugadosSemAtraso =  dayjs(diaDoAluguel[0]).add(diasAlugados[0], 'day').format(YYYY-MM-DD);
//         (dayjs(diaDoAluguel[0]).isBefore(dayjs(diasAlugadosSemAtraso)))
//         (dayjs(diaDoAluguel[0]).diff(dayjs()))
      
        
        
//     } catch (error) {
//         res.sendStatus(500);
//     }
// }