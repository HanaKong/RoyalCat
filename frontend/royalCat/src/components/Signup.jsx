import { useState, useEffect } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    nickname: "",
    password: "",
  });

  const [validation, setValidation] = useState({
    userId: { status: "", message: "" },
    nickname: { status: "", message: "" },
    password: { status: "", message: "" },
  });

  const [active, setActive] = useState({
    userId: false,
    nickname: false,
    password: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFocus = (fieldName) => {
    setActive((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleBlur = (fieldName, value) => {
    if (value === "") {
      setActive((prev) => ({ ...prev, [fieldName]: false }));
      setValidation((prev) => ({
        ...prev,
        [fieldName]: { status: "", message: "" },
      }));
    } else {
      const isValid = validateField(fieldName, value);
      if (isValid && (fieldName === "userId" || fieldName === "nickname")) {
        checkAvailability(fieldName, value);
      }
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));

    setValidation((prevValidation) => ({
      ...prevValidation,
      [fieldName]: { status: "", message: "" },
    }));

    validateField(fieldName, value);
  };

  const validateField = (fieldName, value) => {
    const nicknamePattern = /^[a-zA-Z0-9가-힣]{2,10}$/;
    const generalPattern = /^[a-zA-Z0-9]{4,20}$/;

    let isValid = false;
    if (fieldName === "nickname") {
      isValid = nicknamePattern.test(value);
    } else {
      isValid = generalPattern.test(value);
    }

    if (!isValid) {
      const errorMessage = `${
        fieldName === "userId"
          ? "아이디는"
          : fieldName === "nickname"
          ? "닉네임은"
          : "비밀번호는"
      }${
        fieldName === "nickname"
          ? " 2~10자의 영문, 숫자, 한글"
          : " 4~20자의 영문, 숫자"
      }만 가능합니다.`;
      setValidation((prev) => ({
        ...prev,
        [fieldName]: { status: "error", message: errorMessage },
      }));
      return false;
    } else {
      const validMessage = `사용 가능한 ${
        fieldName === "userId"
          ? "아이디"
          : fieldName === "nickname"
          ? "닉네임"
          : "비밀번호"
      }입니다.`;
      setValidation((prev) => ({
        ...prev,
        [fieldName]: { status: "valid", message: validMessage },
      }));
      return true;
    }
  };

  const checkAvailability = async (fieldName, value) => {
    try {
      const type = fieldName === "userId" ? "id" : "nickname";
      const url = `http://j11b309.p.ssafy.io/api/member/signup/exists?type=${type}&value=${encodeURIComponent(
        value
      )}`;

      const response = await axios.get(url);
      const isDuplicate = response.data;

      if (isDuplicate) {
        setValidation((prev) => ({
          ...prev,
          [fieldName]: {
            status: "error",
            message: `이미 사용 중인 ${
              fieldName === "userId" ? "아이디" : "닉네임"
            }입니다.`,
          },
        }));
      } else {
        setValidation((prev) => ({
          ...prev,
          [fieldName]: {
            status: "valid",
            message: `사용 가능한 ${
              fieldName === "userId" ? "아이디" : "닉네임"
            }입니다.`,
          },
        }));
      }
    } catch (error) {
      setValidation((prev) => ({
        ...prev,
        [fieldName]: {
          status: "error",
          message: `${
            fieldName === "userId" ? "아이디" : "닉네임"
          } 중복 체크 중 오류가 발생했습니다.`,
        },
      }));
    }
  };

  useEffect(() => {
    setIsFormValid(
      validation.userId.status === "valid" &&
        validation.nickname.status === "valid" &&
        validation.password.status === "valid"
    );
  }, [validation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      try {
        const response = await axios.post(
          "http://j11b309.p.ssafy.io/api/member/signup",
          {
            userName: formData.userId,
            password: formData.password,
            nickname: formData.nickname,
          }
        );

        if (response.status === 200) {
          alert("회원가입이 성공적으로 완료되었습니다!");
          navigate("/");
        }
      } catch (error) {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    } else {
      alert("입력한 정보를 확인해주세요.");
    }
  };

  return (
    <main>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form
              name="myform"
              className="sign-up-mode"
              method="post"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="logo">
                <h4></h4>
              </div>

              <div className="heading">
                <h2>회원가입</h2>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    name="userId"
                    className={`input-field ${active.userId ? "active" : ""}`}
                    autoComplete="off"
                    required
                    onFocus={() => handleFocus("userId")}
                    onBlur={(e) => handleBlur("userId", e.target.value)}
                    onChange={(e) => handleChange("userId", e.target.value)}
                    value={formData.userId}
                  />
                  <label className="input-tag">아이디</label>
                  {validation.userId.message && (
                    <span
                      className={`valid-text ${
                        validation.userId.status === "error"
                          ? "error"
                          : "success"
                      }`}
                    >
                      {validation.userId.message}
                    </span>
                  )}
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    name="password"
                    className={`input-field ${active.password ? "active" : ""}`}
                    autoComplete="off"
                    required
                    onFocus={() => handleFocus("password")}
                    onBlur={(e) => handleBlur("password", e.target.value)}
                    onChange={(e) => handleChange("password", e.target.value)}
                    value={formData.password}
                  />
                  <label className="input-tag">비밀번호</label>
                  {validation.password.message && (
                    <span
                      className={`valid-text ${
                        validation.password.status === "error"
                          ? "error"
                          : "success"
                      }`}
                    >
                      {validation.password.message}
                    </span>
                  )}
                </div>

                <div className="input-wrap">
                  <input
                    type="text"
                    name="nickname"
                    className={`input-field ${active.nickname ? "active" : ""}`}
                    autoComplete="off"
                    required
                    onFocus={() => handleFocus("nickname")}
                    onBlur={(e) => handleBlur("nickname", e.target.value)}
                    onChange={(e) => handleChange("nickname", e.target.value)}
                    value={formData.nickname}
                  />
                  <label className="input-tag">닉네임</label>
                  {validation.nickname.message && (
                    <span
                      className={`valid-text ${
                        validation.nickname.status === "error"
                          ? "error"
                          : "success"
                      }`}
                    >
                      {validation.nickname.message}
                    </span>
                  )}
                </div>

                <input
                  type="submit"
                  value="회원가입"
                  className="sign-btn"
                  disabled={!isFormValid}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
