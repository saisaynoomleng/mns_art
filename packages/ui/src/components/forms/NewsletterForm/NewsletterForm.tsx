'use client';

import React from 'react';
import { Field, FieldError, FieldLabel } from '#components/ui/field';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ActionResponse,
  NewsletterFormSchema,
  type NewsletterFormInput,
} from '@mnsart/utils';
import { clsx, twMerge } from 'cn';
import { toast } from 'sonner';
import { ArrowButton, SectionTitle } from '../../shared';
import { FormContainer } from '#components/shared/FormContainer/FormContainer';
import { Input } from '#components/ui/input';

type NewsletterFormProps = {
  className?: string;
  action: (
    data: NewsletterFormInput,
  ) => Promise<ActionResponse<NewsletterFormInput>>;
};

export const NewsletterForm = ({
  className,
  action,
}: NewsletterFormProps): React.JSX.Element => {
  const form = useForm<NewsletterFormInput>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<NewsletterFormInput> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      toast.error(result.message);

      form.setError(result.field as keyof NewsletterFormInput, {
        message: result.message,
      });

      return;
    }

    toast.success(result.message);
    form.reset();
  };

  return (
    <FormContainer>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={twMerge(
          clsx('flex flex-col justify-center items-center gap-y-4', className),
        )}
      >
        <div className="space-y-2">
          <SectionTitle label="Stay in the Loop" />
          <p className="text-fs-300">
            Get occasional updates, creative insights, and things we're building
            at
            <span className="font-semibold"> MNS Art</span>
            —straight to your inbox.
          </p>
        </div>

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                type="email"
                id="email"
                placeholder="johndoe@example.com"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-background"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        <ArrowButton label="Subscribe" />
      </form>
    </FormContainer>
  );
};
