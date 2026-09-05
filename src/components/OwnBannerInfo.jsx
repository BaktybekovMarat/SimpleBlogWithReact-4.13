// import Button from "./Button";
import DefaultAvatar from "../images/defaultAvatar.png";
// import like from "../images/like.svg";

export default function OwnBannerInfo({ currentUser }) {
  return (
    <div>
      <div className="banner-user-info">
        <div className="user-info">
          <img
            src={currentUser?.image || DefaultAvatar}
            alt="user img"
            title="user img"
          />
          <span>{currentUser?.username || ""}</span>
        </div>
        {/* <Button className="follow-btn">
          <img src={like} alt="" />
          Follow
        </Button> */}
      </div>
    </div>
  );
}
