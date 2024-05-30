const db = require('../db');
const saver = require('../dataSaver');
const { response } = require('express');

class DataSaveController {      // create file in ser
    async getData(req, res) {
        const data = await db.query('SELECT * FROM "article"');
        const name = `info_article.xlsx`;
        await saver(data.rows, name);

        res.json(data.rows);
        const filePath = `${__dirname}\\${name}`;
        res.download(filePath);

    };
    
    async getIncomeForLast (req, res) {     // получение инфы о доходах за последний промеж. вр. в конце обр. указать промежуток времени, формат ?date_length=year
        const {date_length} = req.query;
        let data = null; 
        if (date_length == `year`)
            data = await db.query(`SELECT "summ", "date" FROM "payment" WHERE EXTRACT(YEAR FROM "date") = EXTRACT(YEAR FROM CURRENT_DATE)`)
        else if (date_length == `month`)
            data = await db.query(`SELECT "summ", "date" FROM "payment" WHERE EXTRACT(MONTH FROM "date") = EXTRACT(MONTH FROM CURRENT_DATE)`)
        else if (date_length == `day`)
            data = await db.query(`SELECT "summ", "date" FROM "payment" WHERE EXTRACT(DAY FROM "date") = EXTRACT(DAY FROM CURRENT_DATE)`)
        res.json(data.rows);

        const name = `info_IncomeForLast.xlsx`;
        await saver(data.rows, name);
        res.download(`./reports`, name);
    };
    async getNewCustomers (req, res) {      // юзеры за промежуток времени
        const {date_length} = req.query;
        let data = null;
        if (date_length == `year`)
            data = await db.query(`SELECT "name", "email", "registration_date" FROM "user" WHERE EXTRACT(YEAR FROM "registration_date") = EXTRACT(YEAR FROM CURRENT_DATE)`)
        else if (date_length == `month`)
            data = await db.query(`SELECT "name", "email", "registration_date" FROM "user" WHERE EXTRACT(MONTH FROM "registration_date") = EXTRACT(MONTH FROM CURRENT_DATE)`)
        else if (date_length == `day`)
            data = await db.query(`SELECT "name", "email", "registration_date" FROM "user" WHERE EXTRACT(DAY FROM "registration_date") = EXTRACT(DAY FROM CURRENT_DATE)`)
        res.json(data.rows);

        const name = `info_NewCustomers.xlsx`;
        await saver(data.rows, name);
        res.download(`./reports`, name);
    };

    async getEndingArticles (req, res) {        // получение товаров, которых меньше чем указ. знач. добавоять в конце запр усл. ?less_than=4..
        const {less_than} = req.query;      
        let data = await db.query(`SELECT "id", "title", "count" FROM "article" WHERE "count" < $1`, [less_than]);
        res.json(data.rows);

        const name = `info_EndingArticles.xlsx`;
        await saver(data.rows, name);
        res.download(`./reports`, name);
    };

    async getArticlePercentageIncome(req, res) {        // получ. инфы о доходах с продажи товара, общий доход со всех товаров и процент этого товара от общ. дохода
        const {article_id} = req.query;
        const payment = await db.query(`SELECT "summ", "order_id" FROM "payment"`);
        // http://localhost:3001/api/data/article-income?article_id=3
        let summ = 0;
        const order = await db.query(`SELECT "order_id", "article_id" FROM "ordered_article"`);
        for (let i = 0; i < order.rows.length; i++) {
        if (order.rows[i].article_id == article_id)
        for (let j = 0; j < payment.rows.length; j++) {
        if (payment.rows[j].order_id == order.rows[i].order_id)
        summ += Number(payment.rows[j].summ);
    
        }
        }
        
        let allSumm = 0;
        for (let i = 0; i < payment.rows.length; i++) {
        allSumm += Number(payment.rows[i].summ);
        }
        
        let data = [{
        allSum: allSumm,
        articleSum: summ,
        percentage: `${(summ*100/allSumm).toFixed(1)}%`
        }]
        res.json(data);
        
        const name = `info_PercentageIncome.xlsx`;
        await saver(data, name);
        };
        
        
}

module.exports = new DataSaveController();