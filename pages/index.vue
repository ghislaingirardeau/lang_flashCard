<template>
  <div class="home_container">
    <el-row @click="openModal" class="newCard_block">
      <el-col :span="12">
        <Icon name="mdi:plus-box-outline" size="34px"
      /></el-col>
      <el-col :span="8">
        <span class="newCard_block-text">
          {{ $t("home.newCard") }}</span
        ></el-col
      >
    </el-row>

    <div class="cards_block">
      <GridSwiper>
        <TransitionGroup name="slide" @before-leave="useBeforeLeave">
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
      :title="$t('newCard.title')"
      :disabled="validNewCardTitle"
    >
      <div class="newCard_content">
        <el-form-item :label="$t('newCard.label')">
          <el-input v-model="cardForm.name" autocomplete="off" />
        </el-form-item>
        <span v-show="validNewCardTitle" class="newCard_content-alert"
          >{{
            cardForm.name.length > 0 ? $t("newCard.hint1") : $t("newCard.hint2")
          }}
        </span>
      </div>
    </FormDialog>
  </div>
</template>

<script setup>
const cardsStore = useCardsStore();
const dialogAddCard = ref(false);
const validNewCardTitle = ref(true);
const cardForm = reactive({
  name: "",
});
const localePath = useLocalePath();
const { t } = useI18n();

const loadCards = computed(() => {
  return cardsStore.cards;
});

watch(cardForm, (title) => {
  let cardExist = loadCards.value.findIndex((e) => e.title === title.name);
  if (title.name.length >= 1 && cardExist === -1)
    return (validNewCardTitle.value = false);
  if (title.name.length < 1 || cardExist != -1)
    return (validNewCardTitle.value = true);
});

const goToItem = (title) => {
  navigateTo(
    localePath({
      name: "card-id",
      params: { id: title },
    })
  );
};

const getDate = (params) => {
  let d = new Date(params);
  return d.toString();
};

const cardNumberItems = (params) => {
  return cardsStore.cardItems[params].length;
};

const saveNewCard = (payload) => {
  if (cardForm.name.length >= 1 && payload) {
    const newCard = {
      id: Date.now(),
      title: cardForm.name.trim().replaceAll(" ", "_"),
      lastUpdate: Date.now(),
      createOn: Date.now(),
    };
    cardsStore.addNewCard(newCard, t("store.alert"));
    cardForm.name = "";
    return;
  }
  if (cardForm.name.length < 1 && payload) {
    cardForm.name = "";
  } else {
    cardForm.name = "";
  }
};

const openModal = () => {
  dialogAddCard.value = true;
};
</script>

<style lang="scss" scoped>
.home_container {
  height: 100%;
  position: relative;
}
.el-row {
  padding: 10px;
  border-bottom: 1px solid white;
  align-items: center;
  min-height: 60px;
  text-align: center;
  width: 100%;
}
.newCard_block {
  position: sticky;
  background-color: $colorFourth;
  z-index: 10;
  cursor: pointer;
  &-text {
    color: $colorThird;
  }
}
.newCard_content {
  position: relative;
  height: 80px;
  &-alert {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
}
.cards_block {
  z-index: 1;
}
</style>
