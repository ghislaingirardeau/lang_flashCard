<template>
  <div class="display-trash" :id="id">
    <Icon name="mdi:trash-can" size="34px" @click="doOnClickDelete(id)" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      type: Number,
    },
    category: {
      required: true,
      type: String,
    },
    card: Boolean,
  },
  setup(props) {
    const cardsStore = useCardsStore();
    const doOnClickDelete = (id) => {
      props.card
        ? cardsStore.removeCard(props.category, id)
        : cardsStore.removeItem(props.category, id);
    };
    return {
      doOnClickDelete,
    };
  },
};
</script>

<style lang="scss" scoped>
.display-trash {
  overflow: hidden;
  width: 0px;
  opacity: 0;
  -webkit-transition: width 0.4s ease-in-out;
  -moz-transition: width 0.4s ease-in-out;
  -o-transition: width 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}
</style>
