import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from '#components/ui/field';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Input } from '../ui';

type FormTextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  autoComplete?: string;
  type?: React.HTMLInputTypeAttribute;
};

export const FormTextField = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  type = 'text',
  autoComplete,
}: FormTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          {description && <FieldDescription>{description}</FieldDescription>}

          <Input
            {...field}
            type={type}
            id={name}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
