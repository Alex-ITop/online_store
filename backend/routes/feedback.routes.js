const Router = require ('express');
const router = new Router();
const feedbackController = require('../controllers/feedback.controller');

router.post('/feedback', feedbackController.createFeedback);
router.get('/feedback', feedbackController.getFeedbacks);
router.get('/feedback/:id', feedbackController.getOneFeedback);
router.put('/feedback/:id', feedbackController.updateFeedback);
router.delete('/feedback/:id', feedbackController.deleteFeedback);

module.exports = router;