<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    let todoTitle = "";
    function addTodo() {
        dispatch("todoAdded", {
            todoTitle,
        });
        todoTitle = "";
    }
</script>

<form action="#" on:submit|preventDefault={addTodo}>
    <input
            type="text"
            class="todo-input"
            placeholder="What do you need to do?"
            bind:value={todoTitle}
    />
</form>