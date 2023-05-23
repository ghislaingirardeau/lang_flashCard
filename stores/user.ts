import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useFirebaseAuth, useCurrentUser, getCurrentUser } from "vuefire";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as UserInfo | null,
  }),
  actions: {
    async login(userData: UserForm) {
      return new Promise(async (resolve, reject) => {
        try {
          const auth: any = useFirebaseAuth();
          const userLog = await signInWithEmailAndPassword(
            auth,
            userData.value.email,
            userData.value.password
          );

          if (userLog) {
            this.authListener(auth);
            resolve({
              result: true,
              message: "",
            });
          }
        } catch (error) {
          console.log("signUp", error);
          resolve({
            result: false,
            message: "This email or password doesn't exist",
          });
        }
      });
    },
    async signin(userData: UserForm) {
      return new Promise(async (resolve, reject) => {
        try {
          const auth: any = useFirebaseAuth();
          console.log(auth, "signIn");
          const newUser = await createUserWithEmailAndPassword(
            auth,
            userData.value.email,
            userData.value.password
          );
          if (newUser) {
            console.log("Register the new user", newUser);
            await updateProfile(auth.currentUser, {
              displayName: userData.value.name,
            });
            this.authListener(auth);
            resolve({
              result: true,
              message: "",
            });
          }
        } catch (error) {
          console.log("signIn error", error);
          resolve({
            result: false,
            message: error,
          });
        }
      });
    },
    authListener(auth: any) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("Listen to auth", user);
          this.user = {
            name: user.displayName,
            id: user.uid,
          };
          // ...
        } else {
          console.log("user is signed out");
          this.user = null;
        }
      });
    },
    signOut() {
      const auth: any = useFirebaseAuth();
      signOut(auth);
    },
  },
});

interface UserInfo {
  name: string | null;
  id: string;
}

interface UserForm {
  value: {
    name: string;
    email: string;
    password: string;
  };
}
