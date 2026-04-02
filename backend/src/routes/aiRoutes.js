const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const limiter = require('../middlewares/rateLimiter');

// Executa o limitador logico em cada requisição desta rota
router.post('/recommend', limiter, aiController.getRecommendations);

module.exports = router;
