import { FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, FieldError } from "react-hook-form";
import React from "react";

interface FormFieldProps {
  control: Control<any>;
  label: string;
  name: string;
  type?: string;
  error?: FieldError;
  Component: React.ElementType;
}

const FormField = ({
  control,
  label,
  name,
  type,
  error,
  Component,
}: FormFieldProps) => {
  return (
    <div>
      <p className="mb-1 text-sm font-bold text-dark-100">{label}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Component
              onChange={onChange}
              value={value}
              name={name}
              type={type}
              error={error?.message}
            />
          );
        }}
      />
      {error?.message && (
        <FormHelperText error={true}>{error.message}</FormHelperText>
      )}
    </div>
  );
};

export default FormField;
