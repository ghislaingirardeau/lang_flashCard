export default defineNuxtRouteMiddleware(async (to, from) => {
  if (from.fullPath === to.fullPath) {
    const switchLocalePath = useSwitchLocalePath();
    const i18nLocale = useNuxtApp().$i18n.locale.value;
    const cardsStore = useCardsStore();
    const user = await getCurrentUser();
    const res = await cardsStore.nuxtServerInit(user);
    if (res && i18nLocale != cardsStore.languages.from.slice(0, 2)) {
      return navigateTo(
        switchLocalePath(cardsStore.languages.from.slice(0, 2))
      );
    }
  }
});
