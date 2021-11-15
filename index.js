const express = require('express');
const app = express();

const paths = {
    dev: "/home/rafael/Documentos/Alura/jogos/p5WEB/pong/",
    heroku: "/app/"
}

//ARQUIVOS ESTATICOS
app.use('/js', express.static('js'))

app.listen(process.env.PORT || 3000, () => console.log("server start"));
app.get('/', (req, res) => {
    res.status(200).sendFile(paths.heroku + "index.html");
});