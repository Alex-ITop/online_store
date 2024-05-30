const Router = require ('express');
const router = new Router();
const cartController = require('../controllers/cart.controller');

router.post('/cart', cartController.createCart);
router.get('/cart', cartController.getCarts);
router.get('/cart/:id', cartController.getOneCart);
router.put('/cart/:id', cartController.updateCart);
router.delete('/cart/:id', cartController.deleteCart);

module.exports = router;