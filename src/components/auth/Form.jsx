import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

const Form = () => {
  const { register, control, handleSubmit } = useForm({
    mode: "onChange",
  });

  return (
    <div>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" {...register("email")} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" {...register("password")} />

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
export default Form;
