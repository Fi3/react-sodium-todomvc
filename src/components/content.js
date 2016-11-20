import React from 'react';
import {StreamSink, Transaction, Operational} from 'sodiumjs';
import {Left, Right} from '../either';

export class ContentA {

    text;
    sSubmit;
    onEnter;

    constructor()
    {
        const sUserChangesSnk = new StreamSink();

        this.sSubmit = sUserChangesSnk
            .filter(v => v);

        this.onEnter = (event) =>
        {
            const keyPress = event.charCode !== 13
                ? Left.of(null)
                : Right.of(event.target.value);

            keyPress.map((val) =>
                sUserChangesSnk.send(event.target.value));
        }
    }

    render = (props) =>
    {
        return (<header className="header">
            <h1>todos</h1>
            <input onKeyPress={this.onEnter}
                   className="new-todo" placeholder="What needs to be done?"/>
        </header>)
    }
}

export const ContentB = (props) =>
{
    return <section className="main">
        <input className="toggle-all" type="checkbox"/>
    </section>;

};


export class TodoList {

    sTodoList;
    sRemoveStream;

    constructor(todoList)
    {
        this.sTodoList = todoList;

        const sStreamSnk = new StreamSink();
        this.sRemoveStream = sStreamSnk;
        this.sCompleteStream = new StreamSink();

        this.removeTodo = (index) => () =>
        {
            sStreamSnk.send(index);
        };

        this.completeTodo = (index) => () =>
        {
            this.sCompleteStream.send(index);
        };

    }

    render = ({props: {todos}}) =>
    {
        return (
            <ul className="todo-list">
                {todos.length ?
                    todos.map((todo, index) =>
                    {
                        return <li key={index} className={todo.done ? "completed" : ""}>
                            <div className="view">
                                <input onClick={this.completeTodo(index)} className="toggle" type="checkbox"/>
                                <label >{todo.name}</label>
                                <button onClick={this.removeTodo(index)}
                                        className="destroy"></button>
                            </div>
                            <input className="edit"/>
                        </li>;
                    }) : null}
            </ul>);
    }
}

export const ContentC = (props) =>
{
    return <footer></footer>;
};