<template>
  <button @click="handleError">Back to home</button>
  <h1>This page doesn't exist</h1>
</template>

<script setup>
const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });
</script>
