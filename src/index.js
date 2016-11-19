import React from 'react';
import Component from './component';
import Tick from './tick';

import {childrenMap, compose, render, rLoop, join} from './core';

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


