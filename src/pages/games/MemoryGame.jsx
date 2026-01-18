import React, { useEffect, useState } from 'react'
import { Box, Typography, Card, Stack, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import bg from '../../images/gamebg3.jpg'

//cards list
const CARD_DATA = [
  "🍎", "🍌", "🍇", "🍉",
  "🍓", "🍒", "🥝", "🍍",
  "🍎", "🍌", "🍇", "🍉",
  "🍓", "🍒", "🥝", "🍍",
];

const maxTime = 60; // 60 sec


const MemoryGame = () => {

  // const [flippedIndex, setFlippedIndex] = useState(null) //for singlecard
  const [firstCard, setFirstCard] = useState(null)
  const [secondCard, setSecondCard] = useState(null)
  const [matchedCards, setMatchedCards] = useState([]);
  const [time, setTime] = useState(0);      // time in seconds
  const [isRunning, setIsRunning] = useState(true); //timer on/off
  const [gameOver, setGameOver] = useState(false) //game over set

  const cardData = CARD_DATA

  //Match cards
  useEffect(() => {
    if (firstCard !== null && secondCard !== null) {

      if (cardData[firstCard] === cardData[secondCard]) {
        setMatchedCards(prev => [...prev, firstCard, secondCard])
      }

      const timer = setTimeout(() => {
        setFirstCard(null)
        setSecondCard(null)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [firstCard, secondCard, cardData])

  //Timer effect
  useEffect(() => {
    if (!isRunning || gameOver) return;

    const interval = setInterval(() => {
      setTime(prev => {
        if (prev + 1 >= maxTime) {
          clearInterval(interval);
          setIsRunning(false);
          setGameOver(true); // fix

          toast.error("⏰ Time Over! Game Over", {
            position: "top-center",
            autoClose: 3000,
          });

          return maxTime;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, gameOver]);

  //stop timer when game complete 
  useEffect(() => {
    if (matchedCards.length === cardData.length && cardData.length > 0) {
      setIsRunning(false)
      toast.success("🎉 Congratulations! You Win!", {
        position: "top-center",
        autoClose: 3000,
      })
    }
  }, [matchedCards, cardData])

  //handleClick 
  const handleClick = (index) => {
    if (gameOver ||
      index === firstCard ||
      index === secondCard ||
      matchedCards.includes(index)
    ) return

    firstCard === null
      ? setFirstCard(index)
      : setSecondCard(index)
  }

  // format time
  const formatTime = () => {
    const min = Math.floor(time / 60)
    const sec = time % 60
    return `${min}:${sec < 10 ? "0" : ""}${sec}`
  }

  //reset game
  const resetGame = () => {
    setFirstCard(null)
    setSecondCard(null)
    setMatchedCards([])
    setTime(0)
    setIsRunning(true)
    setGameOver(false)
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
            Memory Game
          </Typography>

          <Typography textAlign="center" mb={2}>
            ⏱ Time: {formatTime()} / {Math.floor(maxTime / 60)}:
            {maxTime % 60 < 10 ? "0" : ""}{maxTime % 60}
          </Typography>

          {/* gane cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)", //always 4 per row
              gap: 1.5,
              mb: 2,
            }}
          >
            {cardData.map((item, index) => (
              <Card
                key={index}
                onClick={() => handleClick(index)}
                sx={{
                  aspectRatio: "1 / 1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(18px, 4vw, 28px)",
                  cursor: "pointer",
                  backgroundColor: matchedCards.includes(index)
                    ? "#4caf50"
                    : "#1976d2",
                  color: "#fff",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                {matchedCards.includes(index) ||
                  index === firstCard ||
                  index === secondCard
                  ? item
                  : "❓"}
              </Card>
            ))}
          </Box>

          <Stack spacing={1.2}>
            <Button variant="contained" fullWidth onClick={resetGame}>
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

        <ToastContainer />
      </Box>
    </>
  )
}

export default MemoryGame



// flippedIndex → kaunsa card open (flip) hai
// setFlippedIndex → us value ko change karne ka function
// null → starting me koi card open nahi