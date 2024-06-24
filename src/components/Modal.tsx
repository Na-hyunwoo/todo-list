import { ChangeEvent, forwardRef } from "react";

type InputProps = {
  value: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickAdd: () => void;
  onClickClose: () => void;
  placeholder: string;
  confirmButtonLabel: string;
  cancelButtonLabel: string;
};

const Modal = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChangeInput,
      onClickAdd,
      onClickClose,
      placeholder,
      confirmButtonLabel,
      cancelButtonLabel,
    },
    ref,
  ) => {
    return (
      <div className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
        <input
          ref={ref}
          autoFocus
          className="focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChangeInput}
        />
        <div className="flex justify-center gap-4">
          <button onClick={onClickAdd}>{confirmButtonLabel}</button>
          <button onClick={onClickClose}>{cancelButtonLabel}</button>
        </div>
      </div>
    );
  },
);

export default Modal;
