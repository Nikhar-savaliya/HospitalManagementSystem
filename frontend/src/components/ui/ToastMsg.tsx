import { CircleAlert, CircleCheck } from "lucide-react";

interface toastMsgProps {
  msg: string;
  err: boolean;
}

const ToastMsg: React.FC<toastMsgProps> = ({ msg, err }) => {
  if (err) {
    return (
      <p className="flex items-center gap-1">
        <CircleAlert width={16} />
        {msg}
      </p>
    );
  }
  return (
    <p className="flex items-center gap-1">
      <CircleCheck width={16} />
      {msg}
    </p>
  );
};

export default ToastMsg;
