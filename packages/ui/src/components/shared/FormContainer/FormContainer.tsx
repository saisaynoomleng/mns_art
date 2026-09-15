import React from 'react';

export const FormContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}): React.JSX.Element => {
  return (
    <div className="relative overflow-hidden py-4 px-2">
      <div className="absolute inset-4  bg-brand-neon-600 form-container z-5 rotate-2" />
      <div className="absolute inset-4 bg-brand-accent-400 form-container -rotate-2" />
      <div className="relative z-10 bg-brand-primary-900 p-6 md:p-8 form-container">
        {children}
      </div>
    </div>
  );
};
