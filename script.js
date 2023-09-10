const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const imgBanner = document.querySelector('.app__image')
const titleH1 = document.querySelector('.app__title')
const startPauseBt = document.getElementById('start-pause')
const activeBtn = document.querySelectorAll('.app__card-button')
const timeInScreen = document.getElementById('timer')
const textBt = document.querySelector('#start-pause span')
const imgBt = document.querySelector('#start-pause img')

const musicFocusInput = document.getElementById('alternar-musica')
const music = new Audio('/sons/luna-rise-part-one.mp3')
const pauseTime = new Audio('/sons/pause.mp3')
const playTime = new Audio('/sons/play.wav')
const alertEndTime = new Audio('/sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

pauseTime.volume = 0.2
music.loop = true
music.volume = 0.5

musicFocusInput.addEventListener('change', () => {
  if (music.paused) {
    music.play()
  } else {
    music.pause()
  }
})

focoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 1500
  alterarContexto('foco')
  focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 300
  alterarContexto('descanso-curto')
  curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 900
  alterarContexto('descanso-longo')
  longoBt.classList.add('active')
})

function alterarContexto(contexto) {
  mostrarTempo()
  activeBtn.forEach((contexto) => {
    contexto.classList.remove('active')
  })
  html.setAttribute('data-contexto', contexto)
  imgBanner.setAttribute('src', `/imagens/${contexto}.png`)
  switch (contexto) {
    case 'foco':
      titleH1.innerHTML = `
      Otimize sua produtivade, <br> <strong class='app__title-strong'> mergulhe no que importa.</strong>
      `
      break
    case 'descanso-curto':
      titleH1.innerHTML = `
        Que tal dar<br> uma respirada? <strong class='app__title-strong'>Faça uma pausa curta!</strong>
        `
      break
    case 'descanso-longo':
      titleH1.innerHTML = `
      Hora de voltar à superfície. <br> <strong class='app__title-strong'>Faça uma pausa longa.</strong>
      `
    default:
      break
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    alertEndTime.play()
    alert('Tempo finalizado!')
    zerar()
    return
  }
  tempoDecorridoEmSegundos -= 1
  mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
  if (intervaloId) {
    pauseTime.play()
    zerar()
    return
  }
  playTime.play()
  imgBt.setAttribute('src', '/imagens/pause.png')
  intervaloId = setInterval(contagemRegressiva, 1000)
  textBt.textContent = 'Pausar'
}

function zerar() {
  clearInterval(intervaloId)
  textBt.textContent = 'Começar'
  imgBt.setAttribute('src', '/imagens/play_arrow.png')
  intervaloId = null
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000)
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {
    minute: '2-digit',
    second: '2-digit',
  })
  timeInScreen.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
