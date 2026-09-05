import Button from "./Buttons";

export default function NewPost() {
  return (
    <form className="new-post-form" noValidate>
      <input className="input" placeholder="Title"></input>
      <input className="input" placeholder="Short description"></input>
      <textarea className="input-4-title" placeholder="Input your text"></textarea>
      <div className="tags">
        <span>one</span>
        <span>something</span>
        <span>chinese</span>
        <span>english</span>
        <span>french</span>
      </div>
      <Button className="default-button">
        Publish Article
      </Button>
    </form>
  );
}
