// variávies da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// variávies do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

// placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//-50 erra
//0 quase erra
//40 acerta
//80 quase erra
//120 erra
let chanceDeErrar = -20;

// sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  soundFormats('mp3', 'ogg');
  trilha = loadSound("js/trilha.mp3");
  ponto = loadSound("js/ponto.mp3");
  raquetada = loadSound("js/raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimenteMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete)
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimenteRaqueteOponente()
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
   if(colisao(width, xBolinha, raio)){
    velocidadeXBolinha *= -1;
  }
  
  if(colisao(height, yBolinha, raio)){
    velocidadeYBolinha *= -1;
  }
}

function colisao(max, position, raio) {
  if(position + raio > max || position - raio < 0) {
     return true;
  }else {
     return false;
  }
 
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimenteMinhaRaquete(){
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 5;
  }
  
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 5;
  }
}


// function verificaColisaoRaquete(){
//   if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
//      velocidadeXBolinha *= -1
//   }
// }

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, diametro)
  
  if(colidiu){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
  
}

function movimenteRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento/2; - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= -20){
    chanceDeErrar = -20
    }
  }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(251, 86, 2))
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(251, 86, 2))
  rect(410, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 430, 26);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  
  if(xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}



