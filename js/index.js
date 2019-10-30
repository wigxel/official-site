import anime from './anime.min.js'
import carousel from './carousel';
import proto from './proto'
import {
    menuArea,
    yScroll,
    activateScrollRemote
} from './menu.js'
import SS from './single-form'
import { $, delay, trace } from './utils'

carousel();
proto()

const Menu = menuArea($('.menu-area'))
Menu.hide()

const animateText = (words, el, divider = ' ') => {
    const playWord = spanEl => {
        if (spanEl.animating) return
        spanEl.classList.add('fx-effect')
        spanEl.animating = true
    }
    const sentence = (el) => {
        el.classList.add('type-phrase')
        return el
    }
    const wrapElem = (tag, classname, content) => {
        const span = document.createElement(tag)
        span.classList.add(classname)
        if (typeof content === 'string') {
            span.innerHTML = content
        }
        return span
    }
    const word = (word) => {
        const span = wrapElem('span', 'type-word');
        [...word].map(e => span.appendChild(char(e)))
        return span
    }
    const char = (char) => {
        const spaceIfEmpty = char === ' ' ? '&nbsp;' : char
        return wrapElem('span', 'type-char', spaceIfEmpty)
    }

    words.split(divider).forEach((wrd) => {
        sentence(el).appendChild(word(wrd))
    })

    const playSentence = (el) => () => {
        [...el.children]
        .forEach((elem, i) => setTimeout(() => playWord(elem), i * 200))
    }

    return playSentence(el)
}

// on load
window.addEventListener('load', () => {
    activateCursor()
    activateScrollRemote(Menu)
    makeWibble()

    // PARALLAX
    const parallaxItems = handleParallax()
    window.addEventListener('scroll', event => {
        parallaxItems()
    })

    // INTRODUCTION VIDEO
    const film = [
        // $('[u-visible]').extContent, 
        ['We<<Inspire.', $('.typeface-large')],
        ['UI • Ux<<Design<<Frontend.', $('.typeface-large').parentElement],
    ].map(([text, contain])=> {
       return animateText(text, contain, '<<')
    })

    const ti = anime.timeline({
        duration: 700,
        easing: 'easeOutExpo',
    })

    const hAnimation = ti.add({
             targets: '.stretch-out',
             width: 'calc(100vw - 50px)',
             height: 'calc(100vh - 50px)',
             boxShadow: '0 18px 23px 6px rgba(0, 0, 0, 0.54)'
         })
         .add({
             targets: '.single-line',
             top: 50,
             easing: 'easeOutElastic(1, .5)',
         }, '-=500')
         .add({
             targets: '.circle',
             width: 50,
             height: 50,
         }, '-=700')
    ti.finished
        .then(delay(1000))
        .then(() => film.reverse().forEach((e, i)=> setTimeout(e, i * 1000)))

    // forms
    // SS({
    //     "full name": {
    //         value: '',
    //         regexp: /.+/
    //     },
    //     email: {
    //         value: '',
    //         regexp: /^.+@.+\..+$/
    //     },
    // }).init()
    //     .on('error', function (err) {
    //         console.log(err)
    //     })
    //     .on('complete', (payload) =>
    //         console.log(payload));
})

// on scroll 
window.yScroll = yScroll

function handleParallax() {
    trace(' Call Test')
    const THRESHOLD = 'js-para-thres'
    const DIRECTION = 'js-para-direct'
    const elems = document.querySelectorAll('[js-para-thres]')
    const inScope = el => () => {
        const scrollPosition = (window.scrollY + window.innerHeight)
        return el.offsetTop < (scrollPosition) &&
            (el.offsetTop + el.offsetHeight + (window.innerHeight * 0.7)) > window.scrollY
    }
    const getProps = el => ({
        isSetup: false,
        threshold: +el.getAttribute(THRESHOLD),
        direction: el.getAttribute(DIRECTION),
        inScope: inScope(el),
        move() {
            let scrollTop = (window.scrollY * this.threshold) + 'px'
            if (this.direction === 'up') scrollTop = `-${scrollTop}`

            el.style.transform = `translate(0, ${scrollTop})`
        },
    })

    return () => {
        elems.forEach(e => {
            const props = getProps(e)
            if (!props.isSetup) {
                e.style.willChange = 'top, left'
                e.style.transition = 'none'
                props.isSetup = true
            }
    
            if (props.inScope())
                requestAnimationFrame(() => props.move())
        })
    }
}

const pageStates = {
    menu: false,
}


function scrollTo({
    x,
    y
}, duration = 1000) {
    const cords = {
        x: window.scrollX,
        y: window.scrollY
    }

    anime({
        targets: cords,
        x,
        y,
        easing: 'easeInElastic',
        duration,
        update(cord) {
            window.scroll(0, cords.y)
        }
    })
}


// make menu SVG wibble 
function makeWibble() {
    return anime({
        targets: document.querySelector('#blue-wibble'),
        d: [{
                value: 'M2793.969,59.132c-12.073,45.1,19.635,90.114,59.662,104.884,46.49,17.154,107.379-20.956,107.022,49.107s-3.645,85.823,35.156,84.564,141.475-61.931,134.4-6.928c-19.375,146.134,61.406,101.685,100.954,88.594.085.086.824-319.687.824-319.687S2794.354,59.1,2793.969,59.132Z'
            },
            {
                value: 'M2793.969,59.132c-38.989,29.7-27.882,60.293,0,77.291,56.255,30.35,103.466,63.9,103.109,133.967s71.529,41.242,92.706,36.276,76-27.671,99.944,7.066c28.71,65.825,101.892,78.712,141.44,65.621.085.086.824-319.687.824-319.687S2794.354,59.1,2793.969,59.132Z'
            },
        ],
        delay: 300,
        loop: true,
        duration: 1000,
        // direction: 'alternate',
        easing: 'linear'
    })
}

// for cursor
function activateCursor() {
    const cursor = new (BuildCursor())(document.querySelector('.cursor-container'))
    const otherLinks = document.querySelectorAll('.scroll-remote li, .scroll-remote .menubar')
    const navs = [...otherLinks, ...document.querySelectorAll('a')]

    window.cursor = cursor

    navs.forEach((link) => {
        link.addEventListener('mouseenter', () => cursor.enter());
        link.addEventListener('mouseleave', () => cursor.leave());
    });

    window.addEventListener('mousedown', () => cursor.click())
}



const BuildCursor = () => {
    const calcWinsize = () => ({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
        }
        return {
            x: posx,
            y: posy
        }
    };
    const MathUtils = {
        lineEq: (y2, y1, x2, x1, currentVal) => {
            // y = mx + b 
            var m = (y2 - y1) / (x2 - x1),
                b = y1 - m * x1;
            return m * currentVal + b;
        },
        lerp: (a, b, n) => (1 - n) * a + n * b,
        getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2)
    };

    let winsize = calcWinsize();
    let mousepos = {
        x: winsize.width / 2,
        y: winsize.height / 2
    };
    
    window.addEventListener('resize', () => winsize = calcWinsize());
    window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));
    // Custom cursor
    return class Cursor {
        constructor(el) {
            this.DOM = {
                el: el
            };
            this.DOM.circle = this.DOM.el.querySelector('.cursor__inner--circle');
            this.DOM.arrows = {
                right: this.DOM.el.querySelector('.cursor__side--right'),
                left: this.DOM.el.querySelector('.cursor__side--left')
            };
            this.bounds = this.DOM.circle.getBoundingClientRect();
            this.lastMousePos = {
                x: 0,
                y: 0
            };
            this.scale = 1;
            this.lastScale = 1;
            requestAnimationFrame(() => this.render());
        }
        render() {
            this.lastMousePos.x = MathUtils.lerp(this.lastMousePos.x, mousepos.x - this.bounds.width / 2, 0.2);
            this.lastMousePos.y = MathUtils.lerp(this.lastMousePos.y, mousepos.y - this.bounds.height / 2, 0.2);
            this.lastScale = MathUtils.lerp(this.lastScale, this.scale, 0.15);
            this.DOM.circle.style.transform = `translateX(${(this.lastMousePos.x)}px) translateY(${this.lastMousePos.y}px) scale(${this.lastScale})`;
            requestAnimationFrame(() => this.render());
        }
        enter() {
            this.scale = 1.9;
            this.DOM.circle.classList.add('clickable')
        }
        leave() {
            this.scale = 1;
            this.DOM.circle.classList.remove('clickable')
        }
        click() {
            this.lastScale = .4;
        }
        showArrows() {
            TweenMax.to(Object.values(this.DOM.arrows), 1, {
                ease: Expo.easeOut,
                startAt: {
                    x: i => i ? 10 : -10
                },
                opacity: 1,
                x: 0
            });
        }
        hideArrows() {
            TweenMax.to(Object.values(this.DOM.arrows), 1, {
                ease: Expo.easeOut,
                x: i => i ? 10 : -10,
                opacity: 0
            });
        }
    }
}
