<template>
  <div ref="el">
    <TransitionGroup name="slide">
      <el-row v-for="item in loadCard" :key="item.id" justify="space-between">
        <Transition name="slide">
          <el-col v-if="showDelete === 2" :span="2">
            <Icon
              name="mdi:trash-can"
              size="34px"
              color="#0ea7de"
              @click="removeItems(item.id)"
          /></el-col>
        </Transition>
        <el-col :span="10">
          <span class="loadCard-text"> {{ item.from }} </span></el-col
        >
        <el-col :span="2">
          <div v-if="loader === item.id" class="loader" v-loading="true"></div>
          <Icon
            v-else
            name="mdi:volume-high"
            size="34px"
            color="#0ea7de"
            @click="playSound(item.to, item.id)"
        /></el-col>
        <el-col :span="10">
          <span class="loadCard-text"> {{ item.to }}</span></el-col
        >
      </el-row>
    </TransitionGroup>
  </div>
</template>

<script>
import { usePlayTranslation } from "@/composables/listenTranslation";

export default {
  setup() {
    const route = useRoute();
    const cardsStore = useCardsStore();

    const loader = ref(0);
    const showDelete = ref(0);

    const loadCard = computed(() => {
      return cardsStore.cardItems[route.params.id];
    });

    const el = ref(null);
    const { lengthX } = useSwipe(el);

    const playSound = async (to, id) => {
      loader.value = id;
      const { play } = await usePlayTranslation(to, cardsStore.languages.to);
      play ? (loader.value = 0) : null;
    };

    const removeItems = (id) => {
      cardsStore.removeItem(route.params.id, id);
    };

    return {
      el,
      route,
      loadCard,
      playSound,
      loader,
      removeItems,
      showDelete,
      lengthX,
    };
  },
  watch: {
    lengthX(from, to) {
      if (to < -40) return (this.showDelete = 2);
      if (to > 40) return (this.showDelete = 0);
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 10px;
}
.el-row {
  align-items: center;
  border-bottom: 2px solid $btnColor;
}
.el-col {
  text-align: center;
  padding: 10px;
}

.loadCard-text {
  font-size: 16px;
  font-weight: bold;
}
.loader {
  display: inline-block;
  width: 30px;
  height: 30px;
}
.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
.slide-leave-active {
  position: absolute;
}
</style>
