const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

// TODO: Split up multer ...

// const express = require("express")
// const app = express()
// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({});
// const multer = require("multer")

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }))

// app.engine('handlebars', hbs.engine);
// app.set("view engine", "handlebars")


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// const upload = multer({ storage: storage })

// app.get("/upload", (req, res) => {
//     res.render("homepage")
// })

// app.post("/upload", upload.single("Imaged"), (req, res) => {
//     res.send("Image uploaded")
//     console.log(req.file);
// })

// app.listen(3001)
// console.log(`Listening on 3001`);


