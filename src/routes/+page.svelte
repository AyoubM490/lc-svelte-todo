<script>
    import "../css/reset.css";
    import "../css/style.css";
</script>

<div class="todo-app-container">
    <div class="todo-app">
        <h2>Todo App</h2>
        <form action="#">
            <input
                type="text"
                class="todo-input"
                placeholder="What do you need to do?"
            />
        </form>

        <ul class="todo-list">
            <li class="todo-item-container">
                <div class="todo-item">
                    <input type="checkbox" />
                    <span class="todo-item-label">Finish Svelte Series</span>

<!--                    <input
                            type="text"
                            class="todo-item-input"
                            value="Finish Svelte Series"
                        />-->
                </div>
                <button class="x-button">
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
        </ul>

        <div class="check-all-container">
            <div>
                <div class="button">Check All</div>
            </div>

            <span>3 items remaining</span>
        </div>

        <div class="other-buttons-container">
            <div>
                <button class="button filter-button filter-button-active">All</button>
                <button class="button filter-button">Active</button>
                <button class="button filter-button">Completed</button>
            </div>
            <div>
                <button class="button">Clear completed</button>
            </div>
        </div>
    </div>
</div>