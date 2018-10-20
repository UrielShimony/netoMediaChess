var express = require('express');
var router = express.Router();
var calculateMoves = require('../chessEngine');
var cors = require('cors')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/Hi', function (req, res, next) {
    res.send('hi to you to');
});
router.get('/calculatePiecePossibleMoves',cors(), function (req, res, next) {
    const {boardState, piecePosition, pieceName, playerColor} = req.query;
    try {
        const possibleTrips = calculateMoves(boardState, piecePosition, pieceName, playerColor)
        res.send(possibleTrips)
    } catch (error) {
        res.status(400);
        res.send(error)
    }
});

module.exports = router;
