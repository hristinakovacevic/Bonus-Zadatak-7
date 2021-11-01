let redBtns = document.querySelectorAll('.header-btn')
let settings = document.querySelector('.settings-btn')
let closeBtn = document.querySelector('.close-btn')
let startPauseBtn = document.querySelector('#start-pause-btn')
 let lightbox = document.querySelector('.lightbox')
 let applyBtn = document.querySelector('.apply-btn')
 let red = document.querySelector('.red')
 let blue = document.querySelector('.blue')
 let purple = document.querySelector('.purple')
 let colors = document.querySelectorAll('.colors')

 let pomodoro = document.querySelector('.pomodoro')
 let sBreak = document.querySelector('.s-break')
 let lBreak = document.querySelector('.l-break')
 let circle = document.querySelector('.circle')

let minutesInterval
let secondsInterval
let strokeColor = 'red-stroke'
let newStrokeColor 
let currentColorClass = 'red-btn'
let newColorClass

 /* ---------------------------------Modal-inputs---------------------------------- */
 let minutes = document.querySelector('#minutes')
 let seconds = document.querySelector('#seconds')
 let inputPomodoro = document.querySelector('.input-pomodoro')
 let inputShort = document.querySelector('.input-short')
 let inputLong = document.querySelector('.input-long')
 let totalMin = minutes.innerHTML


pomodoro.addEventListener('click', ()=>{
    minutes.innerHTML = inputPomodoro.value
    totalMin = inputPomodoro.value

})
sBreak.addEventListener('click', ()=>{
    minutes.innerHTML = inputShort.value
    totalMin = inputShort.value
})
lBreak.addEventListener('click', ()=>{
    minutes.innerHTML = inputLong.value
    totalMin = inputLong.value
})



/* --------------------------Toggle red-btns---------------------------------------- */

 redBtns.forEach((redBtn)=>redBtn.addEventListener('click', ()=>{
    
        redBtns.forEach((redBtn)=>redBtn.classList.remove(currentColorClass))
        redBtn.classList.add(currentColorClass)
    
})) 

/* ---------------------------------------Modal-------------------------------------------- */
settings.addEventListener('click', ()=>{
 lightbox.classList.add('active')
   
})
closeBtn.addEventListener('click', ()=>{
    lightbox.classList.remove('active')
      
   })
   /* --------------------------------Apply-btn------------------------------------------- */

 applyBtn.addEventListener('click', ()=>{
    
    lightbox.classList.remove('active')

    redBtns.forEach((redBtn)=>{
        if(redBtn.classList.contains(currentColorClass)){
            if(redBtn.classList.contains('pomodoro')){
                minutes.innerHTML = inputPomodoro.value
            }
            if(redBtn.classList.contains('s-break')){
                minutes.innerHTML = inputShort.value
            }
            if(redBtn.classList.contains('l-break')){
                minutes.innerHTML = inputLong.value
            }

            redBtn.className = redBtn.className.replace(currentColorClass, newColorClass)
            
    
        }
    })
    circle.setAttribute('class', "circle " + newStrokeColor)

    currentColorClass = newColorClass
    strokeColor = newStrokeColor
})

startPauseBtn.addEventListener("mouseover", function( event ) {
    startPauseBtn.classList.add(currentColorClass+'-hover')
  
    setTimeout(function() {
        startPauseBtn.classList.remove(currentColorClass+'-hover')
    }, 555);
  }, false);
/* ---------------------------------Colors------------------------------- */
colors.forEach((color)=>color.addEventListener('click', ()=>{
    colors.forEach((color)=>color.classList.remove('add-check'))
     color.classList.add('add-check')
     classParams = color.className.split(' ')
     newColorClass = classParams[1] + '-btn'
    newStrokeColor = classParams[1] + '-stroke'
     
}))

   /* -----------------------------------------Start/Pause btn------------------------------------------------------------ */

 startPauseBtn.addEventListener('click', ()=>{
    if (startPauseBtn.classList.contains('not-started')) {
        startPauseBtn.classList.remove('not-started')
        startPauseBtn.innerHTML = 'PAUSE'

        minutesInterval = setInterval(minutesTimer, 1000)
        secondsInterval = setInterval(secondsTimer, 1000)
        circleInterval = setInterval(setProgress, 1000)

        function minutesTimer(){
            minutes = parseInt(document.getElementById('minutes').innerHTML)
            seconds =parseInt(document.getElementById('seconds').innerHTML)
            if (seconds <= 0) {
                minutes = minutes - 1
            }
            if (minutes < 10) {
                minutes = '0' + minutes
            }
            document.getElementById('minutes').innerHTML = minutes
        }
        function secondsTimer(){
            seconds = document.getElementById('seconds').innerHTML
            if(seconds == 0){
                seconds=60
            }
            seconds = seconds-1
            if (seconds < 10) {
                seconds = '0' + seconds
            }
            document.getElementById('seconds').innerHTML = seconds
        }

        
        let radius = circle.r.baseVal.value;

        let circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = circumference;
        
       
        function setProgress() {
            minutes = document.getElementById('minutes').innerHTML
            seconds = document.getElementById('seconds').innerHTML
           let percents = ((parseInt(minutes) * 60) + parseInt(seconds)) / (parseInt(totalMin) * 60)
           
            circle.style.strokeDashoffset =  (percents) * circumference;
        }
        

    } else {
        startPauseBtn.classList.add('not-started')
        clearInterval(minutesInterval)
        clearInterval(secondsInterval)
        clearInterval(circleInterval)
        startPauseBtn.innerHTML = 'START'
    }
}) 
/* ---------------------------------------arrows---------------------- */


/* arrowUpElements.forEach((x) => {
    x.addEventListener("click", (e) => {
      const inputEl = x.parentElement.querySelector("input");
      inputEl.setAttribute("value", Number(inputEl.value) + 1);
    });
  });
  
  arrowDownElements.forEach((x) => {
    x.addEventListener("click", (e) => {
      const inputEl = x.parentElement.querySelector("input");
      inputEl.setAttribute("value", Number(inputEl.value) - 1);
    });
  }); */
