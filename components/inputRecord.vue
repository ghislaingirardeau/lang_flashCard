<template>
  <div class="mic-block">
    <div v-if="loading" class="loader" v-loading="loading"></div>
    <el-row v-else justify="space-between">
      <el-col :span="24">
        <el-input
          v-model="TextToTranslate"
          label="text-to-translate"
          placeholder="Translate"
          autofocus
        >
          <template #append>
            <Icon
              @click="translate"
              name="mdi:check-underline-circle-outline"
              size="34px"
              color="#0ea7de"
            />
          </template>
        </el-input>
      </el-col>
    </el-row>
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
      const { text } = await useTranslation(
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
        alert("translation does not work");
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
.mic-block {
  text-align: center;
}
.loader {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: transparent;
}
.el-input {
  border: 1px solid $btnColor;
}
</style>
