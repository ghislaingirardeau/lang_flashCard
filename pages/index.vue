<template>
  <div class="cards-main">
    <div class="cards-container">
      <el-row
        v-for="card in loadCards"
        :key="card.id"
        class="cards-block"
        @click="$router.push({ name: 'card-id', params: { id: card.title } })"
      >
        <el-col :span="14">
          <span> {{ card.title }}</span></el-col
        >
        <!-- <el-col :span="14">
          <span> {{ getDate(card.createOn) }} cardNumberItems</span></el-col
        > -->
        <el-col :span="10">
          <span> {{ cardNumberItems(card.title) }} tradutions </span></el-col
        >
      </el-row>
      <el-row @click="dialogVisible = true" class="cards-block">
        <el-col :span="4">
          <Icon name="mdi:plus" size="34px" color="#0ea7de"
        /></el-col>
        <el-col :span="20"> <span> Create new card</span></el-col>
      </el-row>
    </div>
    <client-only>
      <el-dialog v-model="dialogVisible" :fullscreen="true" title="New Card">
        <el-form>
          <el-form-item label="Card name">
            <el-input v-model="cardForm.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="saveNewCard"> Confirm </el-button>
          </span>
        </template>
      </el-dialog>
    </client-only>
  </div>
</template>

<script>
export default {
  setup() {
    const cardsStore = useCardsStore();
    const dialogVisible = ref(false);
    const cardForm = reactive({
      name: "",
    });

    onBeforeMount(async () => {
      await cardsStore.nuxtServerInit();
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
      dialogVisible.value = false;
    };

    const openModal = () => {
      dialogVisible.value = true;
    };
    return {
      loadCards,
      dialogVisible,
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
.cards-block {
  padding: 10px;
  border-bottom: 2px solid grey;
  align-items: center;
  min-height: 60px;
}
</style>
