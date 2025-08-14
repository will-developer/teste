import { ButtonProps } from "../../../types/interfaces";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Buttons = ({ onClick, label }: ButtonProps) => {
  return (
    <Stack spacing={2} direction="row">
      <Button onClick={onClick} variant="contained">
        {label}
      </Button>
    </Stack>
  );
};

export default Buttons;
