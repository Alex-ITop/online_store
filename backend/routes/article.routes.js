const Router = require ('express');
const router = new Router();
const articleController = require('../controllers/article.controller');

router.post('/article', articleController.createArticle);
router.get('/article', articleController.getArticles);
router.get('/limited-article', articleController.getLimitedArticles);
router.get('/article/:id', articleController.getOneArticle);
router.put('/article/:id', articleController.updateArticle);
router.delete('/article/:id', articleController.deleteArticle);

module.exports = router;