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
    languages: { from: "fr-FR", to: "km-KM" },
    cards: [],
    cardItems: {},
  }),
  actions: {
    nuxtServerInit() {
      return new Promise((resolve, reject) => {
        const datas = localStorage.getItem("myFlashCards");
        if (datas) {
          const { languages, cards, cardItems } = JSON.parse(datas);
          this.languages = languages;
          this.cards = cards;
          this.cardItems = cardItems;
        }
        resolve(true);
      });
    },
    addNewCard(card) {
      this.cards.push(card);
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
      this.cardItems[category].push(item);
      save(this.cards, this.cardItems, this.languages);
    },
    removeItem(category, id) {
      this.cardItems[category] = this.cardItems[category].filter(
        (e) => e.id != id
      );
      save(this.cards, this.cardItems, this.languages);
    },
    setLang(from, lang) {
      from ? (this.languages.from = lang) : (this.languages.to = lang);
      save(this.cards, this.cardItems, this.languages);
    },
  },
});
