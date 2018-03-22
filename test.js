'use strict';

const TESTS = 45;
const STSET = 10000;

// Recursive Big O time complexity of O(φn)
function fiboRec(index) {
    if (index < 2) {
        return index;
    } else {
        return fiboRec(index - 1) + fiboRec(index - 2);
    }
}

// Itterator
function fiboItt(n) {
    var a, b, c;
    if (n < 2)
        return n;
    for (a = 0, b = 1; n > 1; n--) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
};

function compute() {
    let x = 0, y = 1;
    let max = 10000 + Math.random() * 500;

    for (let i = 0; i <= max; i++) {
        let z = x + y;
        x = y;
        y = z;
    }
}

function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    };
    if (typeof step == 'undefined') {
        step = 1;
    };
    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    };
    return result;
};

function milliToSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}

function arrayHasOwnIndex(array, prop) {
    return array.hasOwnProperty(prop) && /^0$|^[1-9]\d*$/.test(prop) && prop <= 4294967294; // 2^32 - 2
}

module.exports.hello = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello World!'
        }),
    };

    callback(null, response);

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.compute = (event, context, callback) => {
    var start_time = new Date().getTime();

    for (context in range(STSET)) {
        if (arrayHasOwnIndex(range(STSET), context)) {
            console.log(context);
            compute();
        }
    }

    var duration = new Date().getTime() - start_time;

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Duration: ' + milliToSeconds(duration)
        }),
    };

    callback(null, response);

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.fibonacci = (event, context, callback) => {
    var start_time = new Date().getTime();

    for (context in range(TESTS)) {
        if (arrayHasOwnIndex(range(TESTS), context)) {
            console.log(context);
            fiboRec(context);
        }
    }

    var duration = new Date().getTime() - start_time;

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Duration: ' + milliToSeconds(duration)
        }),
    };

    console.log(duration);
    callback(null, response);
};
