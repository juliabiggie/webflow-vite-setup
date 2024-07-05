console.log('Welcome to Vite + JS + Webflow!')

import './styles/style.css'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Register the GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

alert('Welcome to Vite + JS + Webflow!')

// Initialize ScrollSmoother
ScrollSmoother.create({
  wrapper: '.sticky-split_wrap',
  content: '.sticky-split_contain',
  smooth: 1,
  smoothTouch: 0.1,
})

let typeSplit

// Split the text into lines and words
function runSplit() {
  typeSplit = new SplitText('.split-lines', {
    types: 'lines, words',
  })

  // Add a mask to each line
  document.querySelectorAll('.split-lines > div').forEach((line) => {
    if (!line.querySelector('.line-mask')) {
      line.classList.add('line')
      const mask = document.createElement('div')
      mask.classList.add('line-mask')
      line.appendChild(mask)
    }
  })

  createAnimation()
}

runSplit()

// Update on window resize
let windowWidth = window.innerWidth
window.addEventListener('resize', () => {
  if (windowWidth !== window.innerWidth) {
    windowWidth = window.innerWidth
    typeSplit.revert()
    runSplit()
  }
})

function createAnimation() {
  document.querySelectorAll('.line').forEach((line) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: line,
        // trigger element - viewport
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    })

    tl.to(line.querySelector('.line-mask'), {
      width: '0%',
      duration: 1,
    })
  })
}

///////////////////////////////////////////////
// let split = new SplitText('.split-lines', {
//   type: 'words, lines',
// })

// split.split()

// gsap.from(split.words, {
//   opacity: 0.1,
//   stagger: 1,
// })

// ScrollTrigger.create({
//   trigger: '.split_contain',
//   start: 'top top',
//   end: 'bottom bottom',
//   scrub: true,
//   pin: '.content-section',
//   animation: gsap.from(split.words, {
//     opacity: 0,
//     stagger: 1,
//   }),
// })
