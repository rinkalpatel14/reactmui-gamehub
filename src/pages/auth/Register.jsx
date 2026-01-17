import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography, Button, Link, InputAdornment } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import EmailIcon from '@mui/icons-material/Email'
import gameHubLogo from '../../images/ghlogo.jpg'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios'

const Register = () => {

    const [list, setlist] = useState([])
    const token = "wEyqnV7rzghA70Se"
    const ini = useState({
        username: '',
        email: '',
        password: ''
    })
    const history = useHistory();

    useEffect(() => {
        console.log("test")
        dataview();
    }, [])

    //get method -> show data(ek-see-oss)
    function dataview() {
        axios.get('https://generateapi.techsnack.online/api/gamehub', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res.data.Data)
                setlist(res.data.Data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSubmit = (values, { resetForm ,setSubmitting}) => {

        //dublicate email check
        const isuserExist = list.some(u=>u.email === values.email);

        if(isuserExist){
            toast.error("User already registered!");
            setSubmitting(false); //invalid hone pr reedit kar sakte hai
            return // stop 
        }

        console.log(values);
        //post method -> create data (user exist nahi ho tabhi post )
        axios.post('https://generateapi.techsnack.online/api/gamehub', values, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                toast.success("Registered Successfully");
                dataview();
                resetForm();

                setTimeout(() => {
                    history.push("/login") //redirect to login page
                }, 800)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // //delete data
    // const deleteData = (id) =>{
    //     axios.delete(`https://generateapi.techsnack.online/api/gamehub/${id}`,{
    //         headers:{
    //             Authorization:token
    //         }
    //     })
    //     .then(()=>{
    //         toast.success("Deleted Successfully",{autoClose:1000})
    //         dataview();
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // }

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    width: "100vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
                }}
            >
                <Paper
                    elevation={20}
                    sx={{
                        width: 390,
                        p: 4,
                        borderRadius: 4,
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* left accent bar */}
                    <Box
                        sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: "100%",
                            width: 6,
                            background: "linear-gradient(to bottom, #1e3c72, #2a5298)"
                        }}
                    />

                    {/* logo */}
                    <img
                        src={gameHubLogo}
                        alt="GameHub Logo"
                        style={{
                            width: "130px",
                            marginBottom: "6px"
                        }}
                    />

                    {/* title */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 900,
                            letterSpacing: "2px",
                            mb: 1
                        }}
                    >
                        <span style={{ color: "#1e3c72" }}>GAME</span>
                        <span style={{ color: "#9aa0a6" }}>HUB</span>
                    </Typography>

                    {/* subtitle */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#6b7280",
                            fontSize: "13px",
                            mb: 3
                        }}
                    >
                        Create your GameHub account
                    </Typography>

                    {/* formik form */}
                    <Formik initialValues={ini} onSubmit={handleSubmit} enableReinitialize>
                        <Form>
                            {/* username */}
                            <Field
                                component={TextField}
                                name="username"
                                label="Username"
                                fullWidth
                                required
                                margin="normal"
                                InputProps={{ //input box ke andar cheezein add/modify karne ke liye
                                    startAdornment: ( //inpute ke left me
                                        // position start or end
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />

                            {/* email */}
                            <Field
                                component={TextField}
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                margin="normal"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />

                            {/* password */}
                            <Field
                                component={TextField}
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                required
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />

                            {/* register button */}
                            <Button
                                type='submit'
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    py: 1.4,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                    letterSpacing: "1px",
                                    background: "linear-gradient(to right, #1e3c72, #2a5298)",
                                    boxShadow: "0 8px 20px rgba(30,60,114,0.4)",
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 12px 25px rgba(30,60,114,0.6)"
                                    }
                                }}
                            >
                                REGISTER
                            </Button>
                        </Form>
                    </Formik>

                    {/* login link */}
                    <Typography mt={3} fontSize={14}>
                        Already have an account?{" "}
                        <Link
                            href="/"
                            underline="none"
                            sx={{
                                color: "#1e3c72",
                                fontWeight: 600,
                                "&:hover": { textDecoration: "underline" }
                            }}
                        >
                            Login
                        </Link>
                    </Typography>
                </Paper>

                {/* using toast */}
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </Box>

            {/* register data display */}
                {/* <table border={1} align='center' >

                    <tr>
                        <td>username</td>
                        <td>email</td>
                        <td>password</td>
                        <td>action</td>
                    </tr>
                    {list.map((i, index) => (
                        <tr>
                            <td>{i.username}</td>
                            <td>{i.email}</td>
                            <td>{i.password}</td>
                            <td>
                                <button 
                                onClick={deleteData(i._id)} 
                                >
                                    delete
                                </button>
                            </td>
                        </tr>

                    ))}
                </table> */}
        </>
    )
}

export default Register
