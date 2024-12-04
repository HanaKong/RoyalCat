import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ scrollRefs }) => {
  const handleScroll = (section) => {
    scrollRefs[section].current.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const linkToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="header-container">
      <div className="title-box">
        <div className="title" onClick={scrollToTop}>
          <img src="/images/Royal.png" className="logo" alt="" />
        </div>
        <div className="title" onClick={() => handleScroll("intro")}>
          게임 소개
        </div>
        <div className="title" onClick={() => handleScroll("story")}>
          세계관
        </div>
        <div className="title" onClick={linkToSignUp}>
          회원가입
        </div>
      </div>
    </div>
  );
};
export default Header;
