const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/../../../public')));
app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: false }));
app.set('views', __dirname + '/../../views');
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    return res.render('codigo_turma');
});

app.get('/login', (req, res) => {
    return res.render('login');
});

app.get('/cadastro', (req, res) => {
    return res.render('cadastro');
});

app.get('/codigo-turma', (req, res) => {
    var loginStatus = false;

    if (req.session.loggedin) {
        loginStatus = true;
    } else {
        loginStatus = false;
    }

    return res.render('codigo_turma', { login_status: loginStatus });
});

app.get('/logado-aluno', (req, res) => {
    return res.render('logado_aluno');
});

app.get('/logado-professor', (req, res) => {
    return res.render('logado_professor');
});

app.get('/logado', (req, res) => {
    return res.render('logado');
});

app.get('/sala-aluno', (req, res) => {
    return res.render('sala_aluno');
});

app.get('/sala-professor', (req, res) => {
    return res.render('sala_professor');
});

app.get('/sala', (req, res) => {
    return res.render('sala');
});

app.get('/video', (req, res) => {
    return res.render('video');
});

app.get('/prova', (req, res) => {
    return res.render('prova');
});

module.exports = app;