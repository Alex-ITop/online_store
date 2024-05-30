const db = require('../db');
class ArticleController {
    async createArticle(req, res) {
        const {title, price, category_id} = req.body;
        const article = await db.query('INSERT INTO "article" ("title", "price", "category_id") VALUES ($1, $2, $3) RETURNING *',
        [title, price, category_id]);
        res.json(article.rows[0]);
    };
    async getArticles(req, res) {
        const articles = await db.query('SELECT * FROM "article"');
        res.json(articles.rows);
    };
    async getLimitedArticles (req, res) {
        const {category_id, limit, offset, title, price_min, price_max} = req.query;

        let articles = null;

        if (category_id == undefined)
            articles = await db.query('SELECT * FROM "article"');
        else
            articles = await db.query('SELECT * FROM "article" WHERE "category_id" = $1', [category_id]);

        let priceLimitedArt = new Array;
        const limitedArt = new Array;

        if (price_min != undefined && price_max != undefined) {
            for (let i = 0; i < articles.rowCount; i++) {
                if (price_max != 0)
                    if (articles.rows[i] > price_max)   
                        continue;
                if (articles.rows[i] < price_min)
                    continue;
                priceLimitedArt[priceLimitedArt.length] = articles.rows[i];
            }
            if (limit != 0 && limit!=undefined)
            {
                for (let i = 0; i < limit && i < priceLimitedArt.length; i++) {
                    limitedArt[limitedArt.length] = priceLimitedArt[i];
                }
            }
            else
            {
                for (let i = 0; i < priceLimitedArt.length; i++) {
                    limitedArt[limitedArt.length] = priceLimitedArt[i];
                }
            }
        }
        else {
            if (limit != 0 && limit!=undefined)
            {
                for (let i = 0; i < limit; i++) {
                    limitedArt[limitedArt.length] = articles.rows[i];
                }
            }
            else
            {
                for (let i = 0; i < articles.rows.length; i++) {
                    limitedArt[limitedArt.length] = articles.rows[i];
                }
            }
        }

        for (let i = 0; i < limitedArt.length; i++) {
            const artImages = await db.query('SELECT "link" FROM "article_image" WHERE "article_id" = $1', [limitedArt[i].id]);

            let images = new Array;
            for (let j = 0; j < artImages.rows.length; j++)
               images[j] = artImages.rows[j].link;
            limitedArt[i].images = images;
    
            const catRes = await db.query('SELECT * FROM "category" WHERE "id" = $1', [limitedArt[i].category_id]);
            console.log(catRes.rows);
            limitedArt[i].category = catRes.rows[i];
        }
        res.json(limitedArt);
    }
    async getOneArticle(req, res) {
        const id = req.params.id;
        const article = await db.query('SELECT * FROM "article" WHERE id = $1',
        [id]);

        const limitedArt = article.rows[0];
        const artImages = await db.query('SELECT "link" FROM "article_image" WHERE "article_id" = $1', [limitedArt.id]);
        
        let images = new Array;
        for (let j = 0; j < artImages.rows.length; j++)
           images[j] = artImages.rows[j].link;
        limitedArt.images = images;

        const catRes = await db.query('SELECT * FROM "category" WHERE "id" = $1', [limitedArt.category_id]);
        limitedArt.category = catRes.rows[0];

        res.json(limitedArt);
    };
    async updateArticle(req, res) {
        const id = req.params.id;
        const {title, price, category_id} = req.body;
        const article = await db.query('UPDATE "article" set "title" = $1, "price" = $2, "category_id" = $3 WHERE "id" = $4 RETURNING *',
        [title, price, category_id, id]);
        res.json(article.rows[0]);
    };
    async deleteArticle(req, res) {
        const id = req.params.id;
        const article = await db.query('DELETE FROM "article" WHERE "id" = $1',
        [id]);
        res.json(article.rows[0]);
    };
}

module.exports = new ArticleController();