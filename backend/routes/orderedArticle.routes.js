const Router = require ('express');
const router = new Router();
const orderedArticleController = require('../controllers/orderedArticle.controller');

router.post('/ordered_article', orderedArticleController.createOrderedArticle);
router.get('/ordered-article', orderedArticleController.getOrderedArticles);
router.get('/ordered-article/:id', orderedArticleController.getOneOrderedArticle);
router.put('/ordered-article/:id', orderedArticleController.updateOrderedArticle);
router.delete('/ordered-article/:id', orderedArticleController.deleteOrderedArticle);

module.exports = router;