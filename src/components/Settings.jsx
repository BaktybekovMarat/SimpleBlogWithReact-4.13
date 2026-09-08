import { useOutletContext, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "./Loader";
import { useState } from "react";
import Button from "./Buttons";
export default function Settings() {
  const { setIsLoggedIn, setCurrentUser, currentUser } = useOutletContext();
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formData) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setError("root.server", {
        type: "auth",
        message: "Your session has expired. Please sign in again",
      });
      return;
    }
    try {
      const updatedUser = {
        username: formData.username,
        email: formData.email,
        bio: formData.bio,
        image: formData.image,
      };
      if (formData.password) {
        updatedUser.password = formData.password;
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

      const data = await response.json();

      if (!response.ok) {
        const serverMessage = data.errors?.body?.[0] ?? "";
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
        }
        console.log("HTTP status", response.status);
        return;
      }

      setCurrentUser(data.user);
      localStorage.setItem("userToken", data.user.token);
      setSuccessMessage("Settings updated successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Update settings error:", error);
      setError("root.server", {
        type: "server",
        message: "Update settings failed. Please try again",
      });
    }
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
      className="new-article-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="form-title">Your Settings</h1>
      {successMessage && <p style={{color: "green", fontSize: "20px"}}>{successMessage}</p>}
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
      <Button className="default-button" type="submit">
        Update settings
      </Button>
      <Button className="logout-btn" onClick={handleLogout}>
        Or click here to logout
      </Button>
    </form>
  );
}
