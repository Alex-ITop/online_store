const Router = require ('express');
const router = new Router();
const articleImageController = require('../controllers/articleImage.controller');

//router.post('/image', imageController.createImage);
router.get('/article-image', articleImageController.getArticleImages);
router.get('/article-image/links/:article_id', articleImageController.getArticleImagesLinks);
// router.get('/image/:id', imageController.getOneImage);
// router.put('/image', imageController.updateImage);
// router.delete('/image/:id', imageController.deleteImage);

module.exports = router;