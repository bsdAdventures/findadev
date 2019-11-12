const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

//Routes - DB config
const routes = require('./routes/api')
const { keys } = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log(`Database has connected successfully`))
	.catch((error) => {
		console.log(error)
	})


//passport middleware
app.use(passport.initialize());


//passport config

require('./config/passport')(passport)


//Routes

app.use('/api/users', routes.users);
app.use('/api/profile', routes.profile);
app.use('/api/posts', routes.posts);













const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
	console.log(`Server running on ${ PORT }`)
})
