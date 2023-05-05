<template>
  <div id="helpModal" class="modal_help">
    <div class="modal_action">
      <span class="modal_action-close">&times;</span>
      <Transition name="slideY" mode="out-in">
        <button :key="tutoPage" class="modal_action-btn" @click="changeTuto">
          {{ switchContent }}
        </button>
      </Transition>
    </div>

    <Transition name="page" mode="out-in">
      <div :key="tutoPage" style="display: unset">
        <div v-if="$route.params.id" class="modal_tuto">
          <div class="modal_tuto-recorder" v-if="tutoPage === 1">
            <img
              src="@/assets/arrow4.svg"
              alt=""
              class="modal_tuto-recorder-arrowup"
            />
            <div class="modal_tuto-recorder-contentUp">
              <h2>Translate with voice</h2>
            </div>
            <div class="modal_tuto-recorder-contentDown">
              <h2>Translate with keyboard</h2>
            </div>
            <img
              src="@/assets/arrow_up.svg"
              alt=""
              class="modal_tuto-recorder-arrowdown"
            />
          </div>
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
          <div class="modal_tuto-cardSwitch" v-if="tutoPage === 1">
            <img
              src="@/assets/arrow_up.svg"
              alt=""
              class="modal_tuto-cardSwitch-arrowup"
            />
            <div class="modal_tuto-cardSwitch-contentUp">
              <h2>Add a new card</h2>
              <p>Name your carte by what it's gonna contain</p>
            </div>
            <div class="modal_tuto-cardSwitch-contentDown">
              <h2>Switch the language</h2>
              <p>If you want to save words from your new language</p>
            </div>
            <img
              src="@/assets/arrow4.svg"
              alt=""
              class="modal_tuto-cardSwitch-arrowdown"
            />
          </div>
          <div class="modal_tuto-lastRemember" v-if="tutoPage === 2">
            <img
              src="@/assets/arrow_up.svg"
              alt=""
              class="modal_tuto-lastRemember-arrowup"
            />
            <div class="modal_tuto-lastRemember-contentUp">
              <h2>See qucikly your last added word</h2>
            </div>
            <div class="modal_tuto-lastRemember-contentDown">
              <h2>Numbers of word you consider as known</h2>
            </div>
            <img
              src="@/assets/arrow4.svg"
              alt=""
              class="modal_tuto-lastRemember-arrowdown"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const tutoPage = ref(1);
const route = useRoute();
const emit = defineEmits();

const isTouchable = computed(() => {
  return navigator.maxTouchPoints || "ontouchstart" in document.documentElement;
});

const tutoLength = computed(() => {
  return route.params.id ? 3 : 2;
});

const switchContent = computed(() => {
  return tutoPage.value === tutoLength.value ? "End" : "Next";
});

const changeTuto = () => {
  tutoPage.value === tutoLength.value ? (tutoPage.value = 1) : tutoPage.value++;
};

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
