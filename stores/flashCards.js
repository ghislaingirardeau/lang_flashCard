import {
  useSaveLocal,
  useSaveFirebase,
  useLoadDataToStore,
} from "@/composables/saveData";

export const useCardsStore = defineStore("cards", {
  state: () => ({
    languages: {
      from: "fr-FR",
      to: "km-KM",
      remember: 0,
      rate: 1,
    },
    cards: [],
    cardItems: {},
    lastAdded: [],
  }),
  getters: {
    langTo: (state) => state.languages.to.slice(-2),
    langFrom: (state) => state.languages.from.slice(-2),
    totalWord: (state) => {
      let count = 0;
      state.cards.forEach((element) => {
        count += state.cardItems[element.title].length;
      });
      return count;
    },
  },
  actions: {
    nuxtServerInit(user) {
      return new Promise(async (resolve, reject) => {
        if (user) {
          const userStore = useUserStore();
          userStore.user = {
            name: user.displayName,
            id: user.uid,
          };
          await useLoadDataToStore(user.uid);
        } else {
          const datas = localStorage.getItem("myFlashCards");
          if (datas) {
            const { languages, cards, cardItems, lastAdded } =
              JSON.parse(datas);
            this.languages = languages;
            this.cards = cards;
            this.cardItems = cardItems;
            this.cards.sort((a, b) => b.lastUpdate - a.lastUpdate);
            this.lastAdded = lastAdded ? lastAdded : [];
          }
        }
        resolve(true);
      });
    },
    addNewCard(card, message) {
      this.cards.unshift(card);
      this.cardItems[card.title] = [];
      useSaveLocal();
      useSaveFirebase();
    },
    removeCard(category, id) {
      const newCardArray = this.cards.filter((e) => e.id != id);
      this.cards = newCardArray;
      delete this.cardItems[category];
      useSaveLocal();
      useSaveFirebase();
    },
    addNewItem(category, item) {
      item.langFrom = this.languages.from.slice(0, 2);
      item.langTo = this.languages.to.slice(0, 2);
      this.cardItems[category].unshift(item);
      let cardToUpdate = this.cards.find((e) => e.title === category);
      cardToUpdate.lastUpdate = Date.now();
      this.cards.sort((a, b) => b.lastUpdate - a.lastUpdate);

      if (this.lastAdded.length > 6) {
        this.lastAdded.unshift(item);
        this.lastAdded.splice(-1);
      } else {
        this.lastAdded.unshift(item);
      }
      useSaveLocal();
      useSaveFirebase();
    },
    removeItem(category, id, remember) {
      this.languages.remember ? null : (this.languages.remember = 0);
      remember ? this.languages.remember++ : null;
      this.cardItems[category] = this.cardItems[category].filter(
        (e) => e.id != id
      );
      useSaveLocal();
      useSaveFirebase();
    },
    setParams(params) {
      this.languages = params;
      useSaveLocal();
      useSaveFirebase();
    },
  },
});
