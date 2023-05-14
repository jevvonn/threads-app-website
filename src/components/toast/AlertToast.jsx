import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";

export default function AlertToast({ text, isSuccess = true }) {
  return (
    <div className="alert w-max bg-base-100 border-2 border-primary">
      <div>
        {isSuccess ? <CheckmarkIcon /> : <ErrorIcon />}
        <span className="font-semibold">{text}</span>
      </div>
    </div>
  );
}
