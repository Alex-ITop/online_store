const Router = require ('express');
const router = new Router();
const paymentController = require('../controllers/payment.controller');

router.post('/payment', paymentController.createPayment);
router.get('/payment', paymentController.getPayments);
router.get('/payment/:id', paymentController.getOnePayment);
router.put('/payment/:id', paymentController.updatePayment);
router.delete('/payment/:id', paymentController.deletePayment);

module.exports = router;