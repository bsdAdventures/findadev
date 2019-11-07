const express = require('express');
const router = express.Router();
const passport = require('passport')
const mongoose = require('mongoose')

const { Post, Profile } = require('../../models')
const { validatePost } = require('../../helper/validation')


// @route 			POST api/posts
// @description		create posts
// @access 			private

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	//validate request
	const { errors, isValid } = validatePost(req.body)

	//if req is not valid send status 400
	if (!isValid) {
		return res.status(400).json(errors)
	}
	//destructing object being sent via POST by client to create posts
	const { name, text, avatar, user } = req.body
	//craete new post object
	const newPost = new Post({ name, text, avatar, user })
	try {
		//save post to database
		const addNewPost = await newPost.save()
		if (addNewPost) res.json(addNewPost)
	} catch (error) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
})



// @route 			GET api/posts
// @description		Get all posts
// @access 			public

router.get('/', async (req, res) => {

	try {
		//retieve all post and sort
		const getPosts = await Post.find().sort({ date: -1 })
		//send response to client
		if (getPosts) res.json(getPosts)
	} catch (error) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}

})



// @route 			GET api/posts/:id
// @description		Get post by id
// @access 			public

router.get('/:id', async (req, res) => {

	const { id } = req.params
	try {
		//find post by id
		const getOnePost = await Post.findById(id)
		//if found send reponse to client
		if (getOnePost) res.json(getOnePost)
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ noPost: 'No post with that ID' });
	}

})



// @route 			DELTE api/posts/:id
// @description		DELETE post by id
// @access 			private

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	//comes from password
	const { id } = req.user

	try {
		//check if use exists in datababse
		const findUser = await Profile.findOne({ user: id })
		if (findUser) {
			//find post to be deleted by post id
			const post = await Post.findById(req.params.id)
			if (post) {
				//user from database
				const { user } = findUser

				//compare user ids of user in Databse with user sending request/logged in to make sure they own the post
				if (user.toString() !== req.user.id) {
					return res.status(401).json({ noauthorization: 'User not authorized' });
				}
				//delete post and send response to client
				const deletePost = await post.remove()
				//send response to the client
				if (deletePost) res.json({ sucess: true })
			}
		}

	} catch (error) {
		console.error(error.message);
		res.status(500).json({ noPost: 'No Post found' });
	}

})






// @route 			POST api/posts/like/:id
// @description		Like post by id
// @access 			private

router.post('/like/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {

	try {

		const findUser = await Profile.findOne({ user: req.user.id })
		if (findUser) {
			//find post to be deleted by post id
			const post = await Post.findById(req.params.id)
			if (post) {
				if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
					return res.status(400).json({ alreadyliked: 'User already liked this post' })
				}

				post.likes.unshift({ user: req.user.id })
				const addLikes = await post.save()

				if (addLikes) res.json(addLikes)

			}
		}


	} catch (error) {
		console.error(error.message);
		res.status(500).json({ noPost: 'No Post found' });
	}

})



module.exports = router;
