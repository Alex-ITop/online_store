const db = require('../db');
class OrderedArticleController {
    async createOrderedArticle(req, res) {
        const {count, order_id, article_id} = req.body;
        const orderedArticle = await db.query('INSERT INTO "ordered_article" ("count", "order_id", "article_id") VALUES ($1, $2, $3) RETURNING *',
        [count, order_id, article_id]);
        res.json(orderedArticle.rows[0]);
    };
    async getOrderedArticles(req, res) {
        const orderedArticles = await db.query('SELECT * FROM "ordered_article"');
        res.json(orderedArticles.rows);
    };
    async getOneOrderedArticle(req, res) {
        const id = req.params.id;
        const orderedArticle = await db.query('SELECT * FROM "ordered_article" WHERE id = $1',
        [id]);
        res.json(orderedArticle.rows[0]);
    };
    async updateOrderedArticle(req, res) {
        const id = req.params.id;
        const {count, order_id, article_id} = req.body;
        const orderedArticle = await db.query('UPDATE "ordered_article" set "count" = $1, "order_id" = $2, "article_id" = $3 WHERE "id" = $4 RETURNING *',
        [count, order_id, article_id, id]);
        res.json(orderedArticle.rows[0]);
    };
    async deleteOrderedArticle(req, res) {
        const id = req.params.id;
        const orderedArticle = await db.query('DELETE FROM "ordered_article" WHERE "id" = $1',
        [id]);
        res.json(orderedArticle.rows[0]);
    };
}

module.exports = new OrderedArticleController();