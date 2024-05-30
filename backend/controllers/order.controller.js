const db = require('../db');
class OrderController {
    async createOrder(req, res) {
        const {user_id} = req.body;
        const order = await db.query('INSERT INTO "order" ("date", "user_id") VALUES (CURRENT_DATE, $1) RETURNING *',
        [user_id]);
        res.json(order.rows[0]);
    };
    async getOrders(req, res) {
        const orders = await db.query('SELECT * FROM "order"');
        res.json(orders.rows);
    };
    async getOneOrder(req, res) {
        const id = req.params.id;
        const order = await db.query('SELECT * FROM "order" WHERE id = $1',
        [id]);
        res.json(order.rows[0]);
    };
    async updateOrder(req, res) {
        const id = req.params.id;
        const {user_id} = req.body;
        const order = await db.query('UPDATE "order" set "user_id" = $1, WHERE "id" = $2 RETURNING *',
        [user_id, id]); //что с датой делать?
        res.json(order.rows[0]);
    };
    async deleteOrder(req, res) {
        const id = req.params.id;
        const order = await db.query('DELETE FROM "order" WHERE "id" = $1',
        [id]);
        res.json(order.rows[0]);
    };
}

module.exports = new OrderController();