<template>
  <div class="cards-main">
    <div class="cards-container">
      <div v-for="card in loadCards" :key="card.id" class="cards-block">
        <NuxtLink :to="{ name: 'card-id', params: { id: card.title } }"
          >{{ card.title }}
        </NuxtLink>
      </div>
    </div>
    <div>
      <Icon
        name="mdi:plus"
        size="34px"
        color="red"
        @click="dialogVisible = true"
      />
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
    return { loadCards, dialogVisible, openModal, cardForm, saveNewCard };
  },
};
</script>

<style lang="scss" scoped>
.cards-main {
  padding: 20px;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px;
}
.cards-block {
  padding: 10px;
  border: 2px solid grey;
}
</style>
