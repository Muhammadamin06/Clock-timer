const tabsItem = document.querySelectorAll('.tabsItem')
const tabsContent = document.querySelectorAll('.tabsContentItem')


for (let i = 0; i < tabsItem.length; i++) {
    tabsItem[i].addEventListener('click',function (e) {
        e.preventDefault()
        for (let x = 0; x < tabsItem.length; x++) {
            tabsItem[x].classList.remove("active")
            tabsContent[x].classList.remove("active")
        }
        tabsItem[i].classList.add("active")
        tabsContent[i].classList.add("active")
    })
}

// clock

const   s       = document.querySelector('.s'),
        m       = document.querySelector('.m'),
        h       = document.querySelector('.h'),
        minutes = document.querySelector('.minutes'),
        hours   = document.querySelector('.hours')

function clock() {
    let time = new Date()
    let sec = time.getSeconds() * 6
    let min = time.getMinutes() * 6
    let hour = time.getHours() * 30
    s.style = `transform:rotate(${sec}deg)`
    m.style = `transform:rotate(${min}deg)`
    h.style = `transform:rotate(${hour}deg)`

    hours.innerHTML = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
    minutes.innerHTML = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()

    setTimeout(() => {
        clock()
    }, 1000);
}
clock()

// sekundomer

const stopwatchSec = document.querySelector('.stopwatch__seconds');
const stopwatchMin = document.querySelector('.stopwatch__minutes');
const stopwatchHour = document.querySelector('.stopwatch__hours');
const stopwatchBtn = document.querySelector('.stopwatch__btn');
const stopwatchCheck = document.querySelector('.tabsLink__span');
const stopwatchAudio = document.querySelector('.stopwatch__audio');


stopwatchBtn.addEventListener('click',function () {
    if (stopwatchBtn.innerHTML.toLowerCase() === 'start') {
        stopwatchBtn.innerHTML = 'stop'
        stopwatchCheck.classList.add('active')
        interval = setInterval(() => {
            stopwatch()
        }, 1000);
    }else if (stopwatchBtn.innerHTML.toLowerCase() === 'stop') {
        stopwatchBtn.innerHTML = 'clear'
        stopwatchCheck.classList.remove('active')
        stopwatchCheck.classList.add('active_clear')
        clearInterval(interval)
    }else if (stopwatchBtn.innerHTML.toLowerCase() === 'clear') {
        stopwatchBtn.innerHTML = 'start'
        stopwatchCheck.classList.remove('active_clear')
        stopwatchSec.innerHTML = 0
        stopwatchMin.innerHTML = 0
        stopwatchHour.innerHTML = 0
        count = 0
    }
})

let count = 0

function stopwatch() {
    stopwatchAudio.play()
    count++
    if (count < 60) {
        stopwatchSec.innerHTML = count
    }
    if (count > 59) {
        stopwatchMin.innerHTML++
        count = 0
        stopwatchSec.innerHTML = count
    }
    if (stopwatchMin.innerHTML > 59) {
        stopwatchHour.innerHTML++
        stopwatchMin.innerHTML = 0
    }
}

// calculator

const calcScreen = document.querySelector('.calc__screen-out');
const calcBtns = Array.from(document.querySelectorAll('.calc__btn'))

calcBtns.map((btn)=>{
    btn.addEventListener('click',function (e) {
        let answer = e.target.innerHTML
        if (answer === 'ac') clear()
        else if (answer === 'ce') del()
        else if (answer === '+/-') plusMinus()
        else if (answer === '√') sqrt()
        else if (answer === '=') respond()
        else add(answer)
        limit()
    })
})

function clear() {
    calcScreen.innerHTML = ''
}
function del() {
    calcScreen.innerHTML = calcScreen.innerHTML.slice(0,-1)
}
function add(answer) {
    calcScreen.innerHTML.length >= 30 
        ? calcScreen.innerHTML = calcScreen.innerHTML 
        : calcScreen.innerHTML += answer
}
function plusMinus() {
    calcScreen.innerHTML = parseFloat(calcScreen.innerHTML) * -1
}
function sqrt() {
    calcScreen.innerHTML = Math.sqrt(calcScreen.innerHTML)
}
function respond() {
    calcScreen.innerHTML = eval(calcScreen.innerHTML)
}
function limit() {
    if (calcScreen.innerHTML.length >= 20) calcScreen.style.fontSize = '20px'
    else if (calcScreen.innerHTML.length >= 12) calcScreen.style.fontSize = '30px'
    else if (calcScreen.innerHTML.length < 12) calcScreen.style.fontSize = '40px'
}

// timer

const timerSec = document.querySelector('.timer__seconds');
const timerMin = document.querySelector('.timer__minutes');
const timerHour = document.querySelector('.timer__hours');
const timerSet = document.querySelector('.timer__set');
const timerBtns = Array.from(document.querySelectorAll('.timer__btn, .timer__set, .timer__clear'))
const timerAudio = document.querySelector('.timer__audio');

timerBtns.map((btn) => {
  btn.addEventListener('click',function (e) {
      let respond = e.target.innerHTML
      clickBtn(respond)
  })  
})

function clickBtn(respond) {
    if (respond.toLowerCase() === 'play') {
        timerSet.innerHTML = 'PAUSE'
        interval = setInterval(() => {
            timer()
        }, 1000);
    } else if (respond.toLowerCase() === 'pause') {
        timerSet.innerHTML = 'PLAY'
        clearInterval(interval)
    } else if (respond.toLowerCase() === 'clear') {
        timerSet.innerHTML = 'PLAY'
                clearInterval(interval)
                                 timerSec.innerHTML = ''
                                 timerMin.innerHTML = ''
                                 timerHour.innerHTML = ''
        timerSet.innerHTML = 'PLAY'
        timerAudio.pause()
        timerAudio.currentTime = 0
        sanoq = 0
    } else {
        if (timerSec.innerHTML.length < 2) {
            let check = timerSec.innerHTML += respond
            teng(check)
        } else if (timerSec.innerHTML.length >= 2 && timerMin.innerHTML.length < 2) {
            timerMin.innerHTML += respond
        } else if (timerMin.innerHTML.length >= 2 && timerHour.innerHTML.length < 2) {
            timerHour.innerHTML += respond
        }
    }

}

let sanoq = 0
function teng(check) {
    sanoq = check
}

function timer() {
    if (sanoq > 0) {
        sanoq--
         timerSec.innerHTML = sanoq
    } else if (sanoq === 0) {
        if (timerMin.innerHTML > 0) {
            timerMin.innerHTML-- 
            sanoq = 59
            timerSec.innerHTML = sanoq
        } else {
            if (timerHour.innerHTML > 0) {
                timerHour.innerHTML--
                timerMin.innerHTML = 59
                sanoq = 59
                timerSec.innerHTML = sanoq
            } else {
                 timerSec.innerHTML = ''
                 timerMin.innerHTML = ''
                timerHour.innerHTML = ''
                timerSet.innerHTML = 'PLAY'
                clearInterval(interval)
                timerAudio.play()
            }
        }
    }
}