// ON CLICK ON ACCOUNT ICON OR LOGOUT
export function useUserAccount(userStore: StoreInfo, account: Account): void {
  const getUser = useCurrentUser();
  account.errorMessage = "";
  /* getUser.value ? userStore.signOut() : (account.show = true); */
  if (getUser.value) {
    setTimeout(() => {
      userStore.signOut();
    }, 400);
    const accountIcon = document.getElementById("account-icon") as HTMLElement;
    let keyframes = [
      {
        opacity: 0,
        transform: "rotateZ(45deg)",
        offset: 0.5,
      },
    ];
    accountIcon.animate(keyframes, {
      duration: 800,
      fill: "forwards",
    });
  } else {
    account.show = true;
  }
}

// ON CLICK VALIDATE THE MODAL, SIGN IN OR UP
export async function useUserSign(
  payload: boolean,
  userStore: StoreInfo,
  userData: UserForm,
  account: Account
): Promise<void> {
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

export async function useUserSignWithGoogle(
  userStore: StoreInfo,
  account: Account
): Promise<void> {
  try {
    account.loading = true;
    const userLoad = await userStore.signWithGoogle();
    userLoad.result
      ? (account.show = false)
      : (account.errorMessage = userLoad.message);
    account.loading = false;
  } catch (error) {
    console.log(error);
  }
}

interface StoreInfo {
  signOut: Function;
  signin: Function;
  login: Function;
  signWithGoogle: Function;
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
