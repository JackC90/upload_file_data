import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  initialValue?: string;
  isLoading?: boolean;
  onValueChange?: Function;
}