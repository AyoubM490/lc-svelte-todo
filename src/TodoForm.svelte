<script>
    import { todos } from "./stores/TodosStore";
    let todoTitle = "";
    let todoId = 4;
    function addTodo() {
        todos.update((todos) => [
            ...todos,
            {
                id: todoId,
                title: todoTitle,
                isComplete: false,
                isEditing: false,
            },
        ]);
        todoTitle = "";
        todoId++;
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