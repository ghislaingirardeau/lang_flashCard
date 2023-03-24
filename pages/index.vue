<template>
  <div>
    <div>
      <TransitionGroup name="slide">
        <el-row v-for="card in loadCards" :key="card.id">
          <LazySlideIconDeleteItem
            :id="card.id"
            :category="card.title"
            :card="true"
          />
          <el-col
            :span="12"
            @touchstart.prevent="startDrag($event)"
            @touchend.prevent="endDrag(card.id, card.title, $event)"
          >
            <span> {{ card.title }}</span></el-col
          >
          <!-- <el-col :span="14">
          <span> {{ getDate(card.createOn) }} cardNumberItems</span></el-col
        > -->
          <el-col
            :span="8"
            @touchstart.prevent="startDrag($event)"
            @touchend.prevent="endDrag(card.id, card.title, $event)"
          >
            <span> {{ cardNumberItems(card.title) }} tradutions </span></el-col
          >
        </el-row>
      </TransitionGroup>
      <el-row @click="dialogAddCard = true">
        <el-col :span="12">
          <Icon name="mdi:plus-box-outline" size="34px"
        /></el-col>
        <el-col :span="8">
          <span class="newCard_block--text"> Create new card</span></el-col
        >
      </el-row>
    </div>
    <FormDialog
      v-model:value="dialogAddCard"
      :doOnConfirm="saveNewCard"
      title="New card"
    >
      <el-form-item label="Card name">
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
    const touchBeg = ref(null);

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
      touchBeg,
    };
  },
  methods: {
    startDrag($event) {
      this.touchBeg = $event.changedTouches[0].clientX;
    },
    endDrag(id, category, $event) {
      const defineTouch = $event.changedTouches[0].clientX - this.touchBeg;

      if (defineTouch > 30) {
        document.getElementById(id).style.width = "30px";
        document.getElementById(id).style.opacity = "1";
        return;
      }
      if (defineTouch < -30) {
        document.getElementById(id).style.width = "0px";
        document.getElementById(id).style.opacity = "0";
        return;
      } else {
        this.$router.push({ name: "card-id", params: { id: category } });
      }
    },
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
  transform: translateX(-40px);
}
.slide-leave-active {
  position: absolute;
}
</style>
