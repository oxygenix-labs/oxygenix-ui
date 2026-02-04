/**
 * Form Component Types
 */

import { ReactNode, HTMLAttributes } from 'react';
import { FieldValues, UseFormReturn, FieldError as RHFFieldError } from 'react-hook-form';

/**
 * Validation result
 */
export type ValidationResult = true | string | Promise<true | string>;

/**
 * Validation function
 */
export type ValidationFunction<T = any> = (value: T) => ValidationResult;

/**
 * Field error
 */
export interface FieldError {
    type: string;
    message: string;
}

/**
 * Form errors object
 */
export type FormErrors<T = any> = {
    [K in keyof T]?: FieldError | FormErrors<T[K]>;
};

/**
 * Form step configuration
 */
export interface FormStep {
    /** Step identifier */
    id: string;

    /** Step label */
    label: string;

    /** Step description */
    description?: string;

    /** Fields in this step */
    fields: string[];

    /** Validate before allowing next step */
    validate?: boolean;
}

/**
 * Autosave configuration
 */
export interface AutosaveConfig {
    /** Whether autosave is enabled */
    enabled: boolean;

    /** Autosave interval in milliseconds */
    interval?: number;

    /** Save handler */
    onSave: (data: any) => void | Promise<void>;

    /** Restore handler */
    onRestore?: () => any | Promise<any>;
}

/**
 * Permission configuration
 */
export interface PermissionsConfig {
    /** Check if field can be edited */
    canEdit?: (fieldName: string) => boolean;

    /** Check if field can be viewed */
    canView?: (fieldName: string) => boolean;
}

/**
 * Form props
 */
export interface FormProps<TFieldValues extends FieldValues = FieldValues>
    extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'> {
    /** Form submission handler */
    onSubmit: (data: TFieldValues) => void | Promise<void>;

    /** Error handler */
    onError?: (errors: FormErrors<TFieldValues>) => void;

    /** Default form values */
    defaultValues?: Partial<TFieldValues>;

    /** Controlled form values */
    values?: Partial<TFieldValues>;

    /** Values change handler */
    onValuesChange?: (values: Partial<TFieldValues>) => void;

    /** Multi-step configuration */
    steps?: FormStep[];

    /** Current step (for multi-step forms) */
    currentStep?: number;

    /** Step change handler */
    onStepChange?: (step: number) => void;

    /** Autosave configuration */
    autosave?: AutosaveConfig;

    /** Permissions configuration */
    permissions?: PermissionsConfig;

    /** Validation mode */
    mode?: 'onSubmit' | 'onBlur' | 'onChange' | 'all';

    /** Revalidation mode */
    reValidateMode?: 'onSubmit' | 'onBlur' | 'onChange';

    /** Show debug panel (dev only) */
    debug?: boolean;

    /** Children */
    children: ReactNode;
}

/**
 * Field type
 */
export type FieldType =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'date'
    | 'datetime-local'
    | 'time'
    | 'select'
    | 'multiselect'
    | 'checkbox'
    | 'radio'
    | 'textarea'
    | 'file'
    | 'custom';

/**
 * Option for select/radio/checkbox
 */
export interface Option {
    value: string | number;
    label: string;
    disabled?: boolean;
}

/**
 * Field render props
 */
export interface FieldRenderProps<T = any> {
    field: {
        name: string;
        value: T;
        onChange: (value: T) => void;
        onBlur: () => void;
    };
    fieldState: {
        error?: FieldError;
        isDirty: boolean;
        isTouched: boolean;
        isValidating: boolean;
    };
    formState: {
        isSubmitting: boolean;
        isValid: boolean;
        errors: FormErrors;
    };
}

/**
 * Field props
 */
export interface FieldProps {
    /** Field name (path in form data) */
    name: string;

    /** Field label */
    label?: ReactNode;

    /** Field description */
    description?: string;

    /** Placeholder text */
    placeholder?: string;

    /** Field type */
    type?: FieldType;

    /** Whether field is required */
    required?: boolean;

    /** Validation function(s) */
    validate?: ValidationFunction | ValidationFunction[];

    /** Options for select/radio/checkbox */
    options?: Option[];

    /** Conditional rendering */
    condition?: (formValues: any) => boolean;

    /** Whether field is disabled */
    disabled?: boolean;

    /** Whether field is read-only */
    readOnly?: boolean;

    /** Custom render function */
    render?: (props: FieldRenderProps) => ReactNode;

    /** Custom error render function */
    renderError?: (error: FieldError) => ReactNode;

    /** Additional CSS class */
    className?: string;

    /** ARIA label */
    'aria-label'?: string;

    /** ARIA described by */
    'aria-describedby'?: string;
}

/**
 * Field group props
 */
export interface FieldGroupProps extends HTMLAttributes<HTMLFieldSetElement> {
    /** Group legend */
    legend?: ReactNode;

    /** Group description */
    description?: string;

    /** Children */
    children: ReactNode;
}

/**
 * Repeater field
 */
export interface RepeaterField<T = any> {
    id: string;
    value: T;
    index: number;
}

/**
 * Repeater actions
 */
export interface RepeaterActions {
    append: (item?: any) => void;
    prepend: (item?: any) => void;
    remove: (index: number) => void;
    move: (from: number, to: number) => void;
    swap: (indexA: number, indexB: number) => void;
    insert: (index: number, item?: any) => void;
    update: (index: number, item: any) => void;
}

/**
 * Repeater props
 */
export interface RepeaterProps<T = any> {
    /** Field name */
    name: string;

    /** Minimum items */
    minItems?: number;

    /** Maximum items */
    maxItems?: number;

    /** Default item value */
    defaultItem: T;

    /** Render function */
    children: (fields: RepeaterField<T>[], actions: RepeaterActions) => ReactNode;
}

/**
 * Form context value
 */
export interface FormContextValue<TFieldValues extends FieldValues = FieldValues> {
    /** React Hook Form instance */
    form: UseFormReturn<TFieldValues>;

    /** Current step (for multi-step forms) */
    currentStep?: number;

    /** Permissions */
    permissions?: PermissionsConfig;
}
