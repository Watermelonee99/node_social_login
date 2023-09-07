const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// 임시 id, pw 배열
const users = [
    { id: "hello", pw: "world" },
    { id: "good", pw: "bye" },
];

// 입력된 id가 존재하는 지 여부와 위치 반환 함수
const findIndexByID = (id) => {
    let len = users.length;

    for (let i = 0; i < len; i++) {
        if (users[i].id === id) return i;
    }

    return -1;
};

// id, pw login 함수
const login = (id, pw) => {
    let index = findIndexByID(id);

    if (index === -1) return -1;
    if (users[index].pw === pw) return 1;
    return 0;
};

module.exports = ()=>{
    passport.use(
        new LocalStrategy(
            {
                usernameField: "id",
                passwordField: "pw",
            },
            function (username, password, done) {
                let result = login(username, password);
    
                if (result === -1)
                    return done(null, false, { message: "Incorrect username." });
                else if (result === 0)
                    return done(null, false, { message: "Incorrect password." });
                else return done(null, { id: username, provider : "local" });
            }
        )
    );

}
