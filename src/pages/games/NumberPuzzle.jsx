import React, { useEffect, useState } from 'react'
import { Box, Card, Typography, Stack, Button } from "@mui/material";
import bg from '../../images/gamebg3.jpg'

const NumberPuzzle = () => {

    //start board
    const startBoard = [
        1, 2, 3,
        4, 5, 6,
        7, 8, null
    ]

    //game board
    const [board, setBoard] = useState(startBoard)
    const [moves, setMoves] = useState(0)

    // shuffle board
    const shuffleBoard = () => {
        const mix = [...startBoard].sort(() => Math.random() - 0.5);
        setBoard(mix);
    };

    // game start me shuffle
    useEffect(() => {
        shuffleBoard()
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = (index) => {
        //find index of empty box
        const emptyIndex = board.indexOf(null) //8
        // console.log(emptyIndex)

        if (index === emptyIndex - 1 || //left num
            index === emptyIndex + 1 || //right num
            index === emptyIndex - 3 || //up num
            index === emptyIndex + 3    //down num
        ) {
            const newBoard = [...board]
            newBoard[emptyIndex] = board[index] //clicked num move to empty box
            newBoard[index] = null //num ki jagah pe empty set
            setBoard(newBoard) //screen update

            setMoves(moves + 1) //move count
        }
    }
    // win check
    const isWin = board.join() === startBoard.join();

    // reset game
    const resetGame = () => {
        shuffleBoard()
         setMoves(0)
    };

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
                    px: 1,
                }}
            >
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 420,
                        p: { xs: 2, sm: 3 },
                        borderRadius: 4,
                        background: "linear-gradient(180deg,#0f172a,#020617)",
                        color: "#fff",
                    }}
                >
                    <Typography variant="h5" textAlign="center" fontWeight="bold">
                        Number Puzzle Game
                    </Typography>
                    <Typography textAlign="center" sx={{ mt: 1 }}>
                        Moves: {moves}
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 100px)",
                            gap: 2,
                            justifyContent: "center",
                            my: 2
                        }}
                    >
                        {board.map((num, index) => (
                            <Card
                                key={index}
                                onClick={() => handleClick(index)}
                                sx={{
                                    height: 100,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    backgroundColor: num ? "#1976d2" : "#e0e0e0",
                                    color: num ? "#fff" : "#000"
                                }}
                            >
                                {num}
                            </Card>
                        ))}
                    </Box>
                    {isWin && (
                        <Typography textAlign="center" color="lightgreen" fontWeight="bold">
                            🎉 You Win!
                        </Typography>
                    )}
                    <Stack spacing={1.2}>
                        <Button variant="contained" onClick={resetGame} fullWidth>
                            Reset Game
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => (window.location.href = "/dashboard")}
                            sx={{ color: "#94a3b8" }}
                        >
                            ⬅ Back to Dashboard
                        </Button>
                    </Stack>
                </Card>
            </Box>
        </>
    )
}

export default NumberPuzzle
