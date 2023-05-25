// ON CLICK ON ACCOUNT ICON OR LOGOUT
export function useUserAccount(
  getUser: Type<object>,
  userStore: StoreInfo,
  account: Account
) {
  account.errorMessage = "";
  getUser.value ? userStore.signOut() : (account.show = true);
}

// ON CLICK VALIDATE THE MODAL, SIGN IN OR UP
export async function useUserSign(
  payload: boolean,
  userStore: StoreInfo,
  userData: UserForm,
  account: Account
) {
  account.loading = true;
  if (payload) {
    if (account.signUp) {
      const userLoad = await userStore.signin(userData);
      userLoad.result
        ? (account.show = false)
        : (account.errorMessage = userLoad.message);
    } else {
      const userLoad = await userStore.login(userData);
      userLoad.result
        ? (account.show = false)
        : (account.errorMessage = userLoad.message);
    }
  } else {
    account.show = false;
  }
  account.loading = false;
}

interface StoreInfo {
  signOut: Function;
  signin: Function;
  login: Function;
}

interface Type<U> {
  value: U;
}

interface UserForm {
  value: {
    name: string;
    email: string;
    password: string;
  };
}

interface Account {
  show: boolean;
  loading: boolean;
  signUp: boolean;
  errorMessage: string;
}
