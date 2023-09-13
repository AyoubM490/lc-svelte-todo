<script>
    import { fade, fly } from "svelte/transition";
    import { onDestroy } from "svelte";
    import { todos } from "./stores/TodosStore";
    // let todosValue;
    // const unsubscribe = todos.subscribe((value) => (todosValue = value));
    // onDestroy(unsubscribe);
    let currentFilter = "all";
    $: remainingTodos = $todos.filter((todo) => !todo.isComplete).length;
    $: filteredTodos =
        currentFilter === "all"
            ? $todos
            : currentFilter === "active"
                ? $todos.filter((todo) => !todo.isComplete)
                : $todos.filter((todo) => todo.isComplete);
    function checkAllTodos() {
        todos.update((todos) =>
            todos.map((todo) => {
                todo.isComplete = true;
                return todo;
            })
        );
    }
    function clearCompleted() {
        todos.update((todos) => todos.filter((todo) => !todo.isComplete));
    }
    function deleteTodo(id) {
        todos.update((todos) => todos.filter((todo) => todo.id !== id));
    }
    function updateFilter(filter) {
        currentFilter = filter;
    }
    let beforeEditCache = "";
    function editTodo(todo) {
        beforeEditCache = todo.title;
        todo.isEditing = true;
        todos.update((todos) => todos);
    }
    function doneEdit(todo) {
        if (todo.title.trim().length === 0) {
            todo.title = beforeEditCache;
        }
        todo.isEditing = false;
        todos.update((todos) => todos);
    }
    function doneEditKeydown(event, todo) {
        if (event.key === "Enter") {
            doneEdit(todo);
        }
        if (event.key === "Escape") {
            todo.title = beforeEditCache;
            doneEdit(todo);
        }
    }
</script>

<div>
    <ul class="todo-list">
        {#each filteredTodos as todo (todo.id)}
            <li
                    class="todo-item-container"
                    in:fly={{ x: 100, duration: 400 }}
                    out:fade={{ duration: 400 }}
            >
                <div class="todo-item">
                    <input type="checkbox" bind:checked={todo.isComplete} />
                    {#if !todo.isEditing}
            <span
                    on:dblclick={editTodo(todo)}
                    class="todo-item-label"
                    class:line-through={todo.isComplete}>{todo.title}</span
            >
                    {:else}
                        <input
                                type="text"
                                class="todo-item-input"
                                bind:value={todo.title}
                                on:blur={() => doneEdit(todo)}
                                on:keydown={(event) => doneEditKeydown(event, todo)}
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
        <!-- <span>{remainingTodos} items remaining</span> -->
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
                    on:click={() => updateFilter("all")}
                    class="button filter-button"
                    class:filter-button-active={currentFilter === "all"}
            >
                All
            </button>
            <button
                    on:click={() => updateFilter("active")}
                    class="button filter-button"
                    class:filter-button-active={currentFilter === "active"}>Active</button
            >
            <button
                    on:click={() => updateFilter("completed")}
                    class="button filter-button"
                    class:filter-button-active={currentFilter === "completed"}
            >Completed</button
            >
        </div>
        <div>
            <button class="button" on:click={clearCompleted}>Clear completed</button>
        </div>
    </div>
</div>