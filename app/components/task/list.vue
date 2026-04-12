<script setup lang="ts">
defineProps<{ tasks: any[] }>();
const emit = defineEmits(["toggle", "remove"]);
</script>

<template>
  <TransitionGroup v-if="tasks.length" tag="div" name="list" class="task-list">
    <TaskItem
      v-for="task in tasks"
      :key="task._id"
      :task="task"
      @toggle="emit('toggle', task._id)"
      @remove="emit('remove', { id: task._id })"
    />
  </TransitionGroup>
  <p v-else class="muted">No tasks available.</p>
</template>

<style scoped>
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
