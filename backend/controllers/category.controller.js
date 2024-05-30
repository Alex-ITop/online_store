const db = require('../db');
class CategoryController {
    async createCategory(req, res) {
        const {name} = req.body;
        const category = await db.query('INSERT INTO "category" ("name") VALUES ($1) RETURNING *',
        [name]);
        res.json(category.rows[0]);
    };
    async getCategories(req, res) {
        const categories = await db.query('SELECT * FROM "category"');
        res.json(categories.rows);
    };
    async getOneCategory(req, res) {
        const id = req.params.id;
        const category = await db.query('SELECT * FROM "category" WHERE id = $1',
        [id]);
        res.json(category.rows[0]);
    };
    async updateCategory(req, res) {
        const id = req.params.id;
        const {name} = req.body;
        const category = await db.query('UPDATE "category" set "name" = $1, WHERE "id" = $2 RETURNING *',
        [name, id]);
        res.json(category.rows[0]);
    };
    async deleteCategory(req, res) {
        const id = req.params.id;
        const category = await db.query('DELETE FROM "category" WHERE "id" = $1',
        [id]);
        res.json(category.rows[0]);
    };
}

module.exports = new CategoryController();