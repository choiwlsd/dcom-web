import Input from "../components/ui/Input";
import InputLabel from "../components/ui/InputLabel";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import useRegisterForm from "../features/auth/hooks/useRegisterForm";

const ErrorMessage = ({ message }: { message?: string }) =>
  message ? <p className="mt-1 text-xs text-red-500">{message}</p> : null;

const GreenCheck = () => (
  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-green-500 text-base">
    ✓
  </span>
);

const Register = () => {
  const {
    name,
    studentNumber,
    userID,
    password,
    confirmPassword,
    email,
    emailCode,
    phoneNumber,
    errors,
    isUserIDValid,
    isPasswordValid,
    isConfirmPasswordValid,
    isEmailVerified,
    isRegisterComplete,
    handleNameChange,
    handleStudentNumberChange,
    handleUserIDChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleEmailChange,
    handlePhoneNumberChange,
    handleCheckDuplicateId,
    handleSendEmailCode,
    handleVerifyEmailCode,
    handleRegister,
    handleGoLogin,
    setEmailCode,
  } = useRegisterForm();

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
                className="w-16 shrink-0 whitespace-nowrap p-3 text-xs"
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
                className="w-16 shrink-0 whitespace-nowrap p-3 text-xs"
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
                {isEmailVerified && <GreenCheck />}
              </div>
              <Button
                type="button"
                variant="secondary"
                className="w-16 shrink-0 whitespace-nowrap p-3 text-xs transition-colors"
                onClick={handleVerifyEmailCode}
              >
                확인
              </Button>
            </div>
            <ErrorMessage message={errors.emailCode} />
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
      <Modal
        isOpen={isRegisterComplete}
        badge="승인 대기"
        title="가입 신청이 완료되었습니다."
        description={
          <>
            관리자가 회원 정보를 검토 중입니다.
            <br />
            승인이 완료되면 이메일로 안내해 드리며,
            <br />그 이후 로그인하여 인트라넷을 이용하실 수 있습니다.
          </>
        }
        actionLabel="로그인 화면으로 돌아가기"
        onAction={handleGoLogin}
        labelledById="signup-complete-title"
      />
    </div>
  );
};

export default Register;
