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
      <label className="col-span-1" htmlFor={name}>
        {name}
      </label>
      <input
        className="col-span-2"
        type={"text"}
        title={name}
        id={name}
        name={name}
        required={required}
      ></input>
    </Fragment>
  );
}
