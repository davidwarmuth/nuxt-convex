<script lang="ts" setup></script>

<template>
  <div class="layout">
    <TaskHeader />
    <main class="container">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
main {
  margin-top: 4.5rem;
}
</style>
