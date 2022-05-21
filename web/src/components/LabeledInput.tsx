import { StyledInput, StyledInputLabel } from "@nextui-org/react";
import { Fragment } from "react";

export default function LabeledInput({
  name,
  required = false,
}: {
  name: string;
  required?: boolean;
}) {
  return (
    <Fragment>
      <StyledInputLabel className="col-span-1">{name}</StyledInputLabel>
      <StyledInput
        className="col-span-2"
        type={"text"}
        title={name}
        id={name}
        name={name}
        required={required}
      ></StyledInput>
    </Fragment>
  );
}
