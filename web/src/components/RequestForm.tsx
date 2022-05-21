import { Button } from "@nextui-org/react";
import { FormEvent } from "react";
import LabeledInput from "./LabeledInput";
interface RequestFormProps {
  submit?: (e: FormEvent) => any;
}
function defaultSubmit(e: FormEvent) {
  e.preventDefault();
  console.log(e);
  return;
}
export default function RequestForm({
  submit = defaultSubmit,
}: RequestFormProps) {
  return (
    <form onSubmit={submit} className="flex flex-col gap-2 w-1/2 m-auto">
      <LabeledInput name="item" />
      <LabeledInput name="location" />
      <LabeledInput name="name" />
      <div className="col-span-3">
        <Button
          className="bg-emerald-500 rounded p-1 m-auto"
          type="submit"
          title="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
