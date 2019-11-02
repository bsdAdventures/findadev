const express = require('express');
const router = express.Router();


// @route 			GET api/users/test
// @description		test users route
// @access 			public



router.get('/test', (req, res) => {
	res.json({
		mesg: 'user actually works'
	})
})



module.exports = router;
