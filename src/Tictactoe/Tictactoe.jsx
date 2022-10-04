import React, { useEffect, useState } from "react";
import "./Tictactoe.css";
import { AiOutlineClose, AiTwotoneDownCircle } from "react-icons/ai";
import { GiTabletopPlayers } from "react-icons/gi";
const Tictactoe = () => {
  const [turn, setTurn] = useState("X");
  const [cell, setCell] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const [player1Winn, setPlayer1Winn] = useState(
    localStorage.getItem("player1")
  );
  const [player2Winn, setPlayer2Winn] = useState(
    localStorage.getItem("player2")
  );
  const [draw, setDraw] = useState(localStorage.getItem("draw"));
  const checkForWinner = (square) => {
    const board = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < board.length; i++) {
      const [a, b, c] = board[i];
      if (square[a] && square[a] === square[b] && square[b] === square[c]) {
        setWinner(square[a]);
        if (square[a] === "X") {
          setPlayer1Winn(Number(player1Winn) + 1);
          localStorage.setItem("player1", Number(player1Winn) + 1);
        } else {
          setPlayer2Winn(Number(player2Winn) + 1);
          localStorage.setItem("player2", Number(player2Winn) + 1);
        }
      }
    }
  };
  const handleClick = (num) => {
    if (cell[num] !== "") {
      alert("already clicked");
      return;
    }
    if (winner) {
      alert("already get winner");
      return;
    }
    let square = [...cell];

    if (turn === "X") {
      square[num] = "X";
      setTurn("O");
    } else {
      square[num] = "O";
      setTurn("X");
    }
    checkForWinner(square);
    setCell(square);
    const checkArrayComplete = square.every((arr) => {
      return arr !== "";
    });
    if (checkArrayComplete && winner?.length === 0) {
      alert("draw");
      setDraw(Number(draw) + 1);
      setWinner("draw");
      localStorage.setItem("draw", Number(draw) + 1);
    }
  };

  const Cell = ({ num, className }) => {
    return (
      <div onClick={() => handleClick(num)} className={className}>
        {cell[num] === "X" && <AiOutlineClose />}
        {cell[num] === "O" && <AiTwotoneDownCircle />}
      </div>
    );
  };
  const restartGame = () => {
    setCell(Array(9).fill(""));
    setWinner("");
    setTurn("X");
  };
  useEffect(() => {
    if (localStorage.getItem("player1") == null) {
      setPlayer1Winn(0);
    }
    if (localStorage.getItem("player2") == null) {
      setPlayer2Winn(0);
    }
    if (localStorage.getItem("draw") == null) {
      setDraw(0);
    }
  }, []);
  return (
    <div className="container">
      <h1 style={{ color: "white" }}>Tictactoe3</h1>
      <div className="row">
        <Cell num={0} className="border-top-left" />
        <Cell num={1} className="border-top" />
        <Cell num={2} className="border-top-right" />
      </div>
      <div className="row">
        <Cell num={3} className="border-middle-left" />
        <Cell num={4} className="border-middle" />
        <Cell num={5} className="border-middle-right" />
      </div>

      <div className="row">
        <Cell num={6} className="border-bottom-left" />
        <Cell num={7} className="border-bottom" />
        <Cell num={8} className="border-bottom-right" />
      </div>

      <div style={{ display: "flex" }}>
        <div
          style={{
            marginRight: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4>PLAYER 1 (X)</h4>
          <h4>{player1Winn}</h4>
        </div>
        <div
          style={{
            marginRight: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4>TIE</h4>
          <h4>{draw}</h4>
        </div>
        <div
          style={{
            marginRight: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4>Player 2 (O)</h4>
          <h4>{player2Winn}</h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GiTabletopPlayers size={40} />
          <h4>2p</h4>
        </div>
      </div>

      {winner && (
        <div style={{ marginTop: 50 }}>
          {winner !== "draw" && (
            <h3>Winner: {winner === "X" ? "PLAYER 1" : "PLAYER 2"}</h3>
          )}
          <button
            onClick={restartGame}
            style={{
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Tictactoe;
