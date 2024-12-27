/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const InputErrorField = ({
  error,
}: {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}) => {
  if (!error?.message) return null;
  return (
    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs pt-1 pl-1">
      {`${error?.message}`}
    </span>
  );
};

export default InputErrorField;
