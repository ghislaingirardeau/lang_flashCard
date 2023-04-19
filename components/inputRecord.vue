<template>
  <div class="input-container">
    <LazyTheLoader v-if="loading" size="48px" />
    <div class="input-block" v-else>
      <el-input
        v-model="TextToTranslate"
        label="text-to-translate"
        :placeholder="$t('footer.translate')"
        @keydown.enter="translate"
      >
      </el-input>
      <Icon
        @click="translate"
        name="mdi:check-underline-circle-outline"
        size="44px"
        class="valid-text-icon"
      />
    </div>
  </div>
</template>

<script>
import { useTranslation } from "@/composables/translation";
export default {
  setup() {
    const cardsStore = useCardsStore();
    const loading = ref(false);
    const route = useRoute();
    const TextToTranslate = ref("");

    const translate = async () => {
      loading.value = true;
      const { text, error } = await useTranslation(
        TextToTranslate.value,
        cardsStore.languages.from,
        cardsStore.languages.to
      );
      if (text) {
        cardsStore.addNewItem(route.params.id, {
          id: Date.now(),
          from: TextToTranslate.value,
          to: text,
          pronouce: "xxx",
        });
        useScrollTo("smooth");
      } else {
        alert("Error from API", error);
      }
      loading.value = false;
      TextToTranslate.value = "";
    };
    return {
      TextToTranslate,
      loading,
      translate,
    };
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  text-align: center;
  padding-left: 15px;
  width: 75%;
}
.input-block {
  display: flex;
  justify-content: space-between;
  & > div {
    margin-right: 10px;
  }
}
.valid-text-icon {
  cursor: pointer;
}
</style>
