import React from 'react';
import {StreamSink} from 'sodiumjs';

export default class TodoList
{
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