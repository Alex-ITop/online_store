const Router = require ('express');
const router = new Router();
const dataSaveController = require('../controllers/dataSave.controller');

router.get('/data/', dataSaveController.getData);
router.get('/data/payment/', dataSaveController.getIncomeForLast);
router.get('/data/user/', dataSaveController.getNewCustomers);
router.get('/data/article/', dataSaveController.getEndingArticles);
router.get('/data/article-income/', dataSaveController.getArticlePercentageIncome);


module.exports = router;