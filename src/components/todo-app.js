import {Transaction, CellLoop, Cell} from 'sodiumjs';
import {rLoop} from '../core';

import Page from './page';

import {
    Header,
    ToggleAll,
    TodoList,
    Footer
} from './content/index';

class TodoApp
{
    topSection;
    todoList;
    reactUpdate;

    static addTodo(todo, acc)
    {
        acc.push(todo);
        return acc;
    }

    static removeTodo(index, acc)
    {
        acc.splice(index, 1);
        return acc;
    }

    static completeTodo(index, acc)
    {
        acc[index].done = !acc[index].done;
        return acc;
    }

    constructor(id)
    {
        Transaction.run(() =>
        {
            /* *-- Loop Start *--->  */
            const value = new CellLoop();

            this.topSection = new Header();
            this.todoList = new TodoList(value);

            const sAdd = this.topSection.sSubmit.map(v => ({name: v, done: false}));
            const sRemove = this.todoList.sRemoveStream.map(i => i);
            const sComplete = this.todoList.sCompleteStream.map(i => i);

            /* Accumulators */
            const sAddTodo = sAdd.snapshot(value, TodoApp.addTodo);
            const sRemoveTodo = sRemove.snapshot(value, TodoApp.removeTodo);
            const sCompleteTodo = sComplete.snapshot(value, TodoApp.completeTodo);

            /* Stream merge (flatmap) */
            const sDelta = sAddTodo
                .orElse(sRemoveTodo)
                .orElse(sCompleteTodo);

            value.loop(sDelta.hold([]));
            /* ----> Loop End <---- */

            this.reactUpdate = rLoop(
                Page([
                    this.topSection.render,
                    this.todoList.render,
                    ToggleAll,
                    Footer
                ]), id)
                ({todos: value.sample()}); /* <--- Initial App state sampled */

            /* Actual React props update  */
            this.todoList.sTodoList.listen(todos => this.reactUpdate({todos}));
        });

    }
}


export default TodoApp;