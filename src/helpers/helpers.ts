import { User } from "../common/types";
import firebase from "firebase/app";
import { useEffect } from "react";
import { useState } from "react";

interface UserHook {
  user?: User,
  isLoading: boolean
  error?: Error
}

export const getUser = () => firebase.app().auth().currentUser as firebase.User

export const useUser = (): UserHook => {
  const [data, setData] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const user = getUser()
  const userId = user.uid;
  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const user = await firebase.firestore().doc(`users/${userId}`);
      const userData = (await user.get()).data() as User;
      if (userData) {
        setData({ ...userData, id: userId })
      }
      setIsLoading(false);
    })();
  }, [userId])
  return { user: data, isLoading }
}
