import { TextField, TextFieldProps } from '@mui/material';

type InputFieldProps = Omit<TextFieldProps, 'variant'>;

const InputField = (props: InputFieldProps) => {
  return (
    <TextField
      {...props}
      variant="outlined" 
      margin="dense"
      fullWidth
      sx={{ mb: 2 }}
    />
  );
};

export default InputField;
