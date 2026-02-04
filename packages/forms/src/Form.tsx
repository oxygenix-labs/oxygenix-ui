/**
 * Form Component
 * 
 * Enterprise-grade form with validation, multi-step support, and autosave
 */

import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormContext } from './FormContext';
import type { FormProps } from './types';
import styles from './Form.module.css';

export function Form<TFieldValues extends Record<string, any> = Record<string, any>>(
    props: FormProps<TFieldValues>
) {
    const {
        onSubmit,
        onError,
        defaultValues,
        values,
        onValuesChange,
        steps,
        currentStep,
        onStepChange,
        autosave,
        permissions,
        mode = 'onSubmit',
        reValidateMode = 'onChange',
        debug = false,
        children,
        className,
        ...rest
    } = props;

    // Initialize react-hook-form
    const form = useForm<TFieldValues>({
        defaultValues: defaultValues as any,
        values: values as any,
        mode,
        reValidateMode,
    });

    const { handleSubmit, watch, formState } = form;

    // Watch all values for autosave and onChange
    const watchedValues = watch();

    // Handle values change
    useEffect(() => {
        if (onValuesChange) {
            onValuesChange(watchedValues);
        }
    }, [watchedValues, onValuesChange]);

    // Autosave functionality
    useEffect(() => {
        if (!autosave?.enabled) return;

        const interval = autosave.interval || 30000; // Default 30 seconds

        const timer = setInterval(() => {
            if (formState.isDirty) {
                autosave.onSave(watchedValues);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [autosave, watchedValues, formState.isDirty]);

    // Restore autosaved data on mount
    useEffect(() => {
        if (autosave?.enabled && autosave.onRestore) {
            const restore = async () => {
                const data = await autosave.onRestore?.();
                if (data) {
                    form.reset(data);
                }
            };
            restore();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Form submission handler
    const handleFormSubmit = handleSubmit(
        async (data) => {
            try {
                await onSubmit(data as TFieldValues);
            } catch (error) {
                console.error('Form submission error:', error);
            }
        },
        (errors) => {
            if (onError) {
                onError(errors as any);
            }
        }
    );

    // Context value
    const contextValue: any = {
        form,
        currentStep,
        permissions,
    };

    return (
        <FormProvider {...form}>
            <FormContext.Provider value={contextValue}>
                <form
                    className={`${styles.form} ${className || ''}`}
                    onSubmit={handleFormSubmit}
                    noValidate
                    {...rest}
                >
                    {children}

                    {/* Debug panel (dev only) */}
                    {debug && process.env.NODE_ENV === 'development' && (
                        <div className={styles['form-debug']}>
                            <div className={styles['form-debug-title']}>Form Debug</div>
                            <div className={styles['form-debug-content']}>
                                <div>
                                    <strong>Values:</strong>
                                    <pre>{JSON.stringify(watchedValues, null, 2)}</pre>
                                </div>
                                <div>
                                    <strong>Errors:</strong>
                                    <pre>{JSON.stringify(formState.errors, null, 2)}</pre>
                                </div>
                                <div>
                                    <strong>State:</strong>
                                    <pre>
                                        {JSON.stringify(
                                            {
                                                isDirty: formState.isDirty,
                                                isValid: formState.isValid,
                                                isSubmitting: formState.isSubmitting,
                                                isValidating: formState.isValidating,
                                            },
                                            null,
                                            2
                                        )}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </FormContext.Provider>
        </FormProvider>
    );
}

Form.displayName = 'Form';
