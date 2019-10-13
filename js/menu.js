import anime from './anime.min.js'
import {
    once,
    $,
    delay,
    trace,
    pipe,
    makeScrollListener
} from './utils.js'


export const menuArea = (elem) => {
    let active = false
    const menu = elem
    const body = document.body
    const links = [...document.querySelectorAll('.wg-main-nav .wg-nav-link')]

    const clickEvent = elms => (fn) => {
        const navLinks = elms
        navLinks.forEach(el => el.addEventListener('click', evt => {
            navLinks.forEach(e => e.classList.remove('is-active'))
            el.classList.add('is-active')
            fn(el)
        }))
    }

    return {
        isOpen: _ => active,
        Links: links,
        onLinkChange: clickEvent(links),
        show() {
            menu.style.visibility = 'visible'
            body.style.overflow = 'hidden'
            active = true
        },
        toggle() {
            active ? this.hide() : this.show()
        },
        hide() {
            menu.style.visibility = 'hidden'
            body.style = ''
            active = false
        }
    }
}

const animateList = (elms) => {
    const targets = elms

    const navLinks = anime({
        targets,
        opacity: 1,
        duration: 500,
        autoplay: false,
        translateX: '20%',
        easing: 'easeOutElastic',
        delay: function (el, i, l) {
            return i * 100;
        },
        endDelay: function (el, i, l) {
            return (l - i) * 100;
        }
    });

    return {
        play() {
            navLinks.play()
        },
        reset() {
            anime({
                targets,
                duration: 0,
                opacity: 0,
                translateX: '0',
            })
        },
    }
}

let isScrolling = false
export const yScroll = (() => {
    let cords = {
        x: 0,
        y: 0
    }

    const doAn = (offset, duration = 1000) => {
        const {
            pageYOffset: y,
            pageXOffset: x
        } = window
        cords = {
            x,
            y
        }
        if (!isScrolling) {
            isScrolling = true
            anime({
                targets: cords,
                y: Math.abs(offset.y + window.pageYOffset),
                x: offset.x + window.pageXOffset,
                easing: 'easeOutQuad',
                duration,
                update: () => window.scroll(cords.x, cords.y)
            }).finished.then(() => {
                isScrolling = false
            })
        }
    }

    return a => doAn(a)
})()

const activate = (elems, el, className = 'active') => {
    elems.forEach(element => {
        element === el ? el.classList.add(className) :
            element.classList.remove(className)
    })
}

const getOffset = () => {
    const {
        pageXOffset,
        pageYOffset
    } = window

    return {
        pageXOffset,
        pageYOffset
    }
}
const ScrollRemote = (el) => {
    const menuButton = el.querySelector('.menu-bar')
    const matchAttrib = 'data-wg-autoscroll'
    const navs = [...el.querySelectorAll('li')]
    let onNavClick = () => {}

    const findScrollElement = (element) => {
        const { x, y } = element.getBoundingClientRect()
        yScroll({ x, y })
    }

    const getReference = el => {
        const element = $(el.getAttribute(matchAttrib))
        if (element) return element
        throw Error('reference element doesn\'t exist')
    }

    const autoSwitch = () => {
        const offsetMaps = navs.map((el, index) => {
            const {
                x,
                y,
                height
            } = getReference(el).getBoundingClientRect()
            return [index, {
                x,
                y,
                height
            }]
        })

        const subscribeScroll = makeScrollListener();
        offsetMaps.forEach(([index, cord]) => {
            subscribeScroll(([top]) => {
                if ((top >= cord.y) && top <= (cord.y + cord.height)) {
                    activate(navs, navs[index])
                }
            });
        })
    }

    navs.forEach(el => {
        el.addEventListener('click', () => {
            findScrollElement(getReference(el))
        })
    })

    return {
        onMenuClick(fn) {
            menuButton.addEventListener('click', fn)
        },
        onIndexClick: (fn) => onNavClick = fn,
        autoSwitch
    }
}

const Blinder = () => {
    const blindElem = document.createElement('div')

    blindElem.classList.add('blinder')
    document.body.appendChild(blindElem);
    const blinder = anime({
        targets: blindElem,
        easing: 'easeOutQuad',
        right: [{
                value: 0
            },
            {
                value: 0,
                delay: 300
            },
            {
                value: '100%'
            }
        ],
        left: [{
                value: '100%'
            },
            {
                value: 0,
                delay: 300
            },
            {
                value: 0
            },
        ],
        duration: 800,
        autoplay: false,
    })
    blinder.finished.then(() => {
        blinder.reset()
    })

    return {
        el: blinder,
        open: () => blinder.play(),
        close: () => blinder.restart(),
    }
}


const toggleMenu = (Menu) => {
    const navList = animateList(Menu.Links)
    
    const {
        open,
        close,
        el: blinder
    } = Blinder();

    const closeMenu = el => {
        trace('closing menu')
        close() // closing blinder
        navList.reset() // hiding nav list
    }

    // open blinder
    if (trace(Menu.isOpen())) {
        closeMenu()
    } else {
        open()
        blinder.finished
            .then(delay(300))
            .then(_ => navList.play())
    }

    // toggles the menu
    const [toggle, resetOnce] = once(() => trace(Menu.toggle(), 'doing stuff'))
    blinder.update = (a) => {
        if (a.currentTime > (blinder.duration / 1.5)) {
            toggle()
        }
    }

    blinder.finished
        .then(() => blinder.reset())
        .then(() => resetOnce())

    Menu.onLinkChange(closeMenu)
}

export function activateScrollRemote(Menu) {
    const remote = ScrollRemote($('.scroll-remote'))
    remote.onMenuClick(() => toggleMenu(Menu))
    remote.onIndexClick((evt) => {
        trace('first click index on remote', evt)
    })
    remote.autoSwitch()
}