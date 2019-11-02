const express = require('express')
const mongoose = require('mongoose')



const routes = require('./routes/api')


const app = express();

const db = require('./config/keys').mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log(`Database has connected successfully`))
	.catch(console.log)




app.get('/', (req, res) => {
	res.send('hello my niggas')
});



//Routes

app.use('/api/users', routes.users);
app.use('/api/profile', routes.profile);
app.use('/api/posts', routes.posts);













const PORT = process.env.PORT ? process.env.PORT : 5000
app.listen(PORT, () => {
	console.log(`Server running on ${ PORT }`)
})
