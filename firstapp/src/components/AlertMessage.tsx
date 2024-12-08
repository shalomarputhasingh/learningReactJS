import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
}
function Message(props: Props) {
  return (
    <>
      <div
        className="alert alert-primary alert-dismissible fade show"
        role="alert"
      >
        {props.children}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={props.onClose}
        >
          &times;
        </button>
      </div>
    </>
  );
}
export default Message;
