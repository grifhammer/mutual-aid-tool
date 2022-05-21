import { Input } from "@nextui-org/react";
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
      <Input
        label={name}
        type={"text"}
        title={name}
        id={name}
        name={name}
        required={required}
      ></Input>
    </Fragment>
  );
}
