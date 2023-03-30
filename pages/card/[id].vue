<template>
  <div>
    <TransitionGroup name="slide">
      <GridMyRow
        v-for="item in loadCard"
        :key="item.id"
        :idClass="item"
        @doOnTap="playSound"
      >
        <GridMyCol :col="4">
          {{ item.from }}
        </GridMyCol>
        <GridMyCol
          :col="loader === item.id ? 6 : 8"
          style="word-break: break-all"
          >{{ item.to }} <br />
          <span style="font-size: 15px">{{
            pronouciation(item.to)
          }}</span></GridMyCol
        >
        <GridMyCol :col="2" v-if="loader === item.id">
          <TheLoader size="44px" />
        </GridMyCol>
      </GridMyRow>
    </TransitionGroup>
    <el-row @click="playAllSound" justify="center" class="btn-play-all">
      <TheLoader v-if="loader === 1" size="44px" color="#000814" />
      <Icon v-else name="mdi:play-outline" size="44px" color="#000814" />
    </el-row>
  </div>
</template>

<script>
import { usePlayTranslation } from "@/composables/listenTranslation";
import khmerRomanization from "@/assets/khmer.json";

export default {
  setup() {
    const route = useRoute();
    const cardsStore = useCardsStore();

    const loader = ref(0);
    const touchBeg = ref(null);

    const loadCard = computed(() => {
      return cardsStore.cardItems[route.params.id];
    });

    const playSound = async (payload) => {
      loader.value = payload.id;
      const { play } = await usePlayTranslation(
        payload.to,
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
    /* startDrag($event) {
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
    }, */
    pronouciation(text) {
      const chars = text.split("");

      let res = [];

      for (let i in chars) {
        if (khmerRomanization[chars[i]]) {
          res.push(khmerRomanization[chars[i]]);
        }
      }
      return res.toString();
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
</style>
