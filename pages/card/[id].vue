<template>
  <div>
    <TransitionGroup name="slide">
      <el-row v-for="item in loadCard" :key="item.id" justify="space-between">
        <SlideIconDeleteItem
          :id="item.id"
          :category="$route.params.id ? $route.params.id : ''"
        />

        <el-col
          :span="10"
          @touchstart.prevent="startDrag($event)"
          @touchend.prevent="endDrag(item.id, $event)"
        >
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
        <el-col
          :span="10"
          @touchstart.prevent="startDrag($event)"
          @touchend.prevent="endDrag(item.id, $event)"
        >
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
    const touchBeg = ref(null);

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
      cardsStore,
      loadCard,
      playSound,
      loader,
      touchBeg,
    };
  },
  methods: {
    startDrag($event) {
      this.touchBeg = $event.changedTouches[0].clientX;
    },
    endDrag(id, $event) {
      if ($event.changedTouches[0].clientX - this.touchBeg > 30) {
        document.getElementById(id).style.width = "30px";
        document.getElementById(id).style.opacity = "1";
      } else {
        document.getElementById(id).style.width = "0px";
        document.getElementById(id).style.opacity = "0";
      }
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
  width: 100%;
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
