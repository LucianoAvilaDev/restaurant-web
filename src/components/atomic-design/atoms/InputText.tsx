import { TextField } from "@mui/material";
import React from "react";

type InputProps = {
  id: string;
  label: string;
  value: string;
  change?: Function;
};

const InputText = ({ id, label, value, change }: InputProps) => {
  return (
    <>
      <TextField
        id={id}
        label={label}
        value={value}
        onChange={async (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          if (change) await change(e);

          return;
        }}
      />
    </>
  );
};

export default InputText;
