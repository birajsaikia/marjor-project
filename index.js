const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
// const expressLayouts = require('express-ejs-layouts');
const db = require('./confic/mongoose');
const session = require('express-session');
const passport  = require('passport');
const passportLocal = require('./confic/passport-local-strategy');
const passportJWT = require('./confic/passport-jwt-strategy');
const passportGoogle = require('./confic/password-google-oauth2');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const custoMwire = require('./confic/middleware');

//setup  socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./confic/chatSocket').chatSockets(chatServer);
chatServer.listen(5001);
console.log('chat server is running on 5001');

const path = require('path');


app.use(sassMiddleware({
    src: '/assets/scss',
    dest: '/assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/CSS'
}))

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('assets'));
app.use('/uploads', express.static(__dirname + '/uploads'))

// app.use(expressLayouts);
// // extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// app.use(session({
//      name: 'codial',
//      secret: 'blahsonthing',
//      saveUninitialized: false,
//      resave: false,
//      cookie: {
//         maxAge : (1000 * 60 * 100)
//      },
//     //  store:new MongoStore(
//     //     {
//     //         mongooseConnection: db,
//     //         autoRemove: 'disabled'
//     //     },
//     //     function(err){
//     //         console.log(err || 'connect mongoose have error')
//     //     }
//     // )
// }));

app.use(session({
    name:'codeial',
    //todo : cahnge the secret before deploying
    secret: 'blahsonthing',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl:"mongodb://0.0.0.0/cdsds09odeial_development",
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo-db-setup ok');
        }
    )
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(custoMwire.setFlash);

// use express router
app.use('/', require('./router'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
