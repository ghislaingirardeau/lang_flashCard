<template>
  <client-only>
    <el-dialog
      :model-value="value"
      :width="modalWidht"
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
          <el-button
            type="primary"
            @click="submitForm(true)"
            :disabled="disabled"
          >
            {{ $t("dialog.confirm") }}
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
    type: Boolean,
  },
});

const breakpoints = useBreakpoints({
  xl: 1280,
});

const modalWidht = computed(() => {
  return breakpoints.greaterOrEqual("xl").value ? "65%" : "100%";
});

const emit = defineEmits();
const submitForm = (params) => {
  props.doOnConfirm(params);
  emit("update:value", false);
};
</script>

<style lang="scss" scoped></style>
