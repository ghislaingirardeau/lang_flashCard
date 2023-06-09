<template>
  <div class="home_container">
    <div class="widget_block">
      <div class="widget_block_newCard" @click="openModal">
        <Icon name="mdi:plus-box-outline" size="34px" />
        <span class="widget_block_newCard-text"> {{ $t("home.newCard") }}</span>
      </div>
      <div @click="goToLastAdd" class="widget_block_lastAdd">
        <Icon name="ic:outline-history" size="34px" />
        <span class="widget_block_newCard-text">{{ $t("home.lastAdd") }}</span>
      </div>
    </div>

    <div class="cards_block">
      <GridSwiper>
        <TransitionGroup
          name="slide"
          @before-leave="useBeforeLeave($event, true)"
        >
          <GridMyRow
            v-for="card in loadCards"
            :key="card.id"
            :idClass="card"
            append="charm:circle-cross"
          >
            <GridMyCol :col="12">
              {{ card.title.replaceAll("_", " ") }} ({{
                cardNumberItems(card.title)
              }})
            </GridMyCol>
          </GridMyRow>
        </TransitionGroup>
      </GridSwiper>
    </div>
    <FormDialog
      v-model:value="dialogAddCard"
      :doOnConfirm="saveNewCard"
      :disabled="nameNotCorrect()"
      :title="$t('newCard.title')"
    >
      <div class="newCard_content">
        <div class="d-item">
          <span>{{ $t("newCard.label") }}:</span>
          <el-input
            v-model="cardForm.name"
            @keydown.enter.prevent="saveNewCard(true)"
            autocomplete="off"
          />
        </div>
        <span v-show="nameNotCorrect()" class="newCard_content-alert"
          >{{
            cardForm.name.length > 0 ? $t("newCard.hint1") : $t("newCard.hint2")
          }}
        </span>
      </div>
    </FormDialog>
  </div>
</template>

<script setup lang="ts">
const cardsStore = useCardsStore();
const dialogAddCard = ref(false);
const cardForm = reactive({
  name: "",
});
const localePath = useLocalePath();
const { t } = useI18n();

const loadCards = computed(() => {
  return cardsStore.cards;
});

const nameNotCorrect = () => {
  let cardExist = loadCards.value.findIndex(
    (elt) => elt.title === cardForm.name
  );
  if (cardForm.name.length >= 1 && cardExist === -1) return false;
  if (cardForm.name.length < 1 || cardExist != -1) return true;
};

const goToLastAdd = () => {
  navigateTo(
    localePath({
      name: "card-id",
      params: { id: t("home.lastAdd") },
    })
  );
};

const cardNumberItems = (params: string) => {
  return cardsStore.cardItems[params].length;
};

const saveNewCard = (payload: boolean) => {
  if (nameNotCorrect() && payload) {
    return;
  }

  if (cardForm.name.length >= 1 && payload) {
    const newCard = {
      id: Date.now(),
      title: cardForm.name.trim().replaceAll(" ", "_"),
      lastUpdate: Date.now(),
      createOn: Date.now(),
    };
    cardsStore.addNewCard(newCard);
    cardForm.name = "";
    dialogAddCard.value = false;
    useScrollTo("smooth");
    return;
  } else {
    cardForm.name = "";
    dialogAddCard.value = false;
  }
};

const openModal = () => {
  dialogAddCard.value = true;
};
</script>

<style lang="scss" scoped>
.home_container {
  min-height: 100%;
  position: relative;
}

.widget_block {
  position: sticky;
  display: flex;
  flex-wrap: nowrap;
  top: 0px;
  background-color: $colorFourth;
  z-index: 10;
  border-bottom: 1px solid white;

  cursor: pointer;
  &_newCard {
    padding: 10px;
    border-right: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  }
  &_lastAdd {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  }
  &_newCard-text {
    color: $colorThird;
    margin-left: 10px;
  }
}
.newCard_content {
  position: relative;
  height: 80px;
  &-alert {
    position: absolute;
    top: 45px;
    right: 0px;
    color: white;
  }
}
.cards_block {
  z-index: 1;
}
</style>
