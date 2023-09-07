const passport = require('passport');
const local = require('./localStrategy');
const google = require('./googleStrategy')


module.exports = ()=>{
    passport.serializeUser((user, done) => {
        done(null, user);
     });
    
    passport.deserializeUser((user, done) => {
        //? 두번 inner 조인해서 나를 팔로우하는 followerid와 내가 팔로우 하는 followingid를 가져와 테이블을 붙인다.
      //   User.findOne({ where: { id } })
      //      .then(user => done(null, user))
      //      .catch(err => done(err));
      done(null, user); // 여기의 user가 req.user가 됨
     });
    
     local()
     google()
}