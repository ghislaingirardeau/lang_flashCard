<template>
  <div>
    <el-row v-for="item in loadCard" :key="item.id" justify="space-between">
      <el-col :span="7">
        <span class="loadCard-text"> {{ item.from }} </span></el-col
      >
      <el-col :span="7">
        <div v-if="loader === item.id" class="loader" v-loading="true"></div>
        <Icon
          v-else
          name="mdi:volume-high"
          size="34px"
          color="red"
          @click="playSound(item.to, item.id)"
      /></el-col>
      <el-col :span="7">
        <span> {{ item.to }}</span></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { usePlayTranslation } from "@/composables/listenTranslation";

export default {
  setup() {
    const route = useRoute();
    const cardsStore = useCardsStore();

    const loader = ref(0);

    const loadCard = computed(() => {
      return cardsStore.cardItems[route.params.id];
    });

    const playSound = async (to, id) => {
      loader.value = id;
      const { play } = await usePlayTranslation(to, cardsStore.languages.to);
      play ? (loader.value = 0) : null;
    };

    return {
      route,
      loadCard,
      playSound,
      loader,
    };
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 10px;
}
.el-row {
  align-items: center;
  border-bottom: 2px solid red;
}
.el-col {
  text-align: center;
  padding: 10px;
}
.loader {
  display: inline-block;
  width: 30px;
  height: 30px;
}
</style>
