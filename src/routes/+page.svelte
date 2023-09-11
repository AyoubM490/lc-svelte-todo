<script>
    import "../css/reset.css";
    import "../css/style.css";
    import {fade, fly} from "svelte/transition";
    import NoTodosContainer from "../NoTodosContainer.svelte";
    import TodoForm from "../TodoForm.svelte";
    import TodoFormMiddle from "../TodoFormMiddle.svelte";

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

    function doneEditKeydown(event, todo) {
        if (event.key === 'Enter') {
            doneEdit(todo);
        }

        if (event.key === 'Escape') {
            todo.title = beforeEditCache;
            doneEdit(todo);
        }
    }
</script>

<div class="todo-app-container">
    <div class="todo-app">
        <h2>Todo App</h2>
        <TodoFormMiddle on:todoAdded={addTodo} />

        {#if todos.length > 0}
            <ul class="todo-list">
                {#each filteredTodos as todo (todo.id)}
                    <li class="todo-item-container" in:fly={{ x:100, duration: 200}} out:fade>
                        <div class="todo-item">
                            <input type="checkbox" bind:checked={todo.isComplete}/>
                            {#if !todo.isEditing}
                                <span
                                        role="button"
                                        tabindex="0"
                                        on:dblclick={editTodo(todo)}
                                        class="todo-item-label"
                                        class:line-through={todo.isComplete}
                                >{todo.title}</span>
                            {:else}
                                <input
                                        type="text"
                                        class="todo-item-input"
                                        bind:value={todo.title}
                                        on:blur={doneEdit(todo)}
                                        on:keydown={event => doneEditKeydown(event, todo)}
                                        autofocus
                                />
                            {/if}
                        </div>
                        <button class="x-button" on:click={deleteTodo(todo.id)}>
                            <svg
                                    class="x-button-icon"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                            >
                                <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </li>
                {/each}

            </ul>
            <div class="check-all-container">
                <div>
                    <button on:click={checkAllTodos} class="button">Check All</button>
                </div>

<!--                <span>{remainingTodos} items remaining</span>-->
                <div>
                    {#key remainingTodos}
                    <span style="display: inline-block" in:fly={{ y: -20 }}>
                        {remainingTodos}
                    </span>
                    {/key}
                    <span>items remaining</span>
                </div>
            </div>

            <div class="other-buttons-container">
                <div>
                    <button
                            on:click={() => currentFilter = 'all'}
                            class="button filter-button"
                            class:filter-button-active={currentFilter === 'all'}
                    >All
                    </button>
                    <button
                            on:click={() => currentFilter = 'active'}
                            class="button filter-button"
                            class:filter-button-active={currentFilter === 'active'}
                    >Active
                    </button>
                    <button
                            on:click={() => currentFilter = 'completed'}
                            class="button filter-button"
                            class:filter-button-active={currentFilter === 'completed'}
                    >Completed
                    </button>
                </div>
                <div>
                    <button on:click={clearCompleted} class="button">Clear completed</button>
                </div>
            </div>
        {:else }
            <NoTodosContainer />
        {/if}
    </div>
</div>