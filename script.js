//Navbar toggle system

let navlinks = document.querySelectorAll(`.navlinks`);
let menuBtnText = document.querySelector(`#menu-btn`);
let header = document.querySelector(`header`);

menuBtnText.classList.remove("bi-x-lg");
const textChange=()=>{
  if (menuBtnText.className === "bi-list") {
    menuBtnText.classList.add("bi-x-lg");
    menuBtnText.classList.remove("bi-list");
  } else if (menuBtnText.className === "bi-x-lg") {
    menuBtnText.classList.add("bi-list");
    menuBtnText.classList.remove("bi-x-lg");
  }
}
menuBtnText.addEventListener(`click`,()=>{
    for(let i = 0; i < navlinks.length ; i++){
        navlinks[i].classList.toggle(`active`);
        navlinks[i].classList.toggle(textChange());
    }
})

//smooth scrolling
const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true,
  smoothMobile: 0.3, 
  scrollFromAnywhere: true, 
  multiplier: 1.2, 
});

//mouse follower circle
var timer;
const mouseFollower=(xscale, yscale)=>{
  window.addEventListener(`mousemove`,(moving)=>{
  document.querySelector(`#minicircle`).style.transform = `translate(${moving.clientX}px, ${moving.clientY}px) scale(${xscale}, ${yscale})`;
  })
}
const mouseSize=()=>{
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener(`mousemove`,(details)=>{
    clearTimeout(timer);
 var xdiff = details.clientX - xprev ;
 var ydiff = details.clientY - yprev ;
  xprev = details.clientX;
  yprev = details.clientY;

 xscale = gsap.utils.clamp(.8, 1.2, xdiff);
 yscale = gsap.utils.clamp(.8, 1.2, ydiff);

 mouseFollower(xscale, yscale)
 timer = setTimeout(() => {
  document.querySelector(`#minicircle`).style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`
 }, 100);
  })
}
const textAnimation=()=>{
  let tl = gsap.timeline();

  tl.from(`nav`,{
    y: `-10`,
    opacity: 0,
    duration: 1.5,
    delay: -.5,
    ease: Expo.easeInOut
  })
  .to(`.textAnimation-text`,{
    y: 0,
    ease:Expo.easeInOut,
    duration: 1.5,
    delay: -.5,
    stagger: .1
  })
}

//Project show function
document.querySelectorAll(`.project`).forEach(function(elem){

  var rotate = 0;
  var diffrot = 0
  elem.addEventListener(`mouseleave`,function(details){
  var diff = details.clientY - elem.getBoundingClientRect().top;
  diffrot = details.clientX - rotate;
  rotate = details.clientX;
 
    gsap.to(elem.querySelector('img'), {
    opacity: 0,
    ease: Power3,
    duration: .5,
    }) 
  })
})


document.querySelectorAll(`.project`).forEach(function(elem){

  var rotate = 0;
  var diffrot = 0
  elem.addEventListener(`mousemove`,function(details){
  var diff = details.clientY - elem.getBoundingClientRect().top;
  diffrot = details.clientX - rotate;
  rotate = details.clientX;
 
    gsap.to(elem.querySelector('img'), {
    opacity: 1,
    ease: Power3,
    top:diff,
    left: details.clientX,
    rotate:  gsap.utils.clamp(-20, 20, diffrot*0.5),
    }) 
  })
})

textAnimation();
mouseFollower();
mouseSize();




