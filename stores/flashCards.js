import { useSaveToLs } from "@/composables/saveToLS";

export const useCardsStore = defineStore("cards", {
  state: () => ({
    languages: { from: "fr-FR", to: "km-KM", recorder: false, rate: 1 },
    cards: [],
    cardItems: {},
    lastAdded: [],
  }),
  getters: {
    langTo: (state) => state.languages.to.slice(-2),
    langFrom: (state) => state.languages.from.slice(-2),
  },
  actions: {
    nuxtServerInit() {
      return new Promise((resolve, reject) => {
        const datas = localStorage.getItem("myFlashCards");
        if (datas) {
          const { languages, cards, cardItems, lastAdded } = JSON.parse(datas);
          this.languages = languages;
          this.cards = cards;
          this.cardItems = cardItems;
          this.cards.sort((a, b) => b.lastUpdate - a.lastUpdate);
          this.lastAdded = lastAdded ? lastAdded : [];
        }

        resolve(true);
      });
    },
    addNewCard(card, message) {
      this.cards.unshift(card);
      this.cardItems[card.title] = [];
      useSaveToLs(this.cards, this.cardItems, this.languages, this.lastAdded);
    },
    removeCard(category, id) {
      const newCardArray = this.cards.filter((e) => e.id != id);
      this.cards = newCardArray;
      delete this.cardItems[category];
      useSaveToLs(this.cards, this.cardItems, this.languages, this.lastAdded);
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
      useSaveToLs(this.cards, this.cardItems, this.languages, this.lastAdded);
    },
    removeItem(category, id) {
      this.cardItems[category] = this.cardItems[category].filter(
        (e) => e.id != id
      );
      useSaveToLs(this.cards, this.cardItems, this.languages, this.lastAdded);
    },
    setParams(params) {
      this.languages = params;
      useSaveToLs(this.cards, this.cardItems, this.languages, this.lastAdded);
    },
  },
});
