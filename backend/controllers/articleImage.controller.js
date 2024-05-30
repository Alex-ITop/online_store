const db = require('../db');
class ArticleImageController {
    // async createImage(req, res) {
    //     const {name, email, password} = req.body;
    //     const image = await db.query('INSERT INTO "image" ("name", "email", "password") VALUES ($1, $2, $3) RETURNING *',
    //     [name, email, password]);
    //     res.json(image.rows[0]);
    // };
    async getArticleImages(req, res) {
        const images = await db.query('SELECT * FROM "article_image"');
        res.json(images.rows);
    };
    async getArticleImagesLinks(req, res) {
        const article_id = req.params.article_id;
        const images = await db.query('SELECT "link" FROM "article_image" WHERE "article_id" = $1', [article_id]);
        res.json(images.rows);
    };
    // async getOneImage(req, res) {
    //     const id = req.params.id;
    //     const image = await db.query('SELECT * FROM "image" WHERE id = $1',
    //     [id]);
    //     res.json(image.rows[0]);
    // };
    // async updateImage(req, res) {
    //     const {id, name, email, password} = req.body;
    //     const image = await db.query('UPDATE "image" set "name" = $1, "email" = $2, "password" = $3 WHERE "id" = $4 RETURNING *',
    //     [name, email, password, id]);
    //     res.json(image.rows[0]);
    // };
    // async deleteImage(req, res) {
    //     const id = req.params.id;
    //     const image = await db.query('DELETE FROM "image" WHERE "id" = $1',
    //     [id]);
    //     res.json(image.rows[0]);
    // };
}

module.exports = new ArticleImageController();