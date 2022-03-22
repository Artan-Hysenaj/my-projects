import React from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";
const Toaster = (props) => {
  return (
    <Toast className="toast-container m-auto my-5" isOpen={!!props.isOpen}>
      <ToastHeader icon={props.icon}>{props.title}</ToastHeader>
      {props.showBody && <ToastBody>{props.children}</ToastBody>}
    </Toast>
  );
};

export default Toaster;
