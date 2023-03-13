import { FinishKakaoLogin } from "../socialLogin";

const Check = () => {
  const code = new URL(window.location.href).searchParams.get("code");

  return (
    <div>
      <FinishKakaoLogin code={code} />
    </div>
  );
};

export default Check;
