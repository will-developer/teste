import * as React from "react";
import Stack from "@mui/material/Stack";
import Button, { ButtonProps as MUIButtonProps } from "@mui/material/Button";

interface ButtonsProps extends MUIButtonProps {
  label: string;
}

const ButtonsGenerico = ({ label, ...props }: ButtonsProps) => {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" {...props}>
        {label}
      </Button>
    </Stack>
  );
};

export default ButtonsGenerico;
