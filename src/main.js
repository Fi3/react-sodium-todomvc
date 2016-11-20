import TodoApp from './components/todo-app';

class TodoMVC
{
    todoApp;

    static main(id)
    {
        TodoMVC.todoApp = new TodoApp(id);
    }
}

TodoMVC.main("#app-1");


