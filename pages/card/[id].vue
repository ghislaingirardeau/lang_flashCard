<template>
  <div>
    <el-row v-for="item in loadCard" :key="item.id" justify="space-between">
      <el-col :span="7">
        <span class="loadCard-text"> {{ item.from }} </span></el-col
      >
      <el-col :span="7">
        <Icon
          name="mdi:volume-high"
          size="34px"
          color="red"
          @click="usePlayTranslation(item.to, langTo)"
      /></el-col>
      <el-col :span="7">
        <span> {{ item.to }} </span></el-col
      >
    </el-row>
    <!-- <div v-for="item in loadCard" :key="item.id">
      <span> {{ item.from }} </span>
      <Icon
        name="mdi:volume-high"
        size="34px"
        color="red"
        @click="usePlayTranslation(item.to, langTo)"
      />
      <span> {{ item.to }} </span>
    </div> -->

    <!-- <div>
      <Icon
        @touchstart="startDrag"
        @touchend="endDrag"
        name="mdi:microphone"
        size="64px"
        color="red"
      />
    </div> -->
  </div>
</template>

<script>
import { usePlayTranslation } from "../../composables/listenTranslation";

export default {
  setup() {
    const route = useRoute();
    const cardsStore = useCardsStore();

    const loadCard = computed(() => {
      return cardsStore.cardItems[route.params.id];
    });

    const langTo = computed(() => {
      return cardsStore.languages.to;
    });

    return {
      route,
      loadCard,
      langTo,
      usePlayTranslation,
    };
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 10px;
}
.el-row {
  margin-bottom: 10px;
  align-items: center;
  border: 2px solid red;
}
.el-col {
  text-align: center;
  padding: 10px;
}
</style>
