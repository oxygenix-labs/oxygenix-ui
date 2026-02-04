/**
 * Simple Form Example
 * 
 * Demonstrates basic usage of the Form system
 */

import React from 'react';
import { Form, Field, FieldGroup, Repeater } from '@oxygenix-ui/forms';
import '@oxygenix-ui/tokens/themes/enterprise.css';

interface UserFormData {
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    bio?: string;
    newsletter: boolean;
    addresses: Array<{
        street: string;
        city: string;
        zip: string;
    }>;
}

export function SimpleFormExample() {
    const handleSubmit = async (data: UserFormData) => {
        console.log('Form submitted:', data);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert('Form submitted successfully!');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px' }}>
            <h1>User Profile Form</h1>

            <Form<UserFormData>
                defaultValues={{
                    name: '',
                    email: '',
                    role: 'viewer',
                    bio: '',
                    newsletter: false,
                    addresses: [{ street: '', city: '', zip: '' }],
                }}
                onSubmit={handleSubmit}
                debug={true}
            >
                <FieldGroup legend="Basic Information" description="Tell us about yourself">
                    <Field
                        name="name"
                        label="Full Name"
                        type="text"
                        required
                        placeholder="John Doe"
                        validate={(value) => {
                            if (value.length < 2) {
                                return 'Name must be at least 2 characters';
                            }
                            return true;
                        }}
                    />

                    <Field
                        name="email"
                        label="Email Address"
                        type="email"
                        required
                        placeholder="john@example.com"
                        validate={async (value) => {
                            // Simulate async validation
                            await new Promise((resolve) => setTimeout(resolve, 500));

                            if (!value.includes('@')) {
                                return 'Invalid email address';
                            }

                            // Simulate checking if email exists
                            if (value === 'taken@example.com') {
                                return 'Email already taken';
                            }

                            return true;
                        }}
                    />

                    <Field
                        name="role"
                        label="Role"
                        type="select"
                        required
                        options={[
                            { value: 'admin', label: 'Administrator' },
                            { value: 'editor', label: 'Editor' },
                            { value: 'viewer', label: 'Viewer' },
                        ]}
                    />

                    <Field
                        name="bio"
                        label="Bio"
                        type="textarea"
                        placeholder="Tell us about yourself..."
                        description="Maximum 500 characters"
                    />
                </FieldGroup>

                <FieldGroup legend="Preferences">
                    <Field
                        name="newsletter"
                        label="Subscribe to newsletter"
                        type="checkbox"
                    />
                </FieldGroup>

                <FieldGroup legend="Addresses" description="Add one or more addresses">
                    <Repeater
                        name="addresses"
                        minItems={1}
                        maxItems={3}
                        defaultItem={{ street: '', city: '', zip: '' }}
                    >
                        {(fields, { append, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        style={{
                                            padding: '16px',
                                            marginBottom: '16px',
                                            border: '1px solid #e5e5e5',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <h4>Address {index + 1}</h4>

                                        <Field
                                            name={`addresses.${index}.street`}
                                            label="Street"
                                            type="text"
                                            required
                                        />

                                        <Field
                                            name={`addresses.${index}.city`}
                                            label="City"
                                            type="text"
                                            required
                                        />

                                        <Field
                                            name={`addresses.${index}.zip`}
                                            label="ZIP Code"
                                            type="text"
                                            required
                                            validate={(value) => {
                                                if (!/^\d{5}$/.test(value)) {
                                                    return 'ZIP code must be 5 digits';
                                                }
                                                return true;
                                            }}
                                        />

                                        {fields.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                style={{
                                                    marginTop: '8px',
                                                    padding: '8px 16px',
                                                    background: '#fee2e2',
                                                    color: '#991b1b',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Remove Address
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {fields.length < 3 && (
                                    <button
                                        type="button"
                                        onClick={() => append()}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#dbeafe',
                                            color: '#1e40af',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Add Address
                                    </button>
                                )}
                            </>
                        )}
                    </Repeater>
                </FieldGroup>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 24px',
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 500,
                            cursor: 'pointer',
                        }}
                    >
                        Submit
                    </button>

                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '10px 24px',
                            background: '#f5f5f5',
                            color: '#171717',
                            border: '1px solid #e5e5e5',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }}
                    >
                        Reset
                    </button>
                </div>
            </Form>
        </div>
    );
}
