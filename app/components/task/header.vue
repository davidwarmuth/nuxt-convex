<script setup lang="ts">
import { ref } from "vue";

const { createTask, filter, setFilter } = useTasks();
const dialog = ref<HTMLDialogElement | null>(null);

const newTask = ref("");
const isAdding = ref(false);

const addTask = async () => {
  if (!newTask.value.trim()) return;
  isAdding.value = true;
  await createTask.mutate({ text: newTask.value });
  newTask.value = "";
  isAdding.value = false;
  dialog.value?.close();
};
</script>

<template>
  <header class="sticky-header">
    <nav class="container">
      <ul>
        <li>
          <strong><NuxtLink to="/">Nuxt-Convex</NuxtLink></strong>
        </li>
      </ul>
      <ul>
        <li><h1>Tasks</h1></li>
        <li class="filter-wrapper">
          <details class="dropdown">
            <summary class="filter-btn">
              {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
            </summary>
            <ul dir="rtl">
              <li><a @click="setFilter('all')">All</a></li>
              <li><a @click="setFilter('open')">Open</a></li>
              <li><a @click="setFilter('completed')">Completed</a></li>
            </ul>
          </details>
        </li>
      </ul>
      <ul>
        <li>
          <button @click="dialog?.showModal()" class="new-task-btn">
            New Task
          </button>
          <dialog ref="dialog">
            <article>
              <header>
                <button
                  aria-label="Close"
                  rel="prev"
                  @click="dialog?.close()"
                ></button>
                <p><strong>Create a task</strong></p>
              </header>
              <TaskForm
                v-model="newTask"
                :is-adding="isAdding"
                @submit="addTask"
              />
            </article>
          </dialog>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.sticky-header {
  position: fixed;
  z-index: 10;
  width: 100%;
  border-bottom: 1px solid #eee;
  backdrop-filter: blur(10px);
  h1 {
    margin: 0;
  }
}
.filter-wrapper {
  width: 8.5rem;
}
.dropdown {
  text-align: center;
}
summary.filter-btn {
  height: 2.1rem !important;
  padding: 0.25rem 1rem !important;
}
.new-task-btn {
  padding: 0.25rem 1rem;
}
ul {
  li {
    padding: 0.65rem;
  }
}
</style>
