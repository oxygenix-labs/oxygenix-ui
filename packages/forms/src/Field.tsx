/**
 * Field Component
 * 
 * Universal form field with automatic type inference and validation
 */

import React, { useMemo } from 'react';
import { useController } from 'react-hook-form';
import { useFormContext } from './FormContext';
import { generateId } from '@oxygenix-ui/core';
import type { FieldProps, FieldError } from './types';
import styles from './Form.module.css';

export function Field(props: FieldProps) {
    const {
        name,
        label,
        description,
        placeholder,
        type = 'text',
        required = false,
        validate,
        options,
        condition,
        disabled = false,
        readOnly = false,
        render,
        renderError,
        className,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
    } = props;

    const { form, permissions } = useFormContext();
    const { control, watch } = form;

    // Check permissions
    const canEdit = permissions?.canEdit?.(name) ?? true;
    const canView = permissions?.canView?.(name) ?? true;

    // Check condition
    const formValues = watch();
    const shouldRender = condition ? condition(formValues) : true;

    // Don't render if condition is false or no view permission
    if (!shouldRender || !canView) {
        return null;
    }

    // Use controller for field state
    const {
        field,
        fieldState: { error, isDirty, isTouched },
        formState: { isSubmitting },
    } = useController({
        name,
        control,
        rules: {
            required: required ? 'This field is required' : false,
            validate: validate
                ? async (value) => {
                    const validators = Array.isArray(validate) ? validate : [validate];

                    for (const validator of validators) {
                        const result = await validator(value);
                        if (result !== true) {
                            return result;
                        }
                    }

                    return true;
                }
                : undefined,
        },
    });

    // Generate IDs for accessibility
    const fieldId = useMemo(() => generateId('field'), []);
    const errorId = useMemo(() => generateId('error'), []);
    const descriptionId = useMemo(() => generateId('description'), []);

    // Custom render
    if (render) {
        return (
            <div className={`${styles.field} ${className || ''}`}>
                {render({
                    field,
                    fieldState: {
                        error: error as FieldError | undefined,
                        isDirty,
                        isTouched,
                        isValidating: false,
                    },
                    formState: {
                        isSubmitting,
                        isValid: !error,
                        errors: {},
                    },
                })}
            </div>
        );
    }

    // Render input based on type
    const renderInput = () => {
        const commonProps = {
            id: fieldId,
            name: field.name,
            value: field.value || '',
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
                const value = type === 'number' ? parseFloat(e.target.value) : e.target.value;
                field.onChange(value);
            },
            onBlur: field.onBlur,
            disabled: disabled || !canEdit || isSubmitting,
            readOnly,
            placeholder,
            'aria-label': ariaLabel || (typeof label === 'string' ? label : undefined),
            'aria-describedby': [
                description ? descriptionId : undefined,
                error ? errorId : undefined,
                ariaDescribedBy,
            ]
                .filter(Boolean)
                .join(' ') || undefined,
            'aria-invalid': error ? true : undefined,
            'aria-required': required ? true : undefined,
            className: `${styles['field-input']} ${error ? styles['field-input-error'] : ''}`,
        };

        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        {...commonProps}
                        className={`${commonProps.className} ${styles['field-textarea']}`}
                        rows={4}
                    />
                );

            case 'select':
                return (
                    <select {...commonProps} className={`${commonProps.className} ${styles['field-select']}`}>
                        <option value="">Select an option...</option>
                        {options?.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'checkbox':
                return (
                    <div className={styles['field-checkbox']}>
                        <input
                            type="checkbox"
                            id={fieldId}
                            name={field.name}
                            checked={field.value || false}
                            onChange={(e) => field.onChange(e.target.checked)}
                            onBlur={field.onBlur}
                            disabled={disabled || !canEdit || isSubmitting}
                            className={styles['field-checkbox-input']}
                            aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
                            aria-describedby={description ? descriptionId : undefined}
                            aria-invalid={error ? true : undefined}
                        />
                        {label && (
                            <label htmlFor={fieldId} className={styles['field-checkbox-label']}>
                                {label}
                            </label>
                        )}
                    </div>
                );

            case 'radio':
                return (
                    <div>
                        {options?.map((option) => (
                            <div key={option.value} className={styles['field-radio']}>
                                <input
                                    type="radio"
                                    id={`${fieldId}-${option.value}`}
                                    name={field.name}
                                    value={option.value}
                                    checked={field.value === option.value}
                                    onChange={() => field.onChange(option.value)}
                                    onBlur={field.onBlur}
                                    disabled={disabled || option.disabled || !canEdit || isSubmitting}
                                    className={styles['field-radio-input']}
                                />
                                <label
                                    htmlFor={`${fieldId}-${option.value}`}
                                    className={styles['field-radio-label']}
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                );

            default:
                return <input {...commonProps} type={type} />;
        }
    };

    // Don't render label for checkbox (it's inline)
    const showLabel = label && type !== 'checkbox';

    return (
        <div className={`${styles.field} ${className || ''}`}>
            {showLabel && (
                <label
                    htmlFor={fieldId}
                    className={`${styles['field-label']} ${required ? styles['field-label-required'] : ''}`}
                >
                    {label}
                </label>
            )}

            {description && (
                <span id={descriptionId} className={styles['field-description']}>
                    {description}
                </span>
            )}

            {renderInput()}

            {error && (
                <div id={errorId} className={styles['field-error']} role="alert">
                    {renderError ? (
                        renderError(error as FieldError)
                    ) : (
                        <>
                            <span className={styles['field-error-icon']} aria-hidden="true">
                                ⚠
                            </span>
                            <span>{error.message}</span>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

Field.displayName = 'Field';
