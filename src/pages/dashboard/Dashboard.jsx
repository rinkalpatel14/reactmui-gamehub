import React, { useEffect, useState } from 'react'
import { Box, Typography, Avatar, Button, TextField, Chip, Grid, Card } from '@mui/material'
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExtensionIcon from "@mui/icons-material/Extension";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import '../dashboard/Dashboard.css'

const Dashboard = () => {

    const [user, setUser] = useState(null)
    const history = useHistory()
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");


    useEffect(() => { //page load then it's run
        const currentUser = JSON.parse(localStorage.getItem("currentUser")); //saved user
        setUser(currentUser);
    }, []);

    //logout
    const handleLogout = () => {
        localStorage.removeItem("currentUser")
        history.push("login");
    }

    //filter list
    const filters = [
        { label: "All Games", value: "all", icon: <SportsEsportsIcon /> },
        { label: "Favourite", value: "fav", icon: <FavoriteIcon /> },
        { label: "Puzzle", value: "puzzle", icon: <ExtensionIcon /> },
        { label: "Memory", value: "memory", icon: <PsychologyIcon /> },
        { label: "Strategy", value: "strategy", icon: <SportsEsportsIcon /> },
    ];

    //game cards 
    const games = [
        {
            title: "Tic Tac Toe",
            desc: "Classic strategy game for two players",
            image: "https://play-lh.googleusercontent.com/PSlhhcMnV8uluMcBa20DcgkbbkFu08PeNapBzGiFXQaJTwOsUmbndiqlZqNCcy9OB-kY=w1024",
            category: "strategy",
            favourite: true,
            route: "/tic-tac-toe"
        },
        {
            title: "Number Puzzle",
            desc: "Solve the sliding puzzle challenge",
            image: "https://mumu-global.fp.ps.easebar.com/file/6125fbc3f5e7bb0c23c57bcfcUxBjvWz02",
            category: "puzzle",
            favourite: false,
            route: "/number-puzzle"
        },
        {
            title: "Memory Game",
            desc: "Match pairs and test your memory",
            image: "https://slidechef.net/wp-content/uploads/2024/08/memory-game-template.jpg",
            category: "memory",
            favourite: true,
            route: "/memory-game"
        },
    ];

    //filter  games
    const filteredGames = games.filter((game) => {
        const matchSearch =
            game.title.toLowerCase().includes(search.toLowerCase()) ||
            game.desc.toLowerCase().includes(search.toLowerCase());

        const matchCategory =
            category === "all" ||
            (category === "fav" && game.favourite) ||
            game.category === category;

        return matchSearch && matchCategory;
    });

    return (
        <>
            <Box sx={{
                minHeight: "100vh",
                backgroundImage: `linear-gradient(rgba(2,6,23,0.82), rgba(2,6,23,0.82)),url()`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                overflow: 'hidden'
            }}>
                {/* header */}
                <Box
                    sx={{
                        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
                        backdropFilter: "blur(16px)",
                        px: 3,
                        py: 1.3,
                        mb: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid rgba(255,255,255,0.15)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.55)",
                    }}
                >
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Avatar
                            sx={{
                                bgcolor: "#1e3c72",
                                width: 42,
                                height: 42,
                                fontSize: 20,
                                fontWeight: "bold",
                            }}
                        >
                            {user?.username?.charAt(0).toUpperCase()}
                        </Avatar>

                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 900,
                                    background: "linear-gradient(90deg, #38bdf8, #22d3ee)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                GAMEHUB
                            </Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 400, color: "#e5e7eb" }}>
                                Hi 👋{" "}
                                <Box component="span" sx={{ color: "#38bdf8", fontWeight: 600, }}>
                                    {user?.username}
                                </Box>
                                , let’s play & learn 🎮
                            </Typography>
                        </Box>
                    </Box>

                    <Button
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                        sx={{
                            background: "linear-gradient(135deg,#f43f5e,#ec4899)",
                            color: "#fff",
                            px: 3,
                            py: 0.8,
                            fontSize: 13,
                            borderRadius: 2,
                            fontWeight: 600,
                            "&:hover": {
                                opacity: 0.9,
                                transform: "translateY(-1px)",
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Box>

                {/* search and filter bar */}
                <Box
                    sx={{
                        mb: 4,
                        px: 3,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap", // responsive
                    }}
                >
                    <TextField
                        size="small"
                        placeholder="Search games…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon className="search-icon" />
                            ),
                        }}
                        className="search-input"
                    />

                    {/* filter chips */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.2,
                            flexWrap: "wrap",
                            justifyContent: "flex-end",
                        }}
                    >
                        {filters.map((item) => (
                            <Chip
                                key={item.value}
                                label={item.label}
                                icon={item.icon}
                                onClick={() => setCategory(item.value)}
                                sx={{
                                    px: 0.8,
                                    fontWeight: 600,
                                    fontSize: 13,
                                    background:
                                        category === item.value
                                            ? "linear-gradient(135deg, #1e3c72, #0ea5e9)"
                                            : "linear-gradient(180deg, #f8fafc, #e2e8f0)",
                                    color: category === item.value ? "#ffffff" : "#0f172a",
                                    transition: "all 0.25s ease",
                                    "& .MuiChip-icon": {
                                        color: category === item.value ? "#ffffff" : "#64748b",
                                    },
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 6px 14px rgba(15,23,42,0.18)",
                                        background:
                                            category === item.value
                                                ? "linear-gradient(135deg, #1e3c72, #0ea5e9)"
                                                : "linear-gradient(180deg, #e2e8f0, #cbd5e1)",
                                    },
                                }}
                            />
                        ))}
                    </Box>
                </Box>
                {/* Game Cards */}
                <Grid container spacing={4} justifyContent="center" sx={{ px: 3 }}>
                    {filteredGames.map((game, i) => (
                        <Grid key={i} size={{ xs: 12, md: 4 }}>
                            <Card
                                sx={{
                                    position: "relative",
                                    height: 260,
                                    borderRadius: 4,
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    boxShadow: "0 12px 28px rgba(15,23,42,0.18)",
                                    "&:hover .overlay": {
                                        opacity: 1,
                                    },
                                    "&:hover": {
                                        transform: "translateY(-3px)",
                                    },
                                    transition: "0.3s ease",
                                    backdropFilter: "blur(8px)",
                                    backgroundColor: "rgba(255,255,255,0.08)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                }}
                            >
                                {/* Game Image */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        backgroundImage: `url(${game.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        zIndex: 1,   // ✅ IMPORTANT
                                    }}
                                />

                                {/* Overlay */}
                                <Box
                                    className="overlay"
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "rgba(0,0,0,0.65)",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "#fff",
                                        opacity: 0,
                                        transition: "0.4s ease",
                                        p: 3,
                                        textAlign: "center",
                                        zIndex: 2,   // ✅ IMPORTANT
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                                        {game.title}
                                    </Typography>

                                    <Typography sx={{ fontSize: 14, mb: 3, color: "#cfd8dc" }}>
                                        {game.desc}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        onClick={() => history.push(game.route)}
                                        sx={{
                                            background: "linear-gradient(135deg,#00c6ff,#0072ff)",
                                            px: 4,
                                            borderRadius: 3,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Play Now
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default Dashboard
