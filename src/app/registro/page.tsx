"use client";

import { Box } from "@mui/material";
import styles from "../registro/registro.module.scss"
import RegistroForm from "../components/organisms/registroForm/registro";
export default function Login() {
  return (
    <Box className={styles.loginContainer}>
      <RegistroForm/>
    </Box>
  );
}
