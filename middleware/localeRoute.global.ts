export default defineNuxtRouteMiddleware(async (to, from) => {
  // for the load page & if locale are != , to set the store and go to the correct navigation locale
  // otherwise load the default locale then navigate again to the correct local
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
