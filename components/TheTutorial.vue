<template>
  <div id="helpModal" class="modal_help">
    <TutorialButton v-model:tutoPage="tutoPage" />

    <Transition name="page" mode="out-in">
      <div :key="tutoPage" style="display: unset">
        <div v-if="$route.params.id" class="modal_tuto">
          <TutorialArrowContent
            className="modal_tuto-recorder"
            v-if="tutoPage === 1"
          >
            <template #contentUp>
              <h2>Translate with voice</h2>
            </template>
            <template #contentDown>
              <h2>Translate with keyboard</h2>
            </template>
          </TutorialArrowContent>
          <div class="modal_tuto-word" v-if="tutoPage === 2">
            <Icon
              :name="
                isTouchable
                  ? 'material-symbols:swipe-outline'
                  : 'fluent:cursor-hover-24-regular'
              "
              size="54px"
              color="white"
              class="modal_tuto-word-swipe"
            />
            <div class="modal_tuto-word-contentLeft">
              <p>
                Show options icons : <br />
                Delete or Good*
              </p>
              <span>
                *Good means that you remember the word now, so you don't need it
                anymore. The app will count as a word you remember to see your
                progress
              </span>
            </div>
          </div>
          <div class="modal_tuto-word" v-if="tutoPage === 3">
            <div class="modal_tuto-word-contentRight">
              <h2>Listen to the word</h2>
              <p>
                You can change the rate inside settings, to listen it slowly
              </p>
            </div>
            <Icon
              :name="isTouchable ? 'ph:hand-tap' : 'ic:outline-ads-click'"
              size="54px"
              color="white"
              class="modal_tuto-word-tap"
            />
          </div>
        </div>

        <div v-else class="modal_tuto">
          <TutorialArrowContent
            className="modal_tuto-cardSwitch"
            v-if="tutoPage === 1"
          >
            <template #contentUp>
              <h2>Add a new card</h2>
              <p>Name your carte by what it's gonna contain</p>
            </template>
            <template #contentDown>
              <h2>Switch the language</h2>
              <p>If you want to save words from your new language</p>
            </template>
          </TutorialArrowContent>
          <TutorialArrowContent
            className="modal_tuto-lastRemember"
            v-if="tutoPage === 2"
          >
            <template #contentUp>
              <h2>See quickly your last added word</h2>
            </template>
            <template #contentDown>
              <h2>Numbers of word you consider as known</h2>
            </template>
          </TutorialArrowContent>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const tutoPage = ref(1);

const emit = defineEmits();

const isTouchable = computed(() => {
  return navigator.maxTouchPoints || "ontouchstart" in document.documentElement;
});

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
