import React, { useEffect, useState } from 'react'
import { Box, Typography, Avatar, Button, TextField, Chip } from '@mui/material'
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
    const [search, setSearch] = useState("")
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
                        {[
                            { label: "All Games", value: "all", icon: <SportsEsportsIcon /> },
                            { label: "Favourite", value: "fav", icon: <FavoriteIcon /> },
                            { label: "Puzzle", value: "puzzle", icon: <ExtensionIcon /> },
                            { label: "Memory", value: "memory", icon: <PsychologyIcon /> },
                            { label: "Strategy", value: "strategy", icon: <SportsEsportsIcon /> },
                        ].map((item) => (
                            <Chip
                                key={item.value}
                                label={item.label}
                                icon={item.icon}
                                // onClick={() => setCategory(item.value)}
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
            </Box>
        </>
    )
}

export default Dashboard
