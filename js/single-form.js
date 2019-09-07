import { delay } from './utils'

const Identity = (x) => {
    return {
        map: (fun) => {
            return Identity(fun(x))
        },
        delay: async (duration) => {
            await delay(duration)();
            return Identity(x)
        },
        bounceOut: () => {
            x.style.left = 0;
            return Identity(x);
        }
    }
}

const IconAnimation = Object.freeze({
    hide: (el) => {
        el.style.visibility = "hidden"
        return el;
    },
    bounceOut: (el) => {
        el.style.left = 0;
        el.style.opacity = 1;
        return el;
    },
    slideRight: (offset) => (el) => {
        el.style.transform = `translateX(${offset}px) rotateY(180deg)`;
        el.style.opacity = 0;
        return el;
    }
});

const IconHolder = () => {
    let left = 0;
    const holder = document.querySelector('.wg-ss__icon_holder');
    let icons = [].slice.call(holder.children).map(x => Identity(x));

    return {
        init() {
            icons.map((e, index) => {
                e.map((x) => {
                    x.style.left = `${left}px`
                    if (index > 0) {
                        x.style.borderColor = `#FFFFFF`
                        x.style.opacity = '0.1'
                    }
                    left += 5;
                });
                return e;
            }).reverse().map((e, index) => {
                e.map(x => {
                    x.style.zIndex = index
                })
            });
        },
        fetchIcon(index) {
            if (typeof index === 'number') {
                return icons[+index];
            } else {
                throw Error('invalid index arguemnt, excepted a Number got ' + typeof index)
            }
        }
    }
}

function FormError(message, code) {
    this.message = message
    this.code = code
    this.name = "Form Error"
}

const fakeFields = {
    "full name": {
        value: '',
        regexp: /.+/
    },
    email: {
        value: '',
        regexp: /^.+@.+\..+$/
    },
    password: {
        value: '',
        regexp: /[A-z0-9_-]+/
    },
};

const SS = (obj) => {
    const ssInput = document.querySelector('.wg-ss__input'),
        span = document.querySelector('#enter'),
        input = document.createElement('input');
        icon = ssInput.querySelector('.wg-ss__icon'),
        label = ssInput.querySelector('.wg-ss__text_holder > label'),
        submitButton = ssInput.querySelector('.wg-ss__submit'),
        iconHolder = IconHolder(),
        fields = obj || fakeFields
    
    let counter = 0;
    const EVENTS = {};
    const getOffset = () => Math.abs(ssInput.clientWidth);
    const current = () => Object.keys(fields)[counter];
    const getRegExp = () => {
        const input = fields[current()];
        return input.regexp.test(input.value);
    }
    const isFinished = () => counter > (Object.keys(fields).length - 1);
    const changeLabel = () => label.innerText = current();
    const hideLabel = () => label.style.display = 'none';
    const makeDots = () => '<span class="dots"></span>';
    const updateWidth = (width) => {
        let holder = document.querySelector('.wg-ss__text_holder');
        ssInput.style.width = typeof width !== 'undefined' ? width : `${(holder.clientWidth + 100)}px`;
    }

    const shakeButton = () => {
        ssInput.classList.add('wiggle')
        submitButton.classList.add('shake')

        setTimeout(() => {
            ssInput.classList.remove('wiggle')
            submitButton.classList.remove('shake');
        }, 600);
    }

    const animateCurrentIcon = () => {
        iconHolder
            .fetchIcon(counter)
            .map(IconAnimation.slideRight(getOffset()))
            .delay(1000).then((icon) => {
                icon.map(IconAnimation.hide).delay(300)
                    .then(icon => icon.map(resizeInput))
            });
    }
    const animateNexIcon = () => {
        const next = counter
        isFinished() ||
            iconHolder.fetchIcon(next).delay(300)
            .then(icon => icon.map(IconAnimation.bounceOut));
    }

    const submit = () => {
        if (!isFinished()) {
            animateCurrentIcon();
            (counter += 1)
            animateNexIcon();
        }
        if (isFinished())
            throw new FormError('Field fields Finished!', 54);
    }

    const resizeInput = () => {
        updateWidth();
        Promise.resolve().then(delay(1000))
            .then(() => updateWidth('auto'))
    }

    const clearText = () => {
        input.value = ""
        span.innerText = ""
    }
    const playFinalAnimation = () => {
        clearText();
        resizeInput();
        hideLabel();
    }

    return {
        init() {
            changeLabel();
            iconHolder.init();
            ssInput.appendChild(input);

            ssInput.addEventListener('click', this.focusIn.bind(this));
            submitButton.addEventListener('click', this.send.bind(this));
            input.addEventListener('blur', () => ssInput.classList.remove('focused'))
            window.requestAnimationFrame(this.typeIn)
            return this;
        },
        focusIn() {
            input.focus();
            ssInput.classList.add('focused');
            input.addEventListener('keyup', this.typeIn.bind(this));
        },
        typeIn(event) {
            if (event.keyCode === 13) {
                this.send.bind(this)()
                return;
            }
            const currentField = fields[current()];

            if (current() === 'password') {
                currentField.value = [].slice.call(input.value).join('');
                span.innerHTML = currentField.value.split("").map(makeDots).join('');
            } else {
                span.innerHTML = currentField.value = [].slice.call(input.value).join('').replace(' ', '&nbsp;');
            }
            updateWidth()
        },
        send() {
            (isFinished()) ||
            this.validate()
                .then(submit)
                .then(delay(120))
                .then(changeLabel)
                .then(clearText)
                .catch(err => {
                    if (err.code === 54) {
                        this.destruct();
                    } else {
                        shakeButton();
                    }
                    this.fireEvent('error', err);
                });
        },
        async validate() {
            if (getRegExp()) return "";
            throw Error('Validation Failed for field: ' + current());
        },
        on(action, callback) {
            EVENTS[action] = callback;
            return this;
        },
        fireEvent(eventname, ...args) {
            if (Object.keys(EVENTS).includes(eventname))
                switch (eventname) {
                    case "complete":
                        args = [fields];
                    default:
                        EVENTS[eventname].apply(this, [...args]);
                }
        },
        destruct() {
            Promise.resolve().then(playFinalAnimation).then(delay(300))
                .then(() => {
                    ssInput.classList.remove('focused');
                    ssInput.classList.add('finished')
                });
            ssInput.removeEventListener('click', this.focusIn.bind(this))
            submitButton.removeEventListener('click', this.send.bind(this))
            input.outerHTML = ""
            submitButton.outerHTML = ""
            this.fireEvent('complete');
        }
    }
}

export default SS;