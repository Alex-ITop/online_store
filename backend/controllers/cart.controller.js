const db = require('../db');
class CartController {
    async createCart(req, res) {
        const {count, user_id, article_id} = req.body;
        const cart = await db.query('INSERT INTO "cart" ("count", "user_id", "article_id") VALUES ($1, $2, $3) RETURNING *',
        [count, user_id, article_id]);
        res.json(cart.rows[0]);
    };
    async getCarts(req, res) {
        const carts = await db.query('SELECT * FROM "cart"');
        res.json(carts.rows);
    };
    async getOneCart(req, res) {
        const id = req.params.id;
        const cart = await db.query('SELECT * FROM "cart" WHERE id = $1',
        [id]);
        res.json(cart.rows[0]);
    };
    async updateCart(req, res) {
        const id = req.params.id;
        const {count, user_id, article_id} = req.body;
        const cart = await db.query('UPDATE "article" set "count" = $1, "user_id" = $2, "article_id" = $3 WHERE "id" = $4 RETURNING *',
        [count, user_id, article_id, id]);
        res.json(cart.rows[0]);
    };
    async deleteCart(req, res) {
        const id = req.params.id;
        const cart= await db.query('DELETE FROM "cart" WHERE "id" = $1',
        [id]);
        res.json(cart.rows[0]);
    };
}

module.exports = new CartController();