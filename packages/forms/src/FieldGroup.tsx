/**
 * FieldGroup Component
 * 
 * Groups related fields together with a legend
 */

import React from 'react';
import type { FieldGroupProps } from './types';
import styles from './Form.module.css';

export function FieldGroup(props: FieldGroupProps) {
    const { legend, description, children, className, ...rest } = props;

    return (
        <fieldset className={`${styles['field-group']} ${className || ''}`} {...rest}>
            {legend && <legend className={styles['field-group-legend']}>{legend}</legend>}
            {description && <p className={styles['field-group-description']}>{description}</p>}
            {children}
        </fieldset>
    );
}

FieldGroup.displayName = 'FieldGroup';
