import { FormEvent } from "react";
import LabeledInput from "./LabeledInput";

function submit(e: FormEvent) {
  e.preventDefault();
  console.log(e);
  return;
}
export default function RequestForm() {
  return (
    <form onSubmit={submit}>
      <LabeledInput name="item" />
      <button type="submit" title="submit">
        Submit
      </button>
    </form>
  );
}
