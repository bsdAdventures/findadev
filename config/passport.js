const { Strategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('users')
const keys = require('./keys')


const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.secretKey
};

module.exports = async passport => {
	passport.use(
		new Strategy(opts, async (payload, done) => {
			try {
				const foundUser = await User.findById(payload.id)
				if (foundUser) {
					const { id, name, email, avatar } = foundUser


					return done(null, { id, name, email, avatar });
				}
				return done(null, false);

			} catch (err) {
				console.error(err)
			}
		})
	);
};
