<script setup lang="ts">
import type { Id } from "~~/convex/_generated/dataModel";
import { api } from "../convex/_generated/api";

const filter = ref("all");

// Separate queries for all tasks and filtered tasks
const { data: allTasks } = useConvexQuery(api.tasks.get, {});
const { data: filteredTasks } = useConvexQuery(
  api.tasks.getByStatus,
  computed(() => ({ isCompleted: filter.value === "completed" })),
);

// Select the appropriate data based on filter
const tasks = computed(
  () => (filter.value === "all" ? allTasks.value : filteredTasks.value) ?? [],
);
const createTask = useConvexMutation(api.tasks.create);
const removeTask = useConvexMutation(api.tasks.remove);
const updateTask = useConvexMutation(api.tasks.update);

const newTask = ref("");
const isAdding = ref(false);
const addTask = async () => {
  if (!newTask.value.trim()) return;
  isAdding.value = true;
  console.log("Adding task:", newTask.value);
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
  await createTask.mutate({ text: newTask.value });
  newTask.value = "";
  isAdding.value = false;
};

const toggleStatus = async (id: Id<"tasks">) => {
  const task = tasks.value?.find((t) => t._id === id);
  if (!task) return;
  await updateTask.mutate({
    id,
    text: task.text,
    isCompleted: !task.isCompleted,
  });
};
</script>

<template>
  <header>
    <nav class="container">
      <ul>
        <li><strong>Nuxt-Convex</strong></li>
      </ul>
    </nav>
  </header>

  <main class="container grid">
    <section id="hero">
      <h1>Nuxt Application with Convex Backend</h1>
      <p>
        This is an example of how to use Convex with Nuxt. It includes a simple
        task list. The task list is stored in Convex. You can add tasks to the
        list and see them update in real-time.
      </p>
      <p>
        This example demonstrates how to integrate Convex into a Nuxt
        application and how to use it to manage state and data in a reactive
        way.
      </p>
      <p>Feel free to explore the code and see how it works!</p>
    </section>

    <section id="tasks">
      <div class="filter-container">
        <h2>Task List</h2>
        <details class="dropdown">
          <summary>
            {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
          </summary>
          <ul dir="rtl">
            <li><a @click="() => (filter = 'all')">All</a></li>
            <li><a @click="() => (filter = 'open')">Open</a></li>
            <li><a @click="() => (filter = 'completed')">Completed</a></li>
          </ul>
        </details>
      </div>

      <form @submit.prevent="addTask">
        <fieldset role="group">
          <button
            type="reset"
            class="reset"
            :disabled="!newTask"
            @click="newTask = ''"
          >
            <Icon name="heroicons:arrow-uturn-left" />
          </button>
          <input v-model="newTask" placeholder="New task" />
          <button
            type="submit"
            class="add"
            :disabled="!newTask"
            :aria-busy="isAdding"
          >
            {{ isAdding ? "Adding..." : "Add" }}
          </button>
        </fieldset>
      </form>

      <TransitionGroup v-if="tasks" tag="div" name="list" class="task-list">
        <article
          v-for="task in tasks"
          :key="task._id"
          tabindex="0"
          class="card"
          @click="toggleStatus(task._id)"
          @keydown.enter="toggleStatus(task._id)"
        >
          <div class="task">
            <span :class="task.isCompleted && 'completed'">{{
              task.text
            }}</span>
            <button
              aria-label="Delete task"
              @click.stop="removeTask.mutate({ id: task._id })"
              class="outline secondary"
            >
              <Icon name="heroicons:trash" />
            </button>
          </div>
        </article>
      </TransitionGroup>
      <p v-if="tasks?.length === 0" class="muted">Keine Aufgaben vorhanden.</p>
    </section>
  </main>

  <footer>
    <hr />
    <p class="container grid">
      <small
        >&copy; {{ new Date().getFullYear() }} Nuxt-Convex. All rights
        reserved.</small
      >
      <small>
        Developed by
        <a href="https://davidwarmuth.de" target="_blank" rel="noopener"
          >David Warmuth</a
        >
      </small>
    </p>
  </footer>
</template>

<style scoped>
header {
  border-bottom: 1px solid #eee;
}
main {
  padding: 2rem 1rem;
  gap: 4rem;
}
footer {
  text-align: center;
}
section {
  position: relative;
  transition: all 0.5s ease;
}
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .completed {
    text-decoration: line-through;
    color: #888;
  }
}
.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  padding: 0.5rem;
  line-height: 1rem;
  &.reset {
    padding: 0.5rem 1rem;
  }
  &.add {
    padding: 0.5rem 1rem;
  }
}
.card {
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f9f9f9;
  }
}
.dropdown {
  width: 8.5rem;
}
.muted {
  color: #888;
  font-style: italic;
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
