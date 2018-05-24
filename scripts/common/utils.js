export function debounce(fun, delay) {
    let timerId;

    return function wrapper(...args) {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            fun.apply(this, args);
        }, delay);
    };

}