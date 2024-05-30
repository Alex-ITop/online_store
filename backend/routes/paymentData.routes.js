const Router = require ('express');
const router = new Router();
const paymentDataController = require('../controllers/paymentData.controller');

router.post('/payment-data', paymentDataController.createPaymentData);
router.get('/payment-data', paymentDataController.getPaymentDatas);
router.get('/payment-data/:id', paymentDataController.getOnePaymentData);
router.put('/payment-data/:id', paymentDataController.updatePaymentData);
router.delete('/payment-data/:id', paymentDataController.deletePaymentData);

module.exports = router;