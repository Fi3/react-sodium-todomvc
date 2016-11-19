import React from 'react';

import Todo from './components/todo';
import {rLoop} from './core';

export default class TodoApp {

    static Component = rLoop(Todo, '#app-1');

    static main(initState = {id: 10})
    {
        TodoApp.Component(initState);
        //rLoop(new Todo());
    }
}

// const App = Component.of(Home)
//     .concat(Home)
//     .concat(ContentA)
//     .concat(ContentB)
//     .concat(ContentC);
//
// const HomePage = compose(render(Page), join)(App);
// const renderApp = Component.of(rLoop)
//     .ap(Component.of(HomePage))
//     .ap(Component.of('#app-2'))
//     .ap(Component.of({id: 10}));


