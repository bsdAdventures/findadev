const express = require('express');
const router = express.Router();


// @route 			GET api/posts/test
// @description		test posts route
// @access 			public

router.get('/test', (req, res) => {
	res.json({
		mesg: 'posts actually works'
	})
})



module.exports = router;
