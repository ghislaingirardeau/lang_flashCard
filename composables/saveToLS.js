export function useSaveToLs(cards, cardItems, languages) {
  localStorage.setItem(
    "myFlashCards",
    JSON.stringify({
      cards,
      cardItems,
      languages,
    })
  );
}
