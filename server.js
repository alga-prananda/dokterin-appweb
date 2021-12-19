const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const http = require('http').createServer(app);
const db = require('./models');
const fixtures = require('./scripts/fixture_patient');
const session = require('express-session');
const colors = require("colors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const hbs = require('handlebars');
const moment = require('helper-moment');
const exphbs = require("express-handlebars");
const routes = require("./controllers/ps_controller.js");
const passport = require('./config/passport');
const io = require('socket.io')(http);

// gunakan publik statis
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// ganti post yg mmiliki ?_method=DELETE
app.use(methodOverride("_method"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", routes);

let usernames = {};
let connections = [];

io.sockets.on('connection', socket => {

    socket.on('subscribe', room => {
        console.log("joining room", room);
        socket.join(room);
    });
    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);

    // disconnett
    socket.on('disconnect', data => {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected: %s sockets connected", connections.length);

        // hapus nama pengguna dari daftar nama user global
        delete usernames[socket.username];
        // perbarui daftar user dalam obrolan, sisi klien
        io.sockets.emit('updateusers', usernames);
        // update chat apabila clien disconnect
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    });

    // kirim pesan
    socket.on('send message', (message, username, avatar) => {
        io.sockets.emit('new message', username, avatar, { msg: message });
        db.message.create({
            username: username,
            message: message,
            avatar: avatar,
        });
    });

    // mnuliss
    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });
    socket.on('adduser', (username) => {
        // mnyimpan nma user di sisi soket utk klien
        socket.username = username;
        // add nama user klien ke daftar global
        usernames[username] = username;
        // client they have connected
        socket.emit('updatechat', 'SERVER', 'you have connected');
        // all clients that a person has connected
        socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
        // prbarui daftar user dalam obrolan di sisi klien
        io.sockets.emit('updateusers', usernames);
    });
});

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('moment', require('helper-moment'));

app.use((req, res, next) => {
    res.status(404)
    res.render("error")
});

db.sequelize.sync()
    .then(() => {
        http.listen(port, () => { console.log(`==> 🌎 Listening on PORT ${port}. Visit http://localhost:${port}`.green) });
    });