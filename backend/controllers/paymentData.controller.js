const db = require('../db');
class PaymentDataController {
    async createPaymentData(req, res) {
        const {carduser_name, card_number, validity_period, user_id} = req.body;
        const paymentData = await db.query('INSERT INTO "payment_data" ("carduser_name", "card_number", "validity_period", "user_id") VALUES ($1, $2, $3, $4) RETURNING *',
        [carduser_name, card_number, validity_period, user_id]);
        res.json(paymentData.rows[0]);
    };
    async getPaymentDatas(req, res) {
        const paymentDatas = await db.query('SELECT * FROM "payment_data"');
        res.json(paymentDatas.rows);
    };
    async getOnePaymentData(req, res) {
        const id = req.params.id;
        const paymentData = await db.query('SELECT * FROM "payment_data" WHERE id = $1',
        [id]);
        res.json(paymentData.rows[0]);
    };
    async updatePaymentData(req, res) {
        const id = req.params.id;
        const {carduser_name, card_number, validity_period, user_id} = req.body;
        const paymentData = await db.query('UPDATE "payment_data" set "carduser_name" = $1, "card_number" = $2, "validity_period" = $3, "user_id" = $4 WHERE "id" = $5 RETURNING *',
        [carduser_name, card_number, validity_period, user_id, id]);
        res.json(paymentData.rows[0]);
    };
    async deletePaymentData(req, res) {
        const id = req.params.id;
        const paymentData = await db.query('DELETE FROM "payment_data" WHERE "id" = $1',
        [id]);
        res.json(paymentData.rows[0]);
    };
}

module.exports = new PaymentDataController();