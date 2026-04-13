<template>
  <section id="hero" class="grid">
    <div class="content">
      <h1>Nuxt App with Convex Backend</h1>
      <p>
        This is an example of how to use Convex with Nuxt. It includes a simple
        task list. The task list is stored in Convex. You can add tasks to the
        list and see them update in real-time.
      </p>
      <p>Feel free to explore the code and see how it works!</p>
      <NuxtLink to="/tasks" role="button">Zu den Tasks</NuxtLink>
    </div>
    <NuxtImg
      src="/tasks_list_screenshot.png"
      alt="Tasks List Screenshot"
      class="hero-image"
    />
  </section>
</template>
