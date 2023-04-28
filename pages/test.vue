<template>
  <div>
    <div>test page</div>
    <Icon
      name="mdi:arrow-left-drop-circle-outline"
      size="34px"
      @click="backBtn"
      class="header-icons"
    />
    <button @click="doError">create error</button>
    <h2>{{ mic }}</h2>
    <div class="mic-circle">
      <Icon
        @touchstart.prevent="startDrag"
        @touchend.prevent="endDrag"
        name="mdi:microphone"
        size="84px"
        class="icon_mic-color"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
const doError = () => {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
    fatal: true,
  });
};
const localePath = useLocalePath();
const backBtn = () => {
  navigateTo(
    localePath({
      name: "index",
    })
  );
};
const mic = ref(false);
const startDrag = (e) => {
  console.log("start");
  mic.value = true;
};
const endDrag = (e) => {
  console.log("end");
  mic.value = false;
  if (window.confirm("Do you really want to leave?")) {
    console.log("do this");
    window.location.reload();
  }
};
</script>

<style lang="scss" scoped></style>
