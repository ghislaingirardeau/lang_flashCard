<template>
  <div>
    <div>
      <TransitionGroup name="slide">
        <GridMyRow v-for="card in loadCards" :key="card.id" :idClass="card">
          <GridMyCol :col="6">
            {{ card.title }}
          </GridMyCol>
          <GridMyCol :col="6"
            >{{ cardNumberItems(card.title) }}
            {{ $t("home.translation") }}</GridMyCol
          >
        </GridMyRow>
      </TransitionGroup>
      <el-row @click="dialogAddCard = true">
        <el-col :span="12">
          <Icon name="mdi:plus-box-outline" size="34px"
        /></el-col>
        <el-col :span="8">
          <span class="newCard_block--text">
            {{ $t("home.newCard") }}</span
          ></el-col
        >
      </el-row>
    </div>
    <FormDialog
      v-model:value="dialogAddCard"
      :doOnConfirm="saveNewCard"
      :title="$t('newCard.title')"
    >
      <el-form-item :label="$t('newCard.label')">
        <el-input v-model="cardForm.name" autocomplete="off" />
      </el-form-item>
    </FormDialog>
  </div>
</template>

<script>
export default {
  setup() {
    const cardsStore = useCardsStore();
    const dialogAddCard = ref(false);
    const cardForm = reactive({
      name: "",
    });

    const loadCards = computed(() => {
      return cardsStore.cards;
    });

    const getDate = (params) => {
      let d = new Date(params);
      return d.toString();
    };

    const cardNumberItems = (params) => {
      return cardsStore.cardItems[params].length;
    };

    const saveNewCard = () => {
      const newCard = {
        id: Date.now(),
        title: cardForm.name,
        lastUpdate: "xxx",
        createOn: Date.now(),
      };
      cardsStore.addNewCard(newCard);
      dialogAddCard.value = false;
      cardForm.name = "";
    };

    const openModal = () => {
      dialogAddCard.value = true;
    };
    return {
      loadCards,
      dialogAddCard,
      openModal,
      cardForm,
      saveNewCard,
      getDate,
      cardNumberItems,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  padding: 10px;
  border-bottom: 1px solid white;
  align-items: center;
  min-height: 60px;
  text-align: center;
  width: 100%;
}
.newCard_block--text {
  color: $colorThird;
}
.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
.slide-leave-active {
  position: absolute;
}
</style>
