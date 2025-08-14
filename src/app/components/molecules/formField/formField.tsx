import React from "react";
import { Box, TextFieldProps } from "@mui/material";
import Input from "../../atoms/inputs/input";
import { FormFieldProps } from "@/app/interfaces/FormFieldProps";

// Não entendi isso aqui, mas é  combinar interfaces, nao tava conseguindo achar um tipo pra passar como props
type FormProps = FormFieldProps & Omit<TextFieldProps, keyof FormFieldProps>;

export default function FormField({
  label,
  id,
  type = "text",
  ...props
}: FormProps) {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Input id={id} type={type} label={label} {...props} />
    </Box>
  );
}
