<template>
  <div class="center-block">
    <el-row justify="space-between" align="middle">
      <el-col :span="10">
        <el-select v-model="settings.from" class="m-2" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="2"> {{ $t("settings.to") }} </el-col>
      <el-col :span="10">
        <el-select v-model="settings.to" class="m-2" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    settings: Object,
  },
  setup() {
    const options = reactive([
      {
        label: "French",
        value: "fr-FR",
      },
      {
        label: "Khmer",
        value: "km-KM",
      },
      {
        label: "English",
        value: "en-GB",
      },
      {
        label: "Thai",
        value: "th-TH",
      },
      {
        label: "Spanish",
        value: "es-ES",
      },
      {
        label: "Indonesian",
        value: "id-ID",
      },
    ]);

    return {
      options,
    };
  },
};
</script>

<style lang="scss" scoped>
.center-block {
  text-align: center;
}
</style>
