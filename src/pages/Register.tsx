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

const ErrorMessage = ({ message }: { message?: string }) =>
  message ? <p className="mt-1 text-xs text-red-500">{message}</p> : null;

const GreenCheck = () => (
  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-green-500 text-base">
    ✓
  </span>
);

const Register = () => {
  const [name, setName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const navigate = useNavigate();

  const setFieldError = (field: string, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearFieldError = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  // ── 실시간 유효성 검사 핸들러 ──────────────────────────

  const handleNameChange = (value: string) => {
    setName(value);
    if (!value.trim()) setFieldError("name", "이름을 입력해주세요.");
    else clearFieldError("name");
  };

  const handleStudentNumberChange = (value: string) => {
    setStudentNumber(value);
    if (!value.trim()) setFieldError("studentNumber", "학번을 입력해주세요.");
    else clearFieldError("studentNumber");
  };

  const handleUserIDChange = (value: string) => {
    setUserID(value);
    setIsIdChecked(false);
    if (!value) setFieldError("userID", "아이디를 입력해주세요.");
    else if (!validateId(value)) setFieldError("userID", "아이디는 4자 이상 20자 이하여야 합니다.");
    else clearFieldError("userID");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!value) setFieldError("password", "비밀번호를 입력해주세요.");
    else if (!validatePassword(value)) setFieldError("password", "영문 + 숫자 조합 8자 이상이어야 합니다.");
    else clearFieldError("password");

    // 확인 필드도 함께 재검사 
    if (confirmPassword) {
      if (value !== confirmPassword) setFieldError("confirmPassword", "비밀번호가 일치하지 않습니다.");
      else clearFieldError("confirmPassword");
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (!value) setFieldError("confirmPassword", "비밀번호 확인을 입력해주세요.");
    else if (password !== value) setFieldError("confirmPassword", "비밀번호가 일치하지 않습니다.");
    else clearFieldError("confirmPassword");
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsEmailVerified(false);
    if (!value) setFieldError("email", "이메일을 입력해주세요.");
    else if (!validateEmail(value)) setFieldError("email", "올바른 이메일 형식이 아닙니다.");
    else clearFieldError("email");
  };

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!value) setFieldError("phoneNumber", "전화번호를 입력해주세요.");
    else if (!phoneRegex.test(value)) setFieldError("phoneNumber", "010-XXXX-XXXX 형식으로 입력해주세요.");
    else clearFieldError("phoneNumber");
  };


  // ── 중복 확인 ──────────────────────────────────────────

  const handleCheckDuplicateId = () => {
    if (!validateId(userID)) {
      setFieldError("userID", "아이디는 4자 이상 20자 이하여야 합니다.");
      return;
    }
    if (isDuplicateUserId(userID)) {
      setFieldError("userID", "이미 사용 중인 아이디입니다.");
      setIsIdChecked(false);
    } else {
      clearFieldError("userID");
      setIsIdChecked(true);
    }
  };

  // ── 이메일 인증 ────────────────────────────────────────

  const handleSendEmailCode = () => {
    if (!validateEmail(email)) {
      setFieldError("email", "올바른 이메일 형식이 아닙니다.");
      return;
    }
    sendEmailCode(email);
    clearFieldError("emailCode");
    alert("인증 코드가 발송되었습니다. (콘솔 확인)");
  };

  const handleVerifyEmailCode = () => {
    if (!emailCode) {
      setFieldError("emailCode", "인증 코드를 입력해주세요.");
      return;
    }
    if (verifyEmailCode(email, emailCode)) {
      setIsEmailVerified(true);
      clearFieldError("emailCode");
    } else {
      setFieldError("emailCode", "인증 코드가 올바르지 않습니다.");
      setIsEmailVerified(false);
    }
  };

  // ── 회원가입 제출 ──────────────────────────────────────

  const isUserIDValid = isIdChecked && !errors.userID;
  const isPasswordValid = !!password && validatePassword(password);
  const isConfirmPasswordValid = !!confirmPassword && password === confirmPassword;

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "이름을 입력해주세요.";
    if (!studentNumber.trim()) newErrors.studentNumber = "학번을 입력해주세요.";
    if (!validateId(userID)) newErrors.userID = "아이디는 4자 이상 20자 이하여야 합니다.";
    if (!isIdChecked) newErrors.userID = "아이디 중복 확인을 해주세요.";
    if (!validatePassword(password)) newErrors.password = "영문 + 숫자 조합 8자 이상이어야 합니다.";
    if (password !== confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    if (!validateEmail(email)) newErrors.email = "올바른 이메일 형식이 아닙니다.";
    if (!isEmailVerified) newErrors.emailCode = "이메일 인증을 완료해주세요.";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "전화번호를 입력해주세요.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
    <div className="flex min-h-screen items-center justify-center">
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
                onChange={(e) => handleNameChange(e.target.value)}
              />
              <ErrorMessage message={errors.name} />
            </div>

            <div className="flex-1">
              <InputLabel>학번</InputLabel>
              <Input
                type="text"
                placeholder="202X123456"
                value={studentNumber}
                onChange={(e) => handleStudentNumberChange(e.target.value)}
              />
              <ErrorMessage message={errors.studentNumber} />
            </div>
          </div>

          <div className="mb-6">
            <InputLabel>User ID</InputLabel>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Enter your user ID"
                  value={userID}
                  onChange={(e) => handleUserIDChange(e.target.value)}
                />
                {isUserIDValid && <GreenCheck />}
              </div>
              <Button
                type="button"
                variant="secondary"
                className="w-24 shrink-0 whitespace-nowrap p-3 text-xs"
                onClick={handleCheckDuplicateId}
              >
                중복확인
              </Button>
            </div>
            <ErrorMessage message={errors.userID} />
          </div>

          <div className="mb-6">
            <InputLabel>비밀번호</InputLabel>
            <div className="relative">
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              {isPasswordValid && <GreenCheck />}
            </div>
            <ErrorMessage message={errors.password} />
          </div>

          <div className="mb-8">
            <InputLabel>비밀번호 확인</InputLabel>
            <div className="relative">
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              />
              {isConfirmPasswordValid && <GreenCheck />}
            </div>
            <ErrorMessage message={errors.confirmPassword} />
          </div>

          <div className="mb-4">
            <InputLabel>이메일</InputLabel>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              <Button
                type="button"
                className="w-24 shrink-0 whitespace-nowrap p-3 text-xs"
                onClick={handleSendEmailCode}
              >
                인증
              </Button>
            </div>
            <ErrorMessage message={errors.email} />
          </div>

          <div className="mb-6">
            <InputLabel>인증 코드</InputLabel>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="인증 코드 입력"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                />
                {isEmailVerified && (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-green-500 text-base">
                    ✓
                  </span>
                )}
              </div>
              <Button
                type="button"
                variant="secondary"
                className="w-24 shrink-0 whitespace-nowrap p-3 text-xs transition-colors"
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
              onChange={(e) => handlePhoneNumberChange(e.target.value)}
            />
            <ErrorMessage message={errors.phoneNumber} />
          </div>

          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;