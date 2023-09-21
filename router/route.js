const express = require('express');

const router = express.Router();

// import routes
// import { solver } from "../controllers/solver";

const bfs = require('../controllers/bfs');
const nextState = require('../controllers/nextState');
const solver = require('../controllers/solver');

// Login
router.post('/bfs', bfs);
router.get('/nextState', nextState);
router.get('/solver', solver);

module.exports = router;
