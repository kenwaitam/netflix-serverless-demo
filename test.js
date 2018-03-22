'use strict';

const TESTS = 45;

// Recursive Big O time complexity of O(φn)
function fibonacci(index) {
    if (index < 2) {
        return index;
    } else {
        return fibonacci(index - 1) + fibonacci(index - 2);
    }
}

// Itterator
function fib(n) {
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

function arrayHasOwnIndex(array, prop) {
    return array.hasOwnProperty(prop) && /^0$|^[1-9]\d*$/.test(prop) && prop <= 4294967294; // 2^32 - 2
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

module.exports.hello = (event, context, callback) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!'
      }),
    };
  
    callback(null, response);
  
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
  };
  

module.exports.helloHandler = (event, context, callback) => {
    var start_time = new Date().getTime();

    for (context in range(TESTS)) {
        if (arrayHasOwnIndex(range(TESTS), context)) {
            fibonacci(context);
            console.log(context);
        }
    }

    var duration = new Date().getTime() - start_time;

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Duration: ' + duration / TESTS
        }),
    };

    console.log(duration / TESTS);
    callback(null, response);
};
