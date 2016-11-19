import {curry, compose} from '../core';

function Tick(x)
{
    this.__value = x;
}

Tick.of = function (x)
{
    return new Tick(x);
};

Tick.prototype.map = function (f)
{
    return new Tick(compose(this.__value, f));
};

Tick.prototype.every = curry(function (ms)
{
    var interval = () => setInterval(this.__value, ms);
    return new Tick(interval);
});

Tick.prototype.fork = function () { /* fork */ };

Tick.every = function () { /* simple */ };

export default Tick;