export const $ = (e, el) => (el || document).querySelector(e)

export const delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time));


export const trace = (e, a = (void 0)) => {
    console.info(e, a)
    return e;
}

export const log = trace;

// makes scroll listener
/* Usuage: 
    subscribeScroll = makeScrollListener()
    subscribeScroll(([top, left]) => {
        console.log(top, left);
    })
*/
export const makeScrollListener = () => {
    const listeners = [];
    window.addEventListener('scroll', (event) => {
        listeners
            .filter(e => typeof e === 'function')
            .map(e => e([window.scrollY, window.scrollX]));
    })

    return (fire) => {
        listeners.push(fire)
        console.log(listeners, 'Listeners');
    }
}

export const once = (fn) => {
    let x = 0
    return [() => {
        x == 0 && fn()
        x++
    }, () => x = 0]
}

export const pipe = function () {
    var args = arguments;
    var start = args.length - 1;
    return function () {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) result = args[i].call(this, result);
        return result;
    };
};