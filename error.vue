<template>
  <NuxtLayout>
    <h1>This page doesn't exist</h1>
    <button @click="handleError">Back to home</button>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });
</script>
