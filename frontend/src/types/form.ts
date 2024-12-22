import React from "react";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
}
