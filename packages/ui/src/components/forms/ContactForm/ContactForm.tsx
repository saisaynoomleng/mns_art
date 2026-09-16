'use client';

import { FormContainer } from '#components/shared/FormContainer/FormContainer';
import React from 'react';
import { ArrowButton, SectionTitle } from '../../shared';
import {
  ActionResponse,
  ContactFormInput,
  ContactFormOutput,
  ContactFormSchema,
} from '@mnsart/utils';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { clsx, twMerge } from 'cn';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#components/ui/field';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '#components/ui/select';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '#components/ui/input-group';
import { FormTextField } from '../FormTextField';

type ContactFormProps = {
  className?: string;
  action: (
    data: ContactFormInput,
  ) => Promise<ActionResponse<ContactFormOutput>>;
};

const SERVICES = [
  { name: 'Web Development', value: 'web-development' },
  { name: 'Product Design UI/UX', value: 'ui-ux' },
  { name: 'Custom Projects', value: 'custom' },
];

export const ContactForm = ({
  className,
  action,
}: ContactFormProps): React.JSX.Element => {
  const form = useForm<ContactFormInput>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      minBudget: 1,
      maxBudget: 100,
      service: 'web-development',
    },
  });

  const onSubmit: SubmitHandler<ContactFormInput> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      toast.error(result.message);

      form.setError(result.field as keyof ContactFormInput, {
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
        noValidate
        className={twMerge(
          clsx('grid md:grid-cols-2 gap-x-6 gap-y-8', className),
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-1 col-span-full">
          <SectionTitle label={`Your next project starts here.`} />
          <p className="text-fs-300">
            From bold ideas to complex digital products, we turn concepts into
            thoughtful, high-performing experiences. Share the details and
            let&apos;s see what we can create together.
          </p>
        </div>

        <FormTextField
          name="name"
          label="Name"
          autoComplete="name"
          control={form.control}
        />

        <FormTextField
          name="email"
          label="Email"
          autoComplete="email"
          type="email"
          control={form.control}
        />

        <FormTextField
          name="minBudget"
          label="Minimum Budget"
          type="number"
          control={form.control}
        />

        <FormTextField
          name="maxBudget"
          label="Maximum Budget"
          type="number"
          control={form.control}
        />

        <Controller
          name="service"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="col-span-full" aria-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="service">Service</FieldLabel>
                <FieldDescription>
                  For a better scope, please select the type of projects you are
                  looking into
                </FieldDescription>
              </FieldContent>

              <Select
                name={field.name}
                value={field.value ?? 'web-development'}
                onValueChange={field.onChange}
                defaultValue="web-development"
              >
                <SelectTrigger
                  id="service"
                  aria-invalid={fieldState.invalid}
                  className="w-full"
                >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>

                <SelectContent>
                  {SERVICES.map((s) => (
                    <SelectItem key={s.name} value={s.value}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="col-span-full">
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="message"
                  maxLength={3000}
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="text-background/60">
                    {field.value.length} / 3000
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field orientation="horizontal">
          <ArrowButton label="Notify Us" />
        </Field>
      </form>
    </FormContainer>
  );
};
