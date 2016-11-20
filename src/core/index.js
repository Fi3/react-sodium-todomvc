import React from 'react';
import ReactDOM from 'react-dom';

export const curry = (fn) =>
{
    const arity = fn.length;
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
};

export const compose = (...fns) => (x) => fns.reverse().reduce((a, b) => b(a), x);

export const childrenMap = (props) =>
{
    return React.Children
        .map(props.children,
            (child => React.cloneElement(child, {props})));
};

export const join = (other) =>
{
    return other.join();
};

export const rLoop = curry(function rLoop(C, id)
{
    return (props) =>
    {
        ReactDOM.render(React.cloneElement(C, props), document.querySelector(id));
        return rLoop(C, id);
    }
});


export const renderAdapter = (B) =>
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
};

export const render = (A) => (B) =>
{
    return <A>{ renderAdapter(B) }</A>
};
