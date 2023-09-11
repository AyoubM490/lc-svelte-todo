<script>
    import TodoForm from "./TodoForm.svelte";
    // import {createEventDispatcher} from "svelte";
    //
    // const dispatch = createEventDispatcher();
    //
    // function addTodo(event) {
    //     dispatch("todoAdded", {
    //         todoTitle: event.detail.todoTitle,
    //     });
    // }
</script>

<TodoForm on:todoAdded />