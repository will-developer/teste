import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export default function Input(props: TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      slotProps={{
        inputLabel: { shrink: true }, 
      }}
      {...props}
    />
  );
}
