import { ref as dbRef, set as dbset } from "firebase/database";

export function useSaveLocal() {
  const cardStore = useCardsStore();
  const { languages, cardItems, cards, lastAdded } = cardStore;
  localStorage.setItem(
    "myFlashCards",
    JSON.stringify({ languages, cardItems, cards, lastAdded })
  );
}

export function useSaveFirebase(userUid: string) {
  const database = useDatabase();
  const cardStore = useCardsStore();

  const uid: string = userUid ? userUid : (useUserStore()?.user?.id as string);
  const { languages, cardItems, cards, lastAdded } = cardStore;
  /* const dataToSave: CardStore = {
    languages,
    cardItems,
    cards,
    lastAdded,
  }; */
  dbset(dbRef(database, uid), {
    languages,
    cardItems,
    cards,
    lastAdded,
  });
}

interface CardStore {
  languages: object;
  cardItems: object;
  cards: any[];
  lastAdded: any[];
}
