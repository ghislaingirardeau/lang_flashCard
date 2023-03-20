<template>
  <client-only>
    <el-dialog :model-value="value" :fullscreen="true" :title="title">
      <el-form>
        <slot></slot>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="submitForm(false)">Cancel</el-button>
          <el-button type="primary" @click="submitForm(true)">
            Confirm
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
      params ? props.doOnConfirm() : null;
      emit("update:value", !props.value);
    };
    return {
      submitForm,
    };
  },
};
</script>

<style lang="scss" scoped></style>
