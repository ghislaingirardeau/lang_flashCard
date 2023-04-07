<template>
  <div class="id_container">
    <GridSwiper @onTapPlay="playSound">
      <TransitionGroup name="slide">
        <GridMyRow
          v-for="item in loadCard"
          :key="item.id"
          :idClass="item"
          append="mdi:trash-can-outline"
        >
          <GridMyCol :col="loader === item.id ? 4 : 6">
            {{ item.from }}
          </GridMyCol>
          <GridMyCol
            :col="loader === item.id ? 4 : 6"
            style="word-break: break-all"
            ><span>{{ item.to }} </span>
            <span class="block_swipe_card-text">{{
              langTo === "km" ? useWordPronounce(item.to) : ""
            }}</span></GridMyCol
          >
          <GridMyCol :col="2" v-if="loader === item.id">
            <TheLoader size="44px" />
          </GridMyCol>
        </GridMyRow>
      </TransitionGroup>
    </GridSwiper>
  </div>
</template>

<script>
import { useWordPronounce } from "@/composables/translation";
import { usePlaySound } from "~~/composables/playSound";

export default {
  setup() {
    const route = useRoute();
    const cardsStore = useCardsStore();
    const loader = ref(0);

    const langTo = computed(() => {
      return cardsStore.langTo;
    });

    const loadCard = computed(() => {
      return cardsStore.cardItems[route.params.id];
    });

    const playSound = (payload) => {
      // envoie en params le payload de childNode emit onTap + le loader créer
      usePlaySound(loader, payload);
    };

    return {
      loadCard,
      playSound,
      loader,
      langTo,
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
.id_container {
  height: 100%;
}
</style>
