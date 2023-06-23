import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
  GoogleAuthProvider, // if we want to add other form of login
  GithubAuthProvider, // if we want to add other form of login
  signInWithPopup, // if we want to add other form of login
  signOut,
} from "firebase/auth";
import { useFirebaseAuth, useCurrentUser, getCurrentUser } from "vuefire";
import { useSaveFirebase, useLoadDataToStore } from "@/composables/saveData";
import { ref as dbRef, set as dbset } from "firebase/database";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as UserInfo | null,
  }),
  actions: {
    async login(userData: UserForm, message: string): Promise<Resolve> {
      return new Promise(async (resolve, reject) => {
        try {
          const auth: any = useFirebaseAuth();
          // IF I WANT TO SET THE PERSISTENCE FO THE CONNECTION
          /* const persistence = await setPersistence(
            auth,
            browserSessionPersistence
          ); */

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
            message: message,
          });
        }
      });
    },
    async signin(userData: UserForm, message: string): Promise<Resolve> {
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
            message: message,
          });
        }
      });
    },
    async signWithGoogle(message: string): Promise<Resolve> {
      return new Promise(async (resolve, reject) => {
        try {
          const auth: any = useFirebaseAuth();
          // LOG / SIGN WITH GOOGLE
          const googleProvider = new GoogleAuthProvider();
          const userGoogle = await signInWithPopup(auth, googleProvider);
          console.log(userGoogle);
          if (userGoogle) {
            this.authListener(auth);
            // CHECK IF THE USER ALREADY EXIST BY CHECKING THE UID IN DATABASE
            const database = useDatabase();
            const { promise } = useDatabaseObject(
              dbRef(database, userGoogle.user.uid)
            );
            const datas: CardStore | any = await promise.value;
            datas
              ? useLoadDataToStore(userGoogle.user.uid) // User already exist
              : useSaveFirebase(userGoogle.user.uid); // New user

            resolve({
              result: true,
              message: "",
            });
          }
        } catch (error) {
          console.log(error);
          resolve({
            result: false,
            message: message,
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
