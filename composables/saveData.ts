import { ref as dbRef, set as dbset } from "firebase/database";

// SAVE IN LOCALSTORAGE
export function useSaveLocal() {
  const cardStore = useCardsStore();
  const { languages, cardItems, cards, lastAdded } = cardStore;
  localStorage.setItem(
    "myFlashCards",
    JSON.stringify({ languages, cardItems, cards, lastAdded })
  );
}

//SAVE IN FIREBASE
export function useSaveFirebase(userUid: string): void {
  const userStore = useUserStore();
  if (userStore.user || userUid) {
    const database = useDatabase();
    const cardStore = useCardsStore();
    // flashcard store, I don't have access to the user id
    const uid = userUid ? userUid : (userStore.user?.id as string);
    const { languages, cardItems, cards, lastAdded } = cardStore;
    dbset(dbRef(database, uid), {
      languages,
      cardItems,
      cards,
      lastAdded,
    });
  }
}

// LOAD FROM FIREBASE TO STORE ON LOAD (flashcard store) OR ON LOGIN (user store)
export async function useLoadDataToStore(uid: string): Promise<void> {
  const cardStore: CardStore = useCardsStore();
  const database = useDatabase();
  const { promise } = useDatabaseObject(dbRef(database, uid));
  const datas: CardStore | any = await promise.value;

  // firebase not save empty [], so have to build on load if empty
  if (datas.cards.length != Object.keys(datas.cardItems).length) {
    datas.cards.forEach((e: { title: string }) => {
      datas.cardItems[e.title] ? null : (datas.cardItems[e.title] = []);
    });
  }

  cardStore.languages = datas.languages;
  cardStore.cards = datas.cards;
  cardStore.cardItems = datas.cardItems;
  cardStore.lastAdded = datas.lastAdded;
  cardStore.cards.sort((a, b) => b.lastUpdate - a.lastUpdate);
}

interface CardStore {
  languages: object;
  cardItems: object;
  cards: any[];
  lastAdded: any[];
}
