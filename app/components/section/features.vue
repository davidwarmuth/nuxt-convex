<template>
  <section id="features">
    <h2>Features</h2>
    <p>
      This example demonstrates how to integrate Convex into a Nuxt application
      and how to use it to manage state and data in a reactive way.
    </p>
    <div class="grid">
      <article>
        <div class="icon-title">
          <Icon name="heroicons:bolt-solid" size="32" class="mb-4" />
          <h4>Realtime updates</h4>
        </div>
        <p>
          Data is synced reactively through Convex – without manual polling.
        </p>
      </article>
      <article>
        <div class="icon-title">
          <Icon name="heroicons:shield-check-solid" size="32" class="mb-4" />
          <h4>Typesafe API</h4>
        </div>
        <p>
          Queries and mutations are fully typed by the generated Convex client.
        </p>
      </article>
      <article>
        <div class="icon-title">
          <Icon name="heroicons:server-solid" size="32" class="mb-4" />
          <h4>Serverless Backend</h4>
        </div>
        <p>
          No dedicated server needed – Convex handles persistence and logic.
        </p>
      </article>
    </div>
  </section>
</template>
