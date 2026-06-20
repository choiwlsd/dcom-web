import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  register,
  validateId,
  isDuplicateUserId,
  validatePassword,
  validateEmail,
  sendEmailCode,
  verifyEmailCode,
} from "../features/auth/utils/auth.utils";
import type { User } from "../features/auth/types/user.type";
import Input from "../components/ui/Input";
import InputLabel from "../components/ui/InputLabel";
import { Button } from "../components/ui/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const navigate = useNavigate();

  const handleCheckDuplicateId = () => {
    if (!validateId(userID)) {
      alert("User ID는 4자 이상 20자 이하로 입력해주세요.");
      return;
    }

    if (isDuplicateUserId(userID)) {
      alert("이미 사용 중인 User ID입니다.");
      setIsIdChecked(false);
      return;
    }

    alert("사용 가능한 User ID입니다.");
    setIsIdChecked(true);
  };

  const handleSendEmailCode = () => {
    if (!validateEmail(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    sendEmailCode(email);
    alert("인증 코드가 발송되었습니다. 콘솔에서 mock 코드를 확인해주세요.");
  };

  const handleVerifyEmailCode = () => {
    const success = verifyEmailCode(email, emailCode);

    if (!success) {
      alert("인증 코드가 일치하지 않습니다.");
      setIsEmailVerified(false);
      return;
    }

    alert("이메일 인증이 완료되었습니다.");
    setIsEmailVerified(true);
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    if (!studentNumber.trim()) {
      alert("학번을 입력해주세요.");
      return;
    }

    if (!isIdChecked) {
      alert("User ID 중복확인을 해주세요.");
      return;
    }

    if (!validatePassword(password)) {
      alert("비밀번호는 영문과 숫자를 포함하여 8자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    const userInput: User = {
      id: Date.now(),
      userID,
      password,
      studentNumber,
      email,
      name,
      phoneNumber,
      image: "",
      role: "USER",
    };

    const success = register(userInput);

    if (!success) {
      alert("회원가입에 실패했습니다. 입력값을 다시 확인해주세요.");
      return;
    }

    alert("Register success. Please log in.");
    navigate("/");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded bg-white p-8">
        <h2 className="mb-8 text-center text-2xl font-bold">Register</h2>

        <form onSubmit={handleRegister}>
          <div className="mb-6 flex flex-row gap-3">
            <div className="flex-1">
              <InputLabel>이름</InputLabel>
              <Input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <InputLabel>학번</InputLabel>
              <Input
                type="text"
                placeholder="202X123456"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <InputLabel>User ID</InputLabel>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter your user ID"
                value={userID}
                onChange={(e) => {
                  setUserID(e.target.value);
                  setIsIdChecked(false);
                }}
              />
              <Button
                type="button"
                variant="secondary"
                className="w-24 shrink-0 whitespace-nowrap p-3 text-xs"
                onClick={handleCheckDuplicateId}
              >
                중복확인
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <InputLabel>비밀번호</InputLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <InputLabel>비밀번호 확인</InputLabel>
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <InputLabel>이메일</InputLabel>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailVerified(false);
                }}
              />
              <Button
                type="button"
                className="w-24 shrink-0 whitespace-nowrap p-3 text-xs"
                onClick={handleSendEmailCode}
              >
                인증
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <InputLabel>인증 코드</InputLabel>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="인증 코드 입력"
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value)}
              />
              <Button
                type="button"
                variant="secondary"
                className="w-24 shrink-0 whitespace-nowrap p-3 text-xs"
                onClick={handleVerifyEmailCode}
              >
                확인
              </Button>
            </div>
          </div>

          <div className="mb-10">
            <InputLabel>전화번호</InputLabel>
            <Input
              type="text"
              placeholder="010-XXXX-XXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;