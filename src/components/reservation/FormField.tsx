import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FloatingFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  variant?: 'light' | 'dark' | 'featured';
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="reserve-field-error" role="alert">
      {error}
    </p>
  );
}

export function FloatingInput({
  label,
  error,
  required,
  variant = 'light',
  className,
  ...props
}: FloatingFieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const inputClass =
    variant === 'dark' ? 'reserve-input reserve-input--dark' : 'reserve-input';

  return (
    <div className="reserve-field">
      <div className="reserve-float-field">
        <input
          className={`${inputClass} ${className ?? ''}`}
          placeholder=" "
          aria-invalid={!!error}
          required={required}
          {...props}
        />
        <label className="reserve-float-label">
          {label}
          {required && ' *'}
        </label>
      </div>
      <FieldError error={error} />
    </div>
  );
}

export function FloatingSelect({
  label,
  error,
  required,
  variant = 'light',
  options,
  placeholder = 'Select',
  className,
  ...props
}: FloatingFieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: string[];
    placeholder?: string;
  }) {
  const inputClass =
    variant === 'dark' ? 'reserve-input reserve-input--dark' : 'reserve-input';

  return (
    <div className="reserve-field">
      <div className="reserve-float-field">
        <select
          className={`${inputClass} reserve-input--select ${className ?? ''}`}
          aria-invalid={!!error}
          required={required}
          {...props}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <label className="reserve-float-label">
          {label}
          {required && ' *'}
        </label>
      </div>
      <FieldError error={error} />
    </div>
  );
}

export function FloatingTextarea({
  label,
  error,
  required,
  variant = 'light',
  className,
  ...props
}: FloatingFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const inputClass =
    variant === 'featured'
      ? 'reserve-input reserve-input--textarea reserve-input--featured'
      : 'reserve-input reserve-input--textarea';

  return (
    <div className="reserve-field">
      <div className="reserve-float-field">
        <textarea
          className={`${inputClass} ${className ?? ''}`}
          placeholder=" "
          aria-invalid={!!error}
          required={required}
          {...props}
        />
        <label className="reserve-float-label">{label}</label>
      </div>
      <FieldError error={error} />
    </div>
  );
}

export { FloatingInput as TextInput, FloatingSelect as SelectInput, FloatingTextarea as TextArea };
