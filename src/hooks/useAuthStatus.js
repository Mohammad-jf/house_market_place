import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthStatus = () => {
  const [logedIn, setLogedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogedIn(true);
      }
      setCheckingStatus(false);
    });
  });

  return { logedIn, checkingStatus };
};

export default useAuthStatus;
