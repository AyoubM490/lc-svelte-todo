<script>
    import "../css/reset.css";
    import "../css/style.css";
    import {todos} from "../stores/TodosStore.js";
    import TodoFormMiddle from "../TodoFormMiddle.svelte";
    import TodoList from "../TodoList.svelte";
    import NoTodosContainer from "../NoTodosContainer.svelte";
</script>

<div class="todo-app-container">
    <div class="todo-app">
        <h2>Todo App</h2>
        <TodoFormMiddle />

        {#if $todos.length > 0}
            <TodoList />
        {:else}
            <NoTodosContainer />
        {/if}
    </div>
</div>