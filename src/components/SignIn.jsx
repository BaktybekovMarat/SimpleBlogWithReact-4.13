import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "./Buttons";

export default function SignIn() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setCurrentUser } = useOutletContext();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (user) => {
    try {
      const response = await fetch(
        "https://realworld.habsida.net/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              email: user.email,
              password: user.password,
            },
          }),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        const errorMessage =
          result.errors?.body?.[0] ?? "Something went wrong. Please try again";
        if (errorMessage.includes("email")) {
          setError("email", {
            type: "server",
            message: "Incorrect email",
          });
        } else if (errorMessage.includes("password")) {
          setError("password", {
            type: "server",
            message: "Incorrect password",
          });
        }
        throw new Error("HTTP error:", response.status);
      }

      localStorage.setItem("userToken", result.user.token);
      setIsLoggedIn(true);
      setCurrentUser(result.user);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="form-container"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="form-title">Sign In</h1>
      {errors.root?.server && (
        <p className="form-errors">{errors.root.server.message}</p>
      )}
      <input
        className="input"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        })}
        placeholder="Email address"
        autoFocus
      />
      {errors.email && <p className="form-errors">{errors.email.message}</p>}
      <input
        className="input"
        type="password"
        {...register("password", { required: "Password is required" })}
        placeholder="Password"
      />
      {errors.password && (
        <p className="form-errors">{errors.password.message}</p>
      )}
      <Button className="default-button" type="submit">
        Sign in
      </Button>
    </form>
  );
}
