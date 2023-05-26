import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useFirebaseAuth, useCurrentUser, getCurrentUser } from "vuefire";
import { useSaveFirebase, useLoadDataToStore } from "@/composables/saveData";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as UserInfo | null,
  }),
  actions: {
    async login(userData: UserForm): Promise<Resolve> {
      return new Promise(async (resolve, reject) => {
        try {
          const auth: any = useFirebaseAuth();
          const userLog = await signInWithEmailAndPassword(
            auth,
            userData.value.email,
            userData.value.password
          );

          if (userLog) {
            // APPLY THE LISTENER
            this.authListener(auth);
            // LOAD THE DATA FROM FIREBASE TO THE CARD STORE
            useLoadDataToStore(userLog.user.uid);
            resolve({
              result: true,
              message: "",
            });
          }
        } catch (error) {
          resolve({
            result: false,
            message: "This email or password doesn't exist",
          });
        }
      });
    },
    async signin(userData: UserForm): Promise<Resolve> {
      return new Promise(async (resolve, reject) => {
        try {
          const auth: any = useFirebaseAuth();
          const newUser = await createUserWithEmailAndPassword(
            auth,
            userData.value.email,
            userData.value.password
          );
          if (newUser) {
            await updateProfile(auth.currentUser, {
              displayName: userData.value.name,
            });
            // APPLY THE LISTENER
            this.authListener(auth);
            // SAVE THE DATA ALREADY SET WHEN NOT CONNECTED
            useSaveFirebase(newUser.user.uid);
            resolve({
              result: true,
              message: "",
            });
          }
        } catch (error) {
          console.log(error);
          resolve({
            result: false,
            message: "Email already use Or not connected",
          });
        }
      });
    },
    authListener(auth: any) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = {
            name: user.displayName,
            id: user.uid,
          };
          // ...
        } else {
          console.log("user is signed out");
        }
      });
    },
    signOut() {
      const auth: any = useFirebaseAuth();
      // RESET USER TO NULL
      this.user = null;
      // FCT FROM FIREBASE TO UNLOG
      signOut(auth);
      // RESET THE CARD STORE
      const cardStore: CardStore = useCardsStore();
      cardStore.languages = {
        from: "fr-FR",
        to: "km-KM",
        remember: 0,
        rate: 1,
      };
      cardStore.cards = [];
      cardStore.cardItems = {};
      cardStore.lastAdded = [];
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

interface CardStore {
  languages: object;
  cardItems: object;
  cards: any[];
  lastAdded: any[];
}

interface Resolve {
  result: boolean;
  message: string;
}
