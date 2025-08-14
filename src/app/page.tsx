"use client";

import { Box } from "@mui/material";
import styles from "./login.module.scss"
import LoginForm from "./components/organisms/loginForm/loginForm";
export default function Login() {
  return (
    <Box className={styles.loginContainer}>
      <LoginForm/>
    </Box>
  );
}
