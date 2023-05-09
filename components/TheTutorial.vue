<template>
  <div id="helpModal" class="modal_help">
    <TutorialButton v-model:tutoPage="tutoPage" />

    <Transition name="page" mode="out-in">
      <div :key="tutoPage" style="display: unset">
        <component :is="componentToLoad" :tutoPage="tutoPage" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import tutorialcard from "@/components/Tutorial/card.vue";
import tutorialHome from "@/components/Tutorial/home.vue";

const route = useRoute();

const componentToLoad = computed(() =>
  route.params.id ? tutorialcard : tutorialHome
);

const tutoPage = ref(1);

const emit = defineEmits();

const helpModal = () => {
  let modal = document.getElementById("helpModal");
  let span = document.getElementsByClassName("modal_action-close")[0];

  const resetModal = (display, span, reverse) => {
    display.animate(
      [{ opacity: `${reverse ? 1 : 0}` }, { opacity: `${reverse ? 0 : 1}` }],
      {
        duration: 300,
        fill: "both",
      }
    );
    span.animate(
      [
        {
          transform: `rotateZ(${reverse ? 0 : -90}deg)`,
          transformOrigin: "center",
        },
        {
          transform: `rotateZ(${reverse ? -90 : 0}deg)`,
          transformOrigin: "center",
        },
      ],
      {
        duration: 300,
        fill: "both",
      }
    );
  };

  resetModal(modal, span, false);

  span.onclick = () => {
    resetModal(modal, span, true);
    setTimeout(() => {
      emit("send-tuto", {
        message: false,
      });
    }, 300);
  };
};
onMounted(() => {
  helpModal();
});
</script>

<style lang="scss" scoped></style>
