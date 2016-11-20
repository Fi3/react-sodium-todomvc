function identity(e) { return e;}

export class Either
{
    map(f)
    {
        return this instanceof Left ? Left.of(this.__value) : Right.of(f(this.__value));
    }

    static fromNone(x)
    {
        return x === null || typeof x === 'undefined' ? Left.of(x) : Right.of(x);
    }

    static or(f, g, e)
    {
        switch(e.constructor)
        {
            case Left:
                return f(e.__value);
            case Right:
                return g(e.__value);
        }
    }

    orElse(g)
    {
        return Either.or(g, identity, this);
    }

}


export class Left extends Either
{
    constructor(x)
    {
        super();
        this.__value = x;
    }

    static of(x)
    {
        return new Left(x);
    }

}

export class Right extends Either
{
    constructor(x)
    {
        super();
        this.__value = x;
    }

    static of(x)
    {
        return new Right(x);
    }

}
