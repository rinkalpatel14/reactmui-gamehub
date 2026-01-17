import React, { useState } from 'react'
import { Box, Card, Typography, Stack, Button } from '@mui/material'
import bg from '../../images/gamebg3.jpg'

const TicTacToe = () => {

    //9 empty boxes
    const [board, setBoard] = useState(Array(9).fill(""))
    const [turn, setTurn] = useState("X")
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    const [winner, setWinner] = useState(null)
    const [winLine, setWinLine] = useState([])
    const [scores, setScores] = useState({
        X: 0,
        O: 0,
        Draw: 0
    });

    //winner check fun              0  1   2   3   4   5  6  7  8    
    const checkWinner = (b) => { //["X","X","X","","O","","","O",""]
        for (let pattern of winPatterns) { //[0,1,2]
            const [a, b1, c] = pattern //a->0,b1->1,c->2

            if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
                setWinLine(pattern)
                return b[a] //win
            }
        }

        // Draw check
        if (!b.includes("")) {
            return "Draw";
        }

        return null //winner nahi mila or game continue
    }



    const handleClick = (i) => {
        // console.log(i);
        console.log(i)

        // box fill then return
        if (board[i] !== "" || winner !== null) return

        //board copy
        let newBoard = [...board]
        newBoard[i] = turn
        setBoard(newBoard)

        let result = checkWinner(newBoard) //newBoard -> current array 

        if (result === "X" || result === "O") {
            setWinner(result); //winner find
            setScores({
                ...scores,
                [result]: scores[result] + 1
            })
        }
        else if (result === "Draw") {
            setWinner("Draw")
            setScores({
                ...scores,
                Draw: scores.Draw + 1
            })
        }
        else {
            setTurn(turn === "X" ? "O" : "X") //change turn
        }

    }

    //new game
    const newGame = () => {
        setBoard(Array(9).fill(""));
        setTurn(winner === "X" ? "O" : "X")//start newgame opposite of winner turn
        setWinner(null)
        setWinLine([]) //remove green line
    }

    //reset Scores
    const resetScores = () => {
        setScores({
            X:0,
            O:0,
            Draw:0
        });
        newGame();
    }

    return (
        <>

            <Box
                sx={{
                    minHeight: "100vh",
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Card
                    sx={{
                        width: 380,
                        p: 4,
                        borderRadius: 4,
                        background: "linear-gradient(180deg,#0f172a,#020617)",
                        color: "#fff",
                    }}
                >
                    {/* title */}
                    <Typography
                        variant="h4"
                        textAlign="center"
                        mb={3}
                        fontWeight="bold"
                    >
                        Tic Tac Toe
                    </Typography>

                    <Stack direction="row" spacing={1} justifyContent="center" mb={2}>
                        <Box sx={{ px: 2, py: 0.5, bgcolor: "#212641", borderRadius: 2 }}>
                            Player X: <b>{scores.X}</b>
                        </Box>

                        <Box sx={{ px: 2, py: 0.5, bgcolor: "#212641", borderRadius: 2 }}>
                            Draws: <b>{scores.Draw}</b>
                        </Box>

                        <Box sx={{ px: 2, py: 0.5, bgcolor: "#212641", borderRadius: 2 }}>
                            Player O: <b>{scores.O}</b>
                        </Box>
                    </Stack>

                    <Typography textAlign="center" mb={2} color="#94a3b8">
                        {winner
                            ? winner === "Draw" ? "It's a Draw 🤝" : `Winner : Player ${winner} 🎉`
                            : `Current Turn : Player ${turn}`}
                    </Typography>

                    {/* board */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 1,
                            mb: 2
                        }}
                    >
                        {board.map((cell, i) => (
                            <Box
                                key={i}
                                onClick={() => handleClick(i)}
                                sx={{
                                    height: 90,
                                    borderRadius: 2,
                                    background: winLine.includes(i)
                                        ? "linear-gradient(135deg,#22c55e,#4ade80)" // WIN
                                        : "#1e293b", //normal
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 40,
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    color:
                                        cell === "X"
                                            ? "#38bdf8"
                                            : cell === "O"
                                                ? "#f472b6"
                                                : "#fff",
                                    "&:hover": {
                                        transform: cell || winner ? "none" : "scale(1.05)", //cell=""& game run ->scale+hover
                                        background: cell || winner ? undefined : "#334155"//cell=""& game run ->scale+bg                                    }
                                    }
                                }}
                            >
                                {cell}
                            </Box>
                        ))}

                    </Box>

                    {/* Buttons */}
                    <Stack spacing={1}>
                        <Button variant="contained" onClick={newGame}>
                            New Game
                        </Button>
                        <Button variant="outlined" onClick={resetScores}>
                            Reset Scores
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => (window.location.href = "/dashboard")}
                            sx={{ color: "#94a3b8" }}
                        >
                            ⬅ Back to Dashboard
                        </Button>
                    </Stack>

                </Card >
            </Box >

        </>
    )
}

export default TicTacToe


















//winLine.includes(i) includes(i) check karta hai ki current box ka index winning pattern ka part hai ya nahi.
// [0,1,2].includes(1); // true
// [0,1,2].includes(4); // false
// background: winLine.includes(i)
//   ? "green"
//   : "normal
