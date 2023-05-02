export function useSaveToLs(cards, cardItems, languages, lastAdded) {
  localStorage.setItem(
    "myFlashCards",
    JSON.stringify({
      cards,
      cardItems,
      languages,
      lastAdded,
    })
  );
}
