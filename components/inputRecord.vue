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

<script setup lang="ts">
import { TypeItem } from "@/assets/interface";
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
    cardsStore.addNewItem(
      route.params.id as string,
      {
        id: Date.now(),
        from: TextToTranslate.value,
        to: text,
        pronouce: "xxx",
        langFrom: "",
        langTo: "",
      } as TypeItem
    );
    useScrollTo("smooth");
  } else {
    alert("Error from API " + error);
  }
  loading.value = false;
  TextToTranslate.value = "";
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
  cursor: var(--device-cursor);
}
</style>
