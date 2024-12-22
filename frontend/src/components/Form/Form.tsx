import React from "react";
import { FormProps } from "@/types/form";

const Form: React.FC<FormProps> = ({
  title,
  onSubmit,
  children,
  className,
  disabled,
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {title && (
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">{title}</h2>
        </div>
      )}

      {children}
    </form>
  );
};

export default Form;
