<template>
  <div class="input-block">
    <TheLoader v-if="loading" size="48px" />
    <div v-else justify="space-between">
      <el-input
        v-model="TextToTranslate"
        label="text-to-translate"
        :placeholder="$t('footer.translate')"
      >
        <template #append>
          <Icon
            @click="translate"
            name="mdi:check-underline-circle-outline"
            size="44px"
          />
        </template>
      </el-input>
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
.input-block {
  text-align: center;
  padding-left: 15px;
}
.loader {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: transparent;
}
</style>
