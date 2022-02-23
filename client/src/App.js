import "./App.css";
import "firebase/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Fragment, useEffect, useState } from "react";
import ListOfTodo from "./components/ListOfTodo";
import firebaseconfig from "./config/firebase-config";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setValueDate] = useState("");

  const registerUser = async (token) => {
    console.log(token);
    const register = await axios.post("https://lepasaja-backend.herokuapp.com/api/v1/register",null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(register);
  };

  const loginWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        window.localStorage.setItem("auth", "true");
        setAuth(true);
        onAuthStateChanged(auth, (user) => {
          if (user) {
            user.getIdToken().then(async (token) => {
              // console.log(token);
              await registerUser(token);
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("logout");
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("logout success");
        localStorage.setItem("auth", "");
      })
      .catch((error) => console.log(error));
  };

  const handleFormSubmit = () => {
    console.log("login");
    const auth = getAuth(firebaseconfig);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCre) => {
        // console.log("berhasil");
        console.log(userCre);
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
          // console.log(user);
          user.getIdToken().then((token) => {
            // console.log(token);
            setToken(token);
          });
          window.localStorage.setItem("auth", "true");
          setAuth(true);
        }
      });
    };
    getLoginUser();
    // getRooms();
  }, []);

  const getRooms = async () => {
    try {
      const rooms = await axios.get("http://127.0.0.1:8080/api/v1/rooms");
      const data = rooms.data;

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {auth ? (
        <ListOfTodo token={token} handleLogout={handleLogout} />
      ) : (
        <Fragment>
          <button onClick={loginWithGoogle}>login with google</button>
          <br /> OR <br />
          <form onSubmit={handleFormSubmit}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" />
          </form>{" "}
          <br />
          <br />
          <input
            type="date"
            name="date"
            onChange={(e) => setValueDate(e.target.value)}
          />
        </Fragment>
      )}
    </div>
  );
}

export default App;
