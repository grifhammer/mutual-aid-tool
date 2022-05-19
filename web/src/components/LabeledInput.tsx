export default function LabeledInput({
  name,
  required = false,
}: {
  name: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name}>{name}: </label>
      <input
        type={"text"}
        title={name}
        id={name}
        name={name}
        required={required}
      ></input>
    </div>
  );
}
