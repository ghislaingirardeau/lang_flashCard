<template>
  <div class="mic-block">
    <el-row justify="space-between" align="middle">
      <el-col :span="10">
        <el-select
          v-model="valueFrom"
          class="m-2"
          placeholder="Select"
          @change="changeFrom"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="2"> To </el-col>
      <el-col :span="10">
        <el-select
          v-model="valueTo"
          class="m-2"
          placeholder="Select"
          @change="changeTo"
        >
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
  setup() {
    const cardsStore = useCardsStore();
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
        value: "En-UK",
      },
    ]);
    const valueFrom = ref(
      options.find((e) => e.value === cardsStore.languages.from)
    );
    const valueTo = ref(
      options.find((e) => e.value === cardsStore.languages.to)
    );

    const changeFrom = () => {
      cardsStore.setLang(true, valueFrom.value);
    };

    const changeTo = () => {
      cardsStore.setLang(false, valueTo.value);
    };

    return {
      options,
      valueFrom,
      valueTo,
      changeFrom,
      changeTo,
    };
  },
};
</script>

<style lang="scss" scoped>
.mic-block {
  text-align: center;
}
</style>
