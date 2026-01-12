import React from 'react'
import { Box, Paper, Typography, Button, Link, InputAdornment } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import gameHubLogo from '../../images/ghlogo.jpg'
import { Form, Formik, Field } from 'formik'
import { TextField } from 'formik-mui'
import EmailIcon from '@mui/icons-material/Email'
import { ToastContainer, Bounce, toast } from 'react-toastify'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Login = () => {

  const token = "wEyqnV7rzghA70Se"
  const ini = {
    email: '',
    password: ''
  }
  const history = useHistory();

  const handleSubmit = (values, { resetForm, setSubmitting }) => {

    console.log("Login Values = ", values)

    //get data
    axios.get('https://generateapi.techsnack.online/api/gamehub', {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        console.log(res.data.Data);
        const users = res.data.Data

        //check email or password
        const ValidUsers = users.find(u => u.email === values.email && u.password === values.password)

        if (ValidUsers) {

          //user valid
          localStorage.setItem("isLogin", true)
          localStorage.setItem("currentUser", JSON.stringify(ValidUsers))

          toast.success("Login Successfully",{autoClose:3000});
          resetForm();

          //redirect to dashboard
          setTimeout(() => {
            history.push('/dashboard')
          }, 800)

        }
        else {
          //user invalid
          toast.error("Invalid email or password. Please try again.")
          setSubmitting(false); //invalid hone pr reedit kar sakte hai
        }

      })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
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
            Learn through games. Grow your skills.
          </Typography>

          {/* formik form */}
          <Formik initialValues={ini} onSubmit={handleSubmit} enableReinitialize>
            <Form>

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

              {/*login button */}
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
                LOGIN
              </Button>

            </Form>
          </Formik>

          {/* register link */}
          <Box mt={3}>
            <Typography variant="body2">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                underline="none"
                sx={{
                  color: "#1e3c72",
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" }
                }}
              >
                Sign Up!
              </Link>
            </Typography>
          </Box>
        </Paper>

        {/* using toast */}
        <ToastContainer
          position="top-right"
          autoClose={1000}
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
    </>
  )
}

export default Login
