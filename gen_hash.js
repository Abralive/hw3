const bcrypt = require("bcrypt");

const users = [
    { account: "abc", password: "1234" },
    { account: "fcu", password: "2025fcu" }
];

const saltRounds = 10;

users.forEach(user => {
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) throw err;

        console.log(`INSERT INTO users (account, password_hash) VALUES ('${user.account}', '${hash}');`);
    });
});
