export const useCardsStore = defineStore("cards", {
  state: () => ({
    languages: { from: "fr-FR", to: "km-KM" },
    cards: [
      {
        id: 1,
        title: "fruit",
        lastUpdate: "xxx",
        createOn: "xxx",
      },
      {
        id: 2,
        title: "veget",
        lastUpdate: "xxx",
        createOn: "xxx",
      },
    ],
    cardItems: {
      fruit: [
        {
          id: 123,
          from: "pomme",
          to: "apple",
          pronouce: "xxx",
        },
        {
          id: 1234,
          from: "banane",
          to: "banana",
          pronouce: "xxx",
        },
      ],
      veget: [
        {
          id: 1234,
          from: "cocombre",
          to: "ត្រសក់",
          pronouce: "xxx",
        },
      ],
    },
  }),
  actions: {
    addNewCard(card) {
      this.cards.push(item);
    },
    addNewItem(category, item) {
      this.cardItems[category].push(item);
    },
  },
});
