<template>
  <div id="helpModal" class="modal_help">
    <div class="modal_action">
      <span class="modal_action-close">&times;</span>
      <Transition name="fade" mode="out-in">
        <button :key="tutoPage" class="modal_action-btn" @click="changeTuto">
          {{ switchContent }}
        </button>
      </Transition>
    </div>

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
          name="material-symbols:swipe-outline"
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
          <p>You can change the rate inside settings, to listen it slowly</p>
        </div>
        <Icon
          name="ph:hand-tap"
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
          <h2>Numbers of word you consider has known</h2>
        </div>
        <img
          src="@/assets/arrow4.svg"
          alt=""
          class="modal_tuto-lastRemember-arrowdown"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const tutoPage = ref(1);
const route = useRoute();
const emit = defineEmits();

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

<style lang="scss" scoped>
// STYLE THE MODAL
/* The Modal (background) */
.modal_help {
  display: block; /* Hidden by default */
  opacity: 0;
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
  font-family: "Architects Daughter", cursive;
}

/* Modal Content/Box */

.modal_tuto {
  z-index: 101;

  height: 100%;
  width: 100%;
  &-cardSwitch {
    position: relative;
    height: 100%;
    width: 100%;
    color: rgb(255, 255, 255);
    &-arrowup {
      position: absolute;
      text-align: left;
      left: 100px;
      top: 50px;
      width: 50%;
    }
    &-contentUp {
      position: absolute;
      text-align: left;
      left: 30px;
      top: 210px;
      width: 70%;
    }
    &-contentDown {
      position: absolute;
      text-align: left;
      right: 10px;
      bottom: 140px;
      width: 70%;
    }
    &-arrowdown {
      position: absolute;
      text-align: left;
      right: 120px;
      bottom: 20px;
      width: 30%;
      transform: rotateZ(180deg);
    }
  }
  &-lastRemember {
    position: relative;
    height: 100%;
    width: 100%;
    color: rgb(255, 255, 255);
    &-arrowup {
      position: absolute;
      text-align: left;
      left: 90px;
      top: 60px;
      width: 50%;
      transform: rotateY(180deg);
    }
    &-contentUp {
      position: absolute;
      text-align: left;
      left: 30px;
      top: 240px;
      width: 70%;
    }
    &-contentDown {
      position: absolute;
      text-align: left;
      right: 20px;
      bottom: 160px;
      width: 70%;
    }
    &-arrowdown {
      position: absolute;
      text-align: left;
      right: 70px;
      bottom: 20px;
      width: 30%;
      transform: rotateZ(180deg) rotateY(180deg);
    }
  }
  &-recorder {
    position: relative;
    height: 100%;
    width: 100%;
    color: rgb(255, 255, 255);
    &-arrowup {
      position: absolute;
      text-align: left;
      right: -40px;
      bottom: 90px;
      width: 60%;
      transform: rotateZ(160deg) rotateY(180deg);
    }
    &-contentUp {
      position: absolute;
      text-align: left;
      right: 30px;
      bottom: 320px;
      width: 70%;
    }
    &-contentDown {
      position: absolute;
      text-align: left;
      left: 10px;
      bottom: 220px;
      width: 70%;
    }
    &-arrowdown {
      position: absolute;
      text-align: left;
      left: -40px;
      bottom: 60px;
      width: 50%;
      transform: rotateZ(200deg);
    }
  }
  &-word {
    position: relative;
    height: 100%;
    width: 100%;
    color: rgb(255, 255, 255);
    &-tap {
      position: absolute;
      text-align: left;
      left: 240px;
      top: 70px;
    }
    &-contentLeft {
      position: absolute;
      text-align: left;
      left: 20px;
      top: 150px;
      width: 90%;
    }
    &-contentRight {
      position: absolute;
      text-align: left;
      right: 5px;
      top: 150px;
      width: 90%;
    }
    &-swipe {
      position: absolute;
      text-align: left;
      left: 80px;
      top: 70px;
    }
  }
}

/* The Close Button */
.modal_action {
  &-close {
    z-index: 101;
    position: absolute;
    left: 15px;
    top: -17px;
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 62px;
    &:hover,
    &:focus {
      color: rgb(151, 151, 151);
      text-decoration: none;
      cursor: pointer;
    }
  }
  &-btn {
    z-index: 101;
    position: absolute;
    right: 60px;
    top: 10px;
    font-size: 20px;
    padding: 6px 8px;
    border: 2px white solid;
    border-radius: 4px 4px;
    background-color: $colorSecondary;
    color: white;
  }
}
</style>
