import React, { useState, useContext, useEffect } from "react";
import { auth, db } from "./base";
import { signOut } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import sudokuicon from './sudokuicon.png'

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [currentPuzzle, setCurrentPuzzle] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      const starCountRef = ref(db, "users/" + currentUser.uid);
      onValue(starCountRef, (snapshot) => {
        if (snapshot.exists()) {
          var data = snapshot.val();
          setUsername(data.firstName + " " + data.lastName);
          setCurrentPuzzle(data.currentPuzzle);
        }
      });
    }
  }, [currentUser]);

  const clickLogin = () => {
    if (currentUser) {
      signOut(auth);
    } else {
      navigate("/login");
    }
  };

  const clickSignup = () => {
    navigate("/signup");
  };

  const clickNewGame = ()=> {
    navigate('/newGame');
  };

  const clickContinue = ()=> {
    navigate('/game', {state:{difficulty: 'Easy', cont: true}})
  };

  return (
    <div className="mainContainer">
      <div className="homeContainer">
      <div className="content">
      <h1>SudokuWeb</h1>
      <img src={sudokuicon} alt="Sudoku Icon" style={{width:70, height:70, marginBottom:20}}/>
      {currentUser && <p>Welcome, {username}</p>}
      <div>
        {currentUser && currentPuzzle !== "" && <button className="buttons" onClick={clickContinue}>Continue</button>}
        {currentUser && <button className="buttons" onClick={clickNewGame}>New Game</button>}
        <button className="buttons" onClick={clickLogin}>
          {currentUser ? "Log Out" : "Login"}
        </button>
        {!currentUser && <button className="buttons"onClick={clickSignup}>Sign Up</button>}
      </div>
      </div>
      </div>
    </div>
  );
}
export default Home;