const aguardando = document.querySelector('#aguardando')
const info = document.querySelector('#info')
const rodando = document.querySelector('#rodando')
const dialogo = document.querySelector('#dialogo')
const questao = document.querySelector('#questao')
const radius = document.getElementsByName('resposta')
const r1 = document.querySelector('#r1')
const r2 = document.querySelector('#r2')
const r3 = document.querySelector('#r3')
const r4 = document.querySelector('#r4')
const lblR0 = document.querySelector('label[for="r0"]')
const lblR1 = document.querySelector('label[for="r1"]')
const lblR2 = document.querySelector('label[for="r2"]')
const lblR3 = document.querySelector('label[for="r3"]')
const lblR4 = document.querySelector('label[for="r4"]')
const btn = document.querySelector('#btnEnviar')
const showpontos = document.querySelector('#showpontos')

let perguntaId
let perguntasFinalizadas = false

Crafty.scene('PerguntasScene', () => {
  info.close()
  socket.emit("playerInicia")

  socket.on("playerIniciaPerguntas",()=>{
    socket.emit('iniciarPerguntas')
  })

  socket.on("aguardandoPlayers",()=>{
    aguardando.show()
  })

  socket.on("perguntaAtual",(pergunta)=>{
    if(!perguntasFinalizadas){
      aguardando.close()
      Array.from(radius).forEach(r => {
        r.checked = false
      })
      perguntaId = pergunta._id
      questao.innerText = pergunta.questao
      lblR0.innerText = pergunta.respostas[0].resposta
      lblR1.innerText = pergunta.respostas[1].resposta
      lblR2.innerText = pergunta.respostas[2].resposta
      lblR3.innerText = pergunta.respostas[3].resposta
      lblR4.innerText = pergunta.respostas[4].resposta
      showpontos.innerText = `Valor: ${pergunta.pontuacao}`
      dialogo.show()
    }
  })

  socket.on('perguntasFinalizadas', () => {
    dialogo.close()
    console.log("ok")
    socket.emit("partidaIniciada")
  })

  socket.on("startGame",()=>{
    info.show()
    Crafty.scene('MainScene')
  })

  socket.on("partidaRodando",()=>{
    rodando.show()
  })

  socket.on('resultadoResposta', (certa, pontuacao) => {
    if(certa) pontos += pontuacao
    dialogo.close()
  })

  btn.onclick = () => {
    const resposta = Array.from(radius).find(r => r.checked == true).value
    socket.emit('validarResposta', perguntaId, resposta)
  }

})
