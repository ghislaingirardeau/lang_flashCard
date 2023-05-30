<template>
  <div class="center-block">
    <el-row justify="space-between" align="middle">
      <el-col :span="10">
        <el-select v-model="settings.from" class="m-2" placeholder="Select">
          <el-option
            v-for="item in langList"
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
            v-for="item in langList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});
const { t } = useI18n();

const langList = computed(() => {
  return [
    {
      label: t("languages.fr"),
      value: "fr-FR",
    },
    {
      label: t("languages.km"),
      value: "km-KM",
    },
    {
      label: t("languages.en"),
      value: "en-GB",
    },
    {
      label: t("languages.th"),
      value: "th-TH",
    },
    {
      label: t("languages.id"),
      value: "id-ID",
    },
  ];
});
</script>

<style lang="scss" scoped>
.center-block {
  text-align: center;
}
</style>
