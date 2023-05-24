// ON CLICK ON ACCOUNT ICON OR LOGOUT
export function useUserAccount(
  getUser: Type<object>,
  userStore: StoreInfo,
  dialogLogin: Type<boolean>
) {
  getUser.value ? userStore.signOut() : (dialogLogin.value = true);
}

// ON CLICK VALIDATE THE MODAL, SIGN IN OR UP
export async function useUserSign(
  payload: boolean,
  signUp: Type<boolean>,
  userStore: StoreInfo,
  userData: UserForm,
  dialogLogin: Type<boolean>
) {
  if (payload) {
    if (signUp.value) {
      const userLoad = await userStore.signin(userData);
      userLoad.result ? console.log("success") : alert(userLoad.message);
    } else {
      const userLoad = await userStore.login(userData);
      userLoad.result ? console.log("success") : alert(userLoad.message);
    }
  }
  dialogLogin.value = false;
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
