import Button from "./Buttons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function NewArticle() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (articleData) => {
    console.log(articleData);
    const response = await fetch("https://realworld.habsida.net/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify({
        article: {
          title: articleData.title,
          description: articleData.description,
          body: articleData.body,
        },
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      const serverMessage = result.errors?.body?.[0] ?? "";
      if (serverMessage.includes("articles.slug")) {
        setError("title", {
          type: "server",
          message: "Write a unique title .",
        });
      } else
        setError("root.server", {
          type: "server",
          message: "Article creation failed. Try another title.",
        });
      return;
    }
    if (result) {
      navigate(`/article/${result.article.slug}`);
      setTimeout(() => {
        window.alert("Article was created successfully✅");
      }, 500);
    }
    console.log("Article created successfully:", result.article);
  };

  return (
    <form
      className="new-article-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="form-title">Create New Article</h1>
      {errors.root?.server && (
        <p className="form-errors">{errors.root.server.message}</p>
      )}
      <input
        className="input"
        placeholder="Title"
        {...register("title", { required: "Title is required" })}
      ></input>
      {errors.title && <p className="form-errors">{errors.title.message}</p>}
      <input
        className="input"
        placeholder="Short description"
        {...register("description", { required: "Description is required" })}
      ></input>
      {errors.description && (
        <p className="form-errors">{errors.description.message}</p>
      )}
      <textarea
        className="input-4-title"
        placeholder="Input your text"
        {...register("body", { required: "Body is required" })}
      ></textarea>
      {errors.body && <p className="form-errors">{errors.body.message}</p>}
      <div className="tags">
        <span>one</span>
        <span>something</span>
        <span>chinese</span>
        <span>english</span>
        <span>french</span>
      </div>
      <Button className="default-button" type="submit">
        Publish Article
      </Button>
    </form>
  );
}
