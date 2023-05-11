<template>
  <div class="home_container">
    <el-row class="widget_block">
      <el-col
        :span="12"
        class="widget_block_newCard"
        @click="openModal"
        @touchstart.passive="openModal"
      >
        <Icon name="mdi:plus-box-outline" size="34px" />
        <span class="widget_block_newCard-text">
          {{ $t("home.newCard") }}</span
        ></el-col
      >
      <el-col :span="12" @click="goToLastAdd" @touchstart.passive="goToLastAdd"
        ><Icon name="ic:outline-history" size="34px" />
        <span class="widget_block_newCard-text">{{ $t("home.lastAdd") }}</span>
      </el-col>
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

const goToLastAdd = () => {
  navigateTo(
    localePath({
      name: "card-id",
      params: { id: t("home.lastAdd") },
    })
  );
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
  padding: 0px;
  border-bottom: 1px solid white;
  align-items: center;
  min-height: 60px;
  text-align: center;
  width: 100%;
}

.widget_block {
  position: sticky;
  top: 0px;
  background-color: $colorFourth;
  z-index: 10;

  cursor: pointer;
  &_newCard {
    padding: 10px;
    border-right: 1px solid white;
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
    bottom: 0px;
    right: 0px;
  }
}
.cards_block {
  z-index: 1;
}
</style>
