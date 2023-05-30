<template>
  <div class="modal_action">
    <span class="modal_action-close">&times;</span>
    <Transition name="slideY" mode="out-in">
      <button :key="tutoPage" class="modal_action-btn" @click="changeTuto">
        {{ switchContent }}
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  tutoPage: {
    required: true,
    type: Number,
  },
});
const { t } = useI18n();
const emit: Function = defineEmits();
const route = useRoute();

const tutoLength = computed(() => {
  return route.params.id ? 3 : 2;
});

const switchContent = computed(() => {
  return props.tutoPage === tutoLength.value
    ? t("tutorial.button.end")
    : t("tutorial.button.next");
});

const changeTuto = () => {
  emit(
    "update:tutoPage",
    props.tutoPage === tutoLength.value ? 1 : props.tutoPage + 1
  );
};
</script>

<style lang="scss" scoped></style>
