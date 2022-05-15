import React from "react";
import BootForm from "react-bootstrap/Form";

const BootSelect = ({ input, inputOnChange, options, disabled }) => {
  const inputProps = {
    ...input,
    onChange: (e) => {
      input.onChange(e);
      inputOnChange && inputOnChange(e);
    },
  };
  return (
    <BootForm.Select {...inputProps} disabled={disabled}>
      {options}
    </BootForm.Select>
  );
};

export default BootSelect;
