import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import Button from "./Buttons";

export default function EditArticle() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://realworld.habsida.net/api/articles/${slug}`,
        );
        const result = await response.json();
        if (!response.ok) {
          console.log("Error failed:", response.status);
          return;
        }
        setArticle(result.article);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [slug]);

  if (loading) {
    return <Loader> </Loader>;
  }

  const onSubmit = async (articleData) => {
    console.log(articleData);
    try {
      const updateArticle = {
        title: articleData.title,
        description: articleData.description,
        body: articleData.body,
        tagList: articleData.tagList,
      };
      if (articleData.body) {
        updateArticle.body = articleData.body;
      }
      const response = await fetch(
        `https://realworld.habsida.net/api/articles/${article.slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
          body: JSON.stringify({
            article: updateArticle,
          }),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        const serverMessage = result.errors?.body?.[0] ?? "";
        if (serverMessage.includes("articles.slug")) {
          setError("title", {
            type: "server",
            message: "Write a unique title .",
          });
        } else if (serverMessage.includes("articles.description")) {
          setError("description", {
            type: "server",
            message: "Write a unique description .",
          });
        } else if (serverMessage.includes("articles.body")) {
          setError("body", {
            type: "server",
            message: "Write a unique body .",
          });
        } else
          setError("root.server", {
            type: "server",
            message: `Article creation failed. HTTP error:${response.status}` 
          });
        return;
      }

      
     
      navigate(`/article/${result.article.slug}`);
    } catch (error) {
      console.error("Error fetching article:", error);
    } 
  };

  return (
    <form
      className="new-article-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="form-title">Edit Article</h1>
      {errors.root?.server && (
        <p className="form-errors">{errors.root.server.message}</p>
      )}
      <input
        className="input"
        placeholder="Title"
        defaultValue={article?.title}
        {...register("title", { required: "Title is required" })}
      ></input>
      {errors.title && <p className="form-errors">{errors.title.message}</p>}
      <input
        className="input"
        placeholder="Short description"
        defaultValue={article?.description}
        {...register("description", { required: "Description is required" })}
      ></input>
      {errors.description && (
        <p className="form-errors">{errors.description.message}</p>
      )}
      <textarea
        className="input-4-title"
        placeholder="Input your text"
        defaultValue={article?.body}
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
        Save
      </Button>
    </form>
  );
}
