// if i click on the next/prev button it moves the slide
// to a certain index
const proto = () => {
    const log = (e, msg) => {
    console.log(msg, e);
    return e;
    };
    const toggle = document.querySelector(".dot-holder");

    const getSlideWidth = () => {
        const elem = document.querySelector(".project-pos")
        return elem.clientWidth;
    }

    function setupWidth() {
        Array.from(document.querySelectorAll('.project-pos figure'))
            .forEach((el) => {
                el.style.width = getSlideWidth() + 'px';
            })
    }

    function moveSlide(index) {
        // by translateX the parents
        const pos = index * log(getSlideWidth(), 'The Slide Width');
        const declaration = `translateX(-${pos}px)`
        
        slider.style.transform = declaration;
        [...slider.children].forEach(child => {
            child.classList.remove('active');
        })
        slider.children[index].classList.add('active');
    }

    const projectSlideHolder = document.querySelector(".details-slide-holder");
    const slideInfo = (index) => {
        const infoPos = projectSlideHolder.children[index].offsetTop + 10;
        const infoTranslate = `translateY(-${infoPos}px)`;

        projectSlideHolder.style.transform = infoTranslate;
        [...projectSlideHolder.children].forEach(child => {
            child.classList.remove('active');
        })
        
        projectSlideHolder.children[index].classList.add('active');
    }

    const moveDots = (index) => {
        [...toggle.children].forEach(child => {
        child.classList.remove("active");
        });
        toggle.children[index].classList.add("active");
    }

    const slideTo = index => {
    moveSlide(num);
    moveDots(num);
    slideInfo(num);
    };


    let num = 0;

    // const getSlideNum = () => (slider.children.length - 1);
    const getSlideNum = () => (projectSlideHolder.children.length)

    function increment (i) {
        num += 1
        if (num < (getSlideNum())) {
            slideTo(num)
            // console.log(num)
        } else {
            num = getSlideNum()-1
        }
    }

    function decrement (i) {
        num -= 1 
        if (num >= 0) {
            slideTo(num)
            // console.log(num)
        } else {
            num = 0;
        }
    }

    const activateToggle = (i) => {
        if (i <= projectSlideHolder.children.length - 1) {
            moveSlide(i);
            num = i;
        }
    }

    // Automate slide
    let k = 0
    setInterval(() => {
        if (k == projectSlideHolder.children.length - 1) {
            k = 0
            // moveSlide(k)
            
        } else {
            k++
            // moveSlide(k)
        }
    }, 3000);
}

export default proto