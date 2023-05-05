<template>
  <div>
    <h1>Test 2</h1>
    <div>
      <label for="test">One</label>
      <input type="radio" name="test" id="test" />
      <label for="test">two</label>
      <input type="radio" name="test" id="test" />
      <input type="text" name="fromChild" v-model="fromChild" />
    </div>
  </div>
</template>

<script setup>
const foo = ref("foo");
const fromChild = ref("");
defineExpose({
  foo,
  fromChild,
});
</script>

<style lang="scss" scoped></style>
