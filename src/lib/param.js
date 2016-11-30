function params(a) {
    var s = [];

    function add(key, value) {
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    };
    // If an array was passed in, assume that it is an array
    // of form elements
    // Serialize the key/values
    for (var j in a)
        add(j, a[j]);
    // Return the resulting serialization
    return s.join("&").replace(/%20/g, "+");
}

function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function() {
        var now = _.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

export {params,throttle}
