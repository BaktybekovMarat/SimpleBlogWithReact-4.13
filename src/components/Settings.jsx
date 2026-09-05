
import { useOutletContext, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "./Loader";
import { useState } from "react";
import Button from "./Buttons";
export default function Settings() {
  const { setIsLoggedIn, setCurrentUser, currentUser } = useOutletContext();
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/");
      return;
    }
    const updatedUser = {
      username: data.username,
      email: data.email,
      bio: data.bio,
      image: data.image,
    };
    if (data.password) {
      updatedUser.password = data.password;
    }
    const response = await fetch("https://realworld.habsida.net/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: updatedUser,
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
    setCurrentUser(result.user);
    localStorage.setItem("userToken", result.user.token);
    setAlert("Settings updated successfully");
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  if (!currentUser) return <Loader></Loader>;

  return (
    <form
      className="new-post-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Your Settings</h1>
      {alert && <p style={{ color: "green" }}>{alert}</p>}
      {errors.root?.server && (
        <p className="form-errors">{errors.root.server.message}</p>
      )}
      <input
        className="input"
        type="text"
        placeholder="Username"
        {...register("username", { required: "Username is required" })}
        defaultValue={currentUser?.username || ""}
      ></input>
      {errors.username && (
        <p className="form-errors">{errors.username.message}</p>
      )}
      <input
        className="input"
        type="email"
        placeholder="Email Address"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        })}
        defaultValue={currentUser?.email || ""}
      ></input>
      {errors.email && <p className="form-errors">{errors.email.message}</p>}
      <textarea
        className="input-4-title"
        placeholder="Input your bio"
        {...register("bio")}
        defaultValue={currentUser?.bio || ""}
      ></textarea>
      <input
        className="input"
        type="url"
        placeholder="Avatar img URL"
        {...register("image", {
          validate: (value) => {
            if (!value) return true;
            try {
              new URL(value);
            } catch {
              return "Enter valid avatar URL";
            }
            return (
              /\.(jpg|jpeg|png|webp|gif)$/i.test(value) ||
              "Avatar must be an image URL"
            );
          },
        })}
        defaultValue={currentUser?.image || ""}
      ></input>
      {errors.image && <p className="form-errors">{errors.image.message}</p>}
      <input
        className="input"
        type="password"
        placeholder="Password"
        {...register("password", {
          minLength: {
            value: 6,
            message: "Password must contain at least 6 characters",
          },
          maxLength: {
            value: 40,
            message: "Password must contain no more than 40 characters",
          },
        })}
      ></input>
      <Button className="default-button" type="submit" >
        Update settings
      </Button>
      <Button className="logout-btn"  onClick={handleLogout}>
        Or click here to logout
      </Button>
    </form>
  );
}
