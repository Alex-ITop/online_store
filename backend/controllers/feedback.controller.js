const db = require('../db');
class FeedbackController {
    async createFeedback(req, res) {
        const {text, user_id, article_id} = req.body;
        const feedback = await db.query('INSERT INTO "feedback" ("text", "date", "user_id", "article_id") VALUES ($1, CURRENT_DATE, $2, $3) RETURNING *',
        [text, user_id, article_id]);
        res.json(feedback.rows[0]);
    };
    async getFeedbacks(req, res) {
        const feedbacks = await db.query('SELECT * FROM "feedback"');
        res.json(feedbacks.rows);
    };
    async getOneFeedback(req, res) {
        const id = req.params.id;
        const feedback = await db.query('SELECT * FROM "feedback" WHERE id = $1',
        [id]);
        res.json(feedback.rows[0]);
    };
    async updateFeedback(req, res) {
        const id = req.params.id;
        const {text, user_id, article_id} = req.body;
        const feedback = await db.query('UPDATE "feedback" set "text" = $1, "user_id" = $2, "article_id" = $3 WHERE "id" = $4 RETURNING *',
        [text, user_id, article_id, id]); //что с датой делать?
        res.json(feedback.rows[0]);
    };
    async deleteFeedback(req, res) {
        const id = req.params.id;
        const feedback = await db.query('DELETE FROM "feedback" WHERE "id" = $1',
        [id]);
        res.json(feedback.rows[0]);
    };
}

module.exports = new FeedbackController();