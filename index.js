const express = require('express');
const app = express();

//ARQUIVOS ESTATICOS
app.use('/js', express.static('js'))

app.listen(process.env.PORT || 3000, () => console.log("server start"));
app.get('/', (req, res) => {
    res.status(200).sendFile("/home/rafael/Documentos/Alura/jogos/p5WEB/pong/index.html")
});