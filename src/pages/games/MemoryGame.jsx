import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, Card, Stack, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import bg from '../../images/gamebg3.jpg'

const MemoryGame = () => {

  // const [flippedIndex, setFlippedIndex] = useState(null) //for singlecard
  const [firstCard, setFirstCard] = useState(null)
  const [secondCard, setSecondCard] = useState(null)
  const [matchedCards, setMatchedCards] = useState([]);
  const [time, setTime] = useState(0);      // time in seconds
  const [isRunning, setIsRunning] = useState(true); //timer on/off

  //cards list
  const cardData = [
    "🍎", "🍌", "🍇", "🍉",
    "🍓", "🍒", "🥝", "🍍",
    "🍎", "🍌", "🍇", "🍉",
    "🍓", "🍒", "🥝", "🍍",
  ];

  //Match cards
  useEffect(() => {
    if (firstCard !== null && secondCard !== null) {

      if (cardData[firstCard] === cardData[secondCard]) {
        setMatchedCards((prev) => [...prev, firstCard, secondCard]);
      }

      setTimeout(() => {
        setFirstCard(null);
        setSecondCard(null);
      }, 1000);
    }

  }, [firstCard, secondCard]);

  //Timer
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  //stop timer when game complete 
  useEffect(() => {
    if (matchedCards.length === cardData.length && cardData.length > 0) {
      setIsRunning(false)
      toast.success("🎉 Congratulations! You Win!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, [matchedCards])

  //onclick 
  const handleClick = (index) => {

    if (
      index === firstCard ||
      index === secondCard ||
      matchedCards.includes(index)
    ) return;

    firstCard === null
      ? setFirstCard(index)
      : setSecondCard(index);
  }

  // format time
  const formatTime = () => {
    const min = Math.floor(time / 60)
    const sec = time % 60
    return `${min}:${sec < 10 ? "0" : ""}${sec}`
  }

  //reset game
  const resetGame = () => {
    setFirstCard(null);
    setSecondCard(null);
    setMatchedCards([]);
    setTime(0);
    setIsRunning(true);
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
        }}
      >

        <Card
          sx={{
            width: 550,
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
            mb={1}
            fontWeight="bold"
          >
            Memory Game
          </Typography>

          {/* timer */}
          <Typography textAlign="center" mb={2}>
            ⏱ Time: {formatTime()}
          </Typography>


          <Grid container spacing={2} justifyContent="center" sx={{ width: 460, margin: "auto", mb: 2 }}>
            {cardData.map((i, index) => (
              <Grid item key={i}>
                <Card
                  onClick={() => handleClick(index)}
                  sx={{
                    width: 80,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    cursor: "pointer",
                    backgroundColor: matchedCards.includes(index)
                      ? "#4caf50"
                      : "#1976d2",
                    color: "white",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    }
                  }}

                >
                  {matchedCards.includes(index) ||
                    index === firstCard ||
                    index === secondCard
                    ? i
                    : "❓"}
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Buttons */}
          <Stack spacing={1}>
            <Button
              variant="contained"
              onClick={resetGame} >
              Reset Game
            </Button>
            <Button
              variant="outlined"
              onClick={() => (window.location.href = "/dashboard")}
              sx={{ color: "#94a3b8" }}
            >
              ⬅ Back to Dashboard
            </Button>
          </Stack>

        </Card>
        <ToastContainer />
      </Box>
    </>
  )
}

export default MemoryGame



// flippedIndex → kaunsa card open (flip) hai
// setFlippedIndex → us value ko change karne ka function
// null → starting me koi card open nahi