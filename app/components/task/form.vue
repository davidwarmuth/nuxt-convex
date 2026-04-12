<script setup lang="ts">
defineProps<{ modelValue: string; isAdding: boolean }>();
const emit = defineEmits(["update:modelValue", "submit"]);
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <fieldset role="group">
      <button
        type="reset"
        :disabled="!modelValue"
        @click="emit('update:modelValue', '')"
      >
        <Icon name="heroicons:arrow-uturn-left" />
      </button>
      <input
        :value="modelValue"
        placeholder="New task"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
      <button type="submit" :disabled="!modelValue" :aria-busy="isAdding">
        {{ isAdding ? "Adding..." : "Add" }}
      </button>
    </fieldset>
  </form>
</template>
