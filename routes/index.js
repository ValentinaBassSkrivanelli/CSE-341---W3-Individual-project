const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/movies', require('./movies'));
router.use('/clasificacion', require('./clasificacion'));

router.get('/login', passport.authentication('github'), (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
 });

module.exports = router;
