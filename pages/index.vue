<template>
  <div>
    <h1>lang App</h1>
    <div v-for="card in loadCards" :key="card.id">
      <NuxtLink :to="{ name: 'card-id', params: { id: card.title } }"
        >{{ card.title }} {{ card.id }}
      </NuxtLink>
    </div>
    <div>
      <Icon
        name="mdi:plus"
        size="34px"
        color="red"
        @click="dialogVisible = true"
      />
    </div>
    <el-dialog v-model="dialogVisible" title="Shipping address" align-center>
      <el-form :model="form">
        <el-form-item label="Promotion name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  setup() {
    const cardsStore = useCardsStore();
    const loadCards = computed(() => {
      return cardsStore.cards;
    });
    const dialogVisible = ref(false);
    const form = reactive({
      name: "",
    });
    return { loadCards, dialogVisible, form };
  },
};
</script>

<style lang="scss" scoped></style>
