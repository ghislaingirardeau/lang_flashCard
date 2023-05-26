<template>
  <client-only>
    <el-dialog
      :model-value="value"
      :width="modalWidth"
      :title="title"
      top="0px"
      @close="submitForm(false)"
    >
      <el-form>
        <slot></slot>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="submitForm(false)">
            {{ $t("dialog.cancel") }}</el-button
          >
          <el-button @click="submitForm(true)" :disabled="disabled">
            <TheLoader v-if="loadingBtn" color="white" size="24px" />
            <span v-else>{{ btnText ? btnText : $t("dialog.confirm") }}</span>
          </el-button>
        </span>
      </template>
    </el-dialog>
  </client-only>
</template>

<script setup>
const props = defineProps({
  value: {
    required: true,
    type: Boolean,
  },
  doOnConfirm: Function,
  title: {
    required: true,
    type: String,
  },
  disabled: {
    required: false,
    type: Boolean,
  },
  btnText: {
    required: false,
    type: String,
  },
  loadingBtn: {
    required: false,
    type: Boolean,
  },
});

const innerWidth = window.innerWidth;

const modalWidth = computed(() => {
  return innerWidth >= 1280 ? "65%" : "100%";
});

const emit = defineEmits();
const submitForm = (params) => {
  props.doOnConfirm(params);
  /* emit("update:value", false); */
};
</script>

<style lang="scss" scoped>
.el-button {
  &:active {
    background-color: $colorFourth;
  }
  &:hover {
    background-color: $colorFourth;
  }
  &:focus {
    background-color: $colorFourth;
  }
}
</style>
