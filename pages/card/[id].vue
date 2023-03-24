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

        <el-col :span="4" :class="`col-${item.id}`">
          <div v-if="loader === item.id" class="loader" v-loading="true"></div>
          <Icon
            v-else
            name="mdi:volume-high"
            size="34px"
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
    <el-row @click="playAllSound" justify="center" class="btn-play-all">
      <div v-if="loader === 1" class="loader" v-loading="true"></div>
      <Icon v-else name="mdi:play-outline" size="44px" color="#000814" />
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
    const touchBeg = ref(null);

    const loadCard = computed(() => {
      return cardsStore.cardItems[route.params.id];
    });

    const playSound = async (to, id) => {
      loader.value = id;
      const { play } = await usePlayTranslation(
        to,
        cardsStore.languages.to,
        cardsStore.languages.rate
      );
      play ? (loader.value = 0) : null;
    };

    const playAllSound = async () => {
      loader.value = 1;
      const allText = loadCard.value
        .map((e) => e.to)
        .toString()
        .replace(",", " ");

      const { play } = await usePlayTranslation(
        allText,
        cardsStore.languages.to,
        cardsStore.languages.rate
      );
      play ? (loader.value = 0) : null;
    };

    return {
      route,
      cardsStore,
      loadCard,
      playSound,
      loader,
      touchBeg,
      playAllSound,
    };
  },
  methods: {
    startDrag($event) {
      this.touchBeg = $event.changedTouches[0].clientX;
    },
    endDrag(id, $event) {
      const getCol = document.querySelector(`.col-${id}`);

      const animRow = (w, o, r, a, params) => {
        document.getElementById(id).style.width = `${w}px`;
        document.getElementById(id).style.opacity = `${o}`;
        const classManage = () => {
          getCol.classList.remove(`el-col-${r}`);
          getCol.classList.add(`el-col-${a}`);
        };
        params
          ? setTimeout(() => {
              classManage();
            }, 150)
          : classManage();
      };
      $event.changedTouches[0].clientX - this.touchBeg > 30
        ? animRow(30, 1, 4, 2, false)
        : animRow(0, 0, 2, 4, true);
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
  border-bottom: 2px solid $colorThird;
  width: 100%;
}
.el-col {
  text-align: center;
  padding: 10px;
  transition: all 0.4s ease;
}

.loadCard-text {
  font-size: 16px;
  font-weight: bold;
}
.loader {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: $colorThird;
}
.btn-play-all {
  background-color: lighten($colorThird, 10%);
  opacity: 0.5;
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
