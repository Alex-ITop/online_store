const db = require('../db');
class UserController {
    async createUser(req, res) {
        const {name, email, password} = req.body;
        const user = await db.query('INSERT INTO "user" ("name", "email", "password") VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]);
        res.json(user.rows[0]);
    };
    async getUsers(req, res) {
        const users = await db.query('SELECT * FROM "user"');
        res.json(users.rows);
    };
    async getOneUser(req, res) {
        const id = req.params.id;
        const user = await db.query('SELECT * FROM "user" WHERE id = $1',
        [id]);
        res.json(user.rows[0]);
    };
    async updateUser(req, res) {
        const {id, name, email, password} = req.body;
        const user = await db.query('UPDATE "user" set "name" = $1, "email" = $2, "password" = $3 WHERE "id" = $4 RETURNING *',
        [name, email, password, id]);
        res.json(user.rows[0]);
    };
    async deleteUser(req, res) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM "user" WHERE "id" = $1',
        [id]);
        res.json(user.rows[0]);
    };
}

module.exports = new UserController();