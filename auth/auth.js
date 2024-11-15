const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Passport strategy
passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
       // console.log('Received credentials: ', username, password);
        
        // Await the result of the database query
        const user = await Person.findOne({ username: username });
        
        if (!user) {
          return done(null, false, { message: "Incorrect Username" });
        }
  
        const isPasswordMatch = user.comparePassword()
  
        if (isPasswordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
        
      } catch (error) {
        return done(error);
      }
    })
  );

  module.exports = passport