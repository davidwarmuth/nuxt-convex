<script setup lang="ts">
import type { Id } from "~~/convex/_generated/dataModel";

defineProps<{
  task: { _id: Id<"tasks">; text: string; isCompleted: boolean };
}>();
const emit = defineEmits(["toggle", "remove"]);
</script>

<template>
  <article
    tabindex="0"
    class="card"
    @click="emit('toggle')"
    @keydown.enter="emit('toggle')"
  >
    <div class="task">
      <span :class="{ completed: task.isCompleted }">{{ task.text }}</span>
      <button
        aria-label="Delete task"
        class="outline secondary"
        @click.stop="emit('remove')"
      >
        <Icon name="heroicons:trash" />
      </button>
    </div>
  </article>
</template>

<style scoped>
.card {
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f9f9f9;
  }
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
button {
  padding: 0.5rem;
  line-height: 1rem;
}
</style>
