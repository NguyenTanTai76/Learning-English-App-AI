import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "../../components/FormField";
import TextInput from "../../components/FormInputs/TextInput";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { openSnackbar } from "../../redux/slices/snackbarSlice";
import { loginUser } from "../../api/authService"; // đổi tên hàm API

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useDispatch(); // gọi hàm
  const navigate = useNavigate(); // gọi hàm

  const schema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid"
      )
      .required(),
    password: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(formData: FormData) {
    try {
      const result = await loginUser(formData);

      dispatch(
        login({ accessToken: result.tokens.accessToken, user: result.data })
      );

      dispatch(openSnackbar({ message: "Login successful", type: "success" }));

      navigate("/");
    } catch (error: any) {
      dispatch(openSnackbar({ message: error.message, type: "error" }));
    }
  }

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Login</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          error={errors["email"]}
        />
        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          Component={TextInput}
          error={errors["password"]}
        />
        <Button variant="contained" type="submit">
          Sign in
        </Button>
      </form>
      <p className="mt-4">
        New on our platform? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default LoginPage;
