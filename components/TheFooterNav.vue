<template>
  <el-footer class="footer_container footer_container-nav">
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
        <LazyInputRecord />
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

        <LazyMicRecord />
        <div class="footer_nav_btn footer_nav_btn-radius-right">
          <Icon
            name="mdi:arrow-left-right-bold-outline"
            size="44px"
            color="#0b132b"
            class="rotate-icon switcher-lang"
            @click="switchLang"
          />
        </div>
      </div>
    </Transition>
  </el-footer>
</template>

<script setup>
const toInput = ref(false);

const props = defineProps({
  switchLang: {
    type: Function,
    required: true,
  },
});

const switchToInput = (e) => {
  toInput.value = !toInput.value;
  let list = document.querySelectorAll(".rotate-icon");
  list.forEach((element) => {
    element.classList.add("rotate-icon-animate");
  });
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
