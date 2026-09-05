import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "./Buttons";

export default function SignUp() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setCurrentUser } = useOutletContext();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch("https://realworld.habsida.net/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      const serverMessage = result.errors?.body?.[0] ?? "";
      if (serverMessage.includes("users.username")) {
        setError("username", {
          type: "server",
          message: "Username is already taken. Please try another username",
        });
      } else if (serverMessage.includes("users.email")) {
        setError("email", {
          type: "server",
          message: "Email is already taken. Please try another email",
        });
      } else
        setError("root.server", {
          type: "server",
          message: "Registration failed. Try another username or email",
        });
      return;
    }

    setIsLoggedIn(true);
    setCurrentUser(result.user);
    localStorage.setItem("userToken", result.user.token);
    navigate("/");
  };

  return (
    <form
      className="form-container"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Sign Up</h1>
      {errors.root?.server && (
        <p className="form-errors">{errors.root.server.message}</p>
      )}
      <input
        className="input"
        type="text"
        {...register("username", {
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username must contain at least 3 characters",
          },
          maxLength: {
            value: 20,
            message: "Username must contain no more than 20 characters",
          },
        })}
        placeholder="User Name"
        autoFocus
      />
      {errors.username && (
        <p className="form-errors">{errors.username.message}</p>
      )}
      <input
        className="input"
        type="email"
        {...register("email", {
          required: "Email is required!",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        })}
        placeholder="Email address"
      />
      {errors.email && <p className="form-errors">{errors.email.message}</p>}
      <input
        className="input"
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must contain at least 6 characters",
          },
          maxLength: {
            value: 40,
            message: "Password must contain no more than 40 characters",
          },
        })}
        placeholder="Password"
      />
      {errors.password && (
        <p className="form-errors">{errors.password.message}</p>
      )}
      <input
        className="input"
        type="password"
        {...register("repeatPassword", {
          required: "Please repeat your password",
          validate: (value) => {
            const password = getValues("password");
            return value === password || "Passwords do not match";
          },
        })}
        placeholder="Repeat password"
      />
      {errors.repeatPassword && (
        <p className="form-errors">{errors.repeatPassword.message}</p>
      )}

      <label className="checkbox-label">
        <input
          className="checkbox  "
          type="checkbox"
          {...register("consent", {
            required: "You must consent to personal data processing",
          })}
        />

        <span className="checkbox">
          I consent to the processing of my personal data
        </span>
      </label>
      {errors.consent && (
        <p className="form-errors">{errors.consent.message}</p>
      )}
      <Button className="default-button" type="submit">
        Sign Up
      </Button>
    </form>
  );
}
