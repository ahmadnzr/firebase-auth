import "./App.css";
import "firebase/auth";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import ListOfTodo from "./components/ListOfTodo";

function App() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  const loginWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        window.localStorage.setItem("auth", "true");
        setAuth(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const getLoginUser = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          user.getIdToken().then((token) => {
            setToken(token);
          });
          window.localStorage.setItem("auth", "true");
          setAuth(true);
        }
      });
    };
    getLoginUser();
  }, []);
  return (
    <div className="App">
      {auth ? (
        <ListOfTodo token={token}/>
      ) : (
        <button onClick={loginWithGoogle}>login with google</button>
      )}
    </div>
  );
}

export default App;
