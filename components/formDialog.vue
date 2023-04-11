<template>
  <client-only>
    <el-dialog
      :model-value="value"
      width="100%"
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
          <el-button type="primary" @click="submitForm(true)">
            {{ $t("dialog.confirm") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </client-only>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
    },
    doOnConfirm: Function,
    title: {
      required: true,
      type: String,
    },
  },
  setup(props, { emit }) {
    const submitForm = (params) => {
      props.doOnConfirm(params);
      emit("update:value", false);
    };
    return {
      submitForm,
    };
  },
};
</script>

<style lang="scss" scoped></style>
