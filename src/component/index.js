function Component(x)
{
    this.__value = x;
}

Component.of = function (x)
{
    return new Component(x);
};

Component.prototype.empty = function ()
{
    return new Component(null);
};

function flatten(seq)
{
    return seq.reduce(function flat(a, b)
    {
        if ({}.toString.call(b) === '[object Array]') return b.reduce(flat, a);
        a.push(b);
        return a;
    }, []);
}

Component.prototype.concat = function (other)
{

    return new Component(flatten([this.__value].concat(other)));
};

Component.prototype.map = function (f)
{
    return new Component(f(this.__value));
};

Component.prototype.ap = function (other)
{
    return other.map(this.__value);
};

Component.prototype.join = function ()
{
    return this.__value;
};

export default Component;