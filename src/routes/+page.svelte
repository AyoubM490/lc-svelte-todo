<script>
    import "../css/reset.css";
    import "../css/style.css";
    import {fade, fly} from "svelte/transition";
    import NoTodosContainer from "../NoTodosContainer.svelte";
    import TodoForm from "../TodoForm.svelte";
    import TodoFormMiddle from "../TodoFormMiddle.svelte";
    import TodoList from "../TodoList.svelte";

    let todoId = 4;
    let currentFilter = 'all';
    let todos = [
        {
            id: 1,
            title: 'Finish Svelte screencast',
            isComplete: false,
            isEditing: false,
        },
        {
            id: 2,
            title: 'Go shopping',
            isComplete: true,
            isEditing: false,
        },
        {
            id: 3,
            title: 'Take over world',
            isComplete: false,
            isEditing: false,
        },
    ];

    $: remainingTodos = todos.filter(todo => !todo.isComplete).length;

    $: filteredTodos = currentFilter === 'all' ? todos : currentFilter === 'active' ? todos.filter(todo => !todo.isComplete) : todos.filter(todo => todo.isComplete);

    function addTodo(event) {
        todos = [
            ...todos,
            {
                id: todoId,
                title: event.detail.todoTitle,
                isComplete: false,
                isEditing: false,
            }
        ];

        todoId++
    }

    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id)
    }

    function checkAllTodos() {
        todos = todos.map(todo => {
            todo.isComplete = true
            return todo;
        })
    }

    function clearCompleted() {
        todos = todos.filter(todo => !todo.isComplete)
    }


    let beforeEditCache = '';

    function editTodo(todo) {
        beforeEditCache = todo.title;
        todo.isEditing = true;
        todos = todos;
    }

    function doneEdit(todo) {
        if (todo.title.trim().length === 0) {
            todo.title = beforeEditCache;
        }

        todo.isEditing = false;

        todos = todos
    }

    function doneEditKeydown(key, todo) {
        if (key === 'Enter') {
            doneEdit(todo);
        }

        if (key === 'Escape') {
            todo.title = beforeEditCache;
            doneEdit(todo);
        }
    }

    function updateFilter(filter) {
        currentFilter = filter;
    }
</script>

<div class="todo-app-container">
    <div class="todo-app">
        <h2>Todo App</h2>
        <TodoFormMiddle on:todoAdded={addTodo}/>

        {#if todos.length > 0}
            <TodoList
                    {filteredTodos}
                    {remainingTodos}
                    {currentFilter}
                    on:checkAllTodosDispatched={checkAllTodos}
                    on:clearCompletedDispatched={clearCompleted}
                    on:deleteTodoDispatched={(event) => deleteTodo(event.detail.id)}
                    on:updateFilterDispatched={(event) => updateFilter(event.detail.filter)}
                    on:editTodoDispatched={(event) => editTodo(event.detail.todo)}
                    on:doneEditDispatched={(event) => doneEdit(event.detail.todo)}
                    on:doneEditKeydownDispatched={(event) => doneEditKeydown(event.detail.key, event.detail.todo)}
            />
        {:else }
            <NoTodosContainer/>
        {/if}
    </div>
</div>