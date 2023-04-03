const save = (cards, cardItems, languages) => {
  localStorage.setItem(
    "myFlashCards",
    JSON.stringify({
      cards,
      cardItems,
      languages,
    })
  );
};

export const useCardsStore = defineStore("cards", {
  state: () => ({
    languages: { from: "fr-FR", to: "km-KM", recorder: false, rate: 1 },
    cards: [],
    cardItems: {},
  }),
  actions: {
    nuxtServerInit() {
      return new Promise((resolve, reject) => {
        const datas = localStorage.getItem("myFlashCards");
        if (datas) {
          const { languages, cards, cardItems } = JSON.parse(datas);
          cards.map((e) => (e.lastUpdate = e.id));
          this.languages = languages;
          this.cards = cards;
          this.cardItems = cardItems;
          this.cards.sort((a, b) => b.lastUpdate - a.lastUpdate);
        }
        resolve(true);
      });
    },
    addNewCard(card, message) {
      if (this.cards.findIndex((e) => e.title === card.title) != -1)
        return alert(message);
      this.cards.unshift(card);
      this.cardItems[card.title] = [];
      save(this.cards, this.cardItems, this.languages);
    },
    removeCard(category, id) {
      const newCardArray = this.cards.filter((e) => e.id != id);
      this.cards = newCardArray;
      delete this.cardItems[category];
      save(this.cards, this.cardItems, this.languages);
    },
    addNewItem(category, item) {
      this.cardItems[category].unshift(item);
      let cardToUpdate = this.cards.find((e) => e.title === category);
      cardToUpdate.lastUpdate = Date.now();
      this.cards.sort((a, b) => b.lastUpdate - a.lastUpdate);
      save(this.cards, this.cardItems, this.languages);
    },
    removeItem(category, id) {
      this.cardItems[category] = this.cardItems[category].filter(
        (e) => e.id != id
      );
      save(this.cards, this.cardItems, this.languages);
    },
    setParams(params) {
      this.languages = params;
      save(this.cards, this.cardItems, this.languages);
    },
  },
});
