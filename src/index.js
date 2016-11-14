import React from 'react';
import ReactDOM from 'react-dom';

const Rfly = {
    curry,
    childrenMap,
    renderAdapter,
    render,
    rLoop
};

function curry(fn)
{
    var arity = fn.length;
    return getArgs([]);

    function getArgs(totalArgs)
    {
        return function stepTwo()
        {
            var nextTotalArgs = totalArgs.concat([].slice.call(arguments, 0));
            if (nextTotalArgs.length >= arity)
                return fn.apply(this, nextTotalArgs);
            else
                return getArgs(nextTotalArgs);
        }
    }
}


function childrenMap(props)
{
    return React.Children
        .map(props.children,
            (child => React.cloneElement(child, {id: 555})));
}


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

const join = function join(other)
{
    return other.join();
};

Component.prototype.ap = function (other)
{
    return other.map(this.__value);
};


Component.prototype.join = function ()
{
    return this.__value;
};

const ContentA = (props) =>
{
    return <p>Widget A</p>;
};

const ContentB = (props) =>
{
    return <p>Widget B</p>;
};

const ContentC = (props) =>
{
    return <p>Widget C</p>;
};

class Page extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return <div>
            <h1>A Page</h1>
            {childrenMap(this.props)}
        </div>;
    }
}

class Home extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return <div>
            {childrenMap(this.props)}
        </div>;
    }
}

// Should be Curried
const rLoop = curry(function rLoop(C, id)
{
    return (props) =>
    {
        ReactDOM.render(React.cloneElement(C, {props}), document.querySelector(id));
        return rLoop(C, id);
    }
});


function renderAdapter(B)
{
    switch ({}.toString.call(B))
    {
        case '[object Function]':
            return <B />;
        case '[object Object]':
            return B;
        case '[object Array]':
            return B.map(C => <C key={Math.random()}/>);
    }
}

const render = (A) => (B) =>
{
    return <A>{ renderAdapter(B) }</A>
};
const compose = (...fns) => (x) => fns.reverse().reduce((a, b) => b(a), x);
const compSeq = compose(render(Page), render(Home))([ContentA, ContentB, ContentC]);
const AppUpdate = rLoop(compSeq, '#app-1');
      AppUpdate({id: 10});

const App = Component.of(Home)
    .concat(Home)
    .concat(ContentA)
    .concat(ContentB)
    .concat(ContentC);

const HomePage = compose(render(Page), join)(App);
const renderApp = Component.of(rLoop)
    .ap(Component.of(HomePage))
    .ap(Component.of('#app-2'))
    .ap(Component.of({id: 10}));









