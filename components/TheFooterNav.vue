<template>
  <div>
    <Transition name="fade-slideY" mode="out-in">
      <div
        class="container_footer_nav container_footer_nav-input"
        :style="{ alignItems: toInput ? 'center' : 'flex-end' }"
        v-if="toInput"
      >
        <div
          class="footer_nav_btn footer_nav_btn-radius-left"
          @click="switchToInput"
        >
          <Icon
            name="mdi:microphone"
            size="44px"
            color="#0b132b"
            class="rotate-icon"
          />
        </div>
        <InputRecord />
      </div>
      <div
        class="container_footer_nav container_footer_nav-mic"
        :style="{ alignItems: toInput ? 'center' : 'flex-end' }"
        v-else
      >
        <div
          class="footer_nav_btn footer_nav_btn-radius-left"
          @click="switchToInput"
        >
          <Icon
            name="material-symbols:keyboard-alt-outline"
            size="44px"
            color="#0b132b"
            class="rotate-icon"
          />
        </div>

        <MicRecord />
        <div
          class="footer_nav_btn footer_nav_btn-radius-right"
          @click="playAllSound"
        >
          <LazyTheLoader v-if="loader === 1" size="44px" />
          <Icon
            v-else
            name="mdi:play-outline"
            size="54px"
            color="#0b132b"
            class="rotate-icon"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  setup() {
    const route = useRoute();
    const loader = ref(0);
    const toInput = ref(false);
    const cardsStore = useCardsStore();
    const loadCard = computed(() => {
      return cardsStore.cardItems[route.params.id];
    });

    const switchToInput = (e) => {
      toInput.value = !toInput.value;
      let list = document.querySelectorAll(".rotate-icon");
      list.forEach((element) => {
        element.classList.add("rotate-icon-animate");
      });
    };

    const playAllSound = async () => {
      const allText = loadCard.value.map((e) => e.to);

      loader.value = 1;

      for (let index = 0; index < allText.length; index++) {
        const { play, error } = await usePlayTranslation(
          allText[index],
          cardsStore.languages.rate
        );
      }
      loader.value = 0;
    };
    return { loader, playAllSound, toInput, switchToInput };
  },
};
</script>

<style lang="scss" scoped>
.container_footer_nav {
  height: 90px;
  display: flex;
  text-align: center;

  &-mic {
    align-items: flex-end;
    justify-content: space-around;
  }
  &-input {
    align-items: center;
    justify-content: flex-start;
  }
}
.footer_nav_btn {
  border: 2px solid darken($color: $colorThird, $amount: 20%);
  background-color: $colorPrimary;

  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  &-radius-left {
    border-radius: 40% 50% 40% 0%;
  }
  &-radius-right {
    border-radius: 50% 40% 0% 40%;
    & > svg {
      margin-left: 5px;
    }
  }
}
.rotate-icon {
  cursor: pointer;
  animation: rotate-enter 0.4s both 1;
}
.rotate-icon-animate {
  animation: rotate-leave 0.4s both 1;
}
@keyframes rotate-enter {
  0% {
    transform: rotateZ(90deg);
    opacity: 0;
  }
  100% {
    transform: rotateZ(0deg);
    opacity: 1;
  }
}
@keyframes rotate-leave {
  0% {
    transform: rotateZ(0deg);
    opacity: 1;
  }
  100% {
    transform: rotateZ(90deg);
    opacity: 0;
  }
}
.fade-slideY-enter-active,
.fade-slideY-leave-active {
  transition: all 0.4s ease;
}

.fade-slideY-enter-from,
.fade-slideY-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
