import * as passport from 'koa-passport';
import { Strategy } from 'passport-local';

const fetchUser = (() => {
  const user = { id: 1, username: 'test', password: 'test' };
  return async function() {
    return user;
  };
})();


passport.use(
  new Strategy(function(username, password, done) {
    fetchUser()
      .then(user => {
        if (username === user.username && password === user.password) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => done(err));
  })
);


passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (user, done) => {
  try {
    const user = await fetchUser();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
