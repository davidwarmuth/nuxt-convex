<script setup lang="ts">
const { tasks, removeTask, toggleStatus } = useTasks();

definePageMeta({
  layout: "tasks",
});
</script>

<template>
  <section id="tasks">
    <TaskList
      :tasks="tasks"
      @toggle="toggleStatus"
      @remove="removeTask.mutate"
    />
  </section>
</template>

<style scoped>
#tasks {
  margin: 0 auto;
  padding: 0rem;
  max-width: 720px;
}
</style>
