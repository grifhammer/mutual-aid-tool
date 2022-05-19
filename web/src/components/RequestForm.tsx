import { FormEvent } from "react";
import LabeledInput from "./LabeledInput";

function submit(e: FormEvent) {
  e.preventDefault();
  console.log(e);
  return;
}
export default function RequestForm() {
  return (
    <form onSubmit={submit} className="grid grid-cols-3">
      <LabeledInput name="item" />
      <LabeledInput name="location" />
      <LabeledInput name="" />
      <div className="col-span-3">
        <button
          className="bg-emerald-500 rounded p-1"
          type="submit"
          title="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
