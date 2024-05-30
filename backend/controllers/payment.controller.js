const db = require('../db');
class PaymentController {
    async createPayment(req, res) {
        const {summ, order_id, payment__id} = req.body;
        const payment = await db.query('INSERT INTO "payment" ("summ", "date", "order_id", "payment__id") VALUES ($1, CURRENT_DATE, $2, $3) RETURNING *',
        [summ, order_id, payment__id]);
        res.json(payment.rows[0]);
    };
    async getPayments(req, res) {
        const payments = await db.query('SELECT * FROM "payment"');
        res.json(payments.rows);
    };
    async getOnePayment(req, res) {
        const id = req.params.id;
        const payment = await db.query('SELECT * FROM "payment" WHERE id = $1',
        [id]);
        res.json(payment.rows[0]);
    };
    async updatePayment(req, res) {
        const id = req.params.id;
        const {summ, order_id, payment__id} = req.body;
        const payment = await db.query('UPDATE "payment" set "summ" = $1, "order_id" = $2, "payment__id" = $3 WHERE "id" = $4 RETURNING *',
        [summ, order_id, payment__id, id]);
        res.json(payment.rows[0]);
    };
    async deletePayment(req, res) {
        const id = req.params.id;
        const payment = await db.query('DELETE FROM "payment" WHERE "id" = $1',
        [id]);
        res.json(payment.rows[0]);
    };
}

module.exports = new PaymentController();