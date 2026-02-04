import type { Meta, StoryObj } from '@storybook/react';
import { Form, Field, FieldGroup, Repeater } from '../packages/forms/src';

const meta = {
    title: 'Forms/Form',
    component: Form,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicForm: Story = {
    render: () => (
        <Form
            defaultValues={{
                name: '',
                email: '',
                message: '',
            }}
            onSubmit={(data) => {
                console.log('Form submitted:', data);
                alert(JSON.stringify(data, null, 2));
            }}
        >
            <Field
                name="name"
                label="Name"
                type="text"
                required
                placeholder="Enter your name"
            />

            <Field
                name="email"
                label="Email"
                type="email"
                required
                placeholder="your@email.com"
            />

            <Field
                name="message"
                label="Message"
                type="textarea"
                placeholder="Your message..."
            />

            <button
                type="submit"
                style={{
                    marginTop: '16px',
                    padding: '10px 24px',
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                }}
            >
                Submit
            </button>
        </Form>
    ),
};

export const WithValidation: Story = {
    render: () => (
        <Form
            defaultValues={{
                username: '',
                password: '',
                confirmPassword: '',
            }}
            onSubmit={(data) => {
                console.log('Form submitted:', data);
                alert('Form is valid!');
            }}
        >
            <Field
                name="username"
                label="Username"
                type="text"
                required
                validate={(value) => {
                    if (value.length < 3) {
                        return 'Username must be at least 3 characters';
                    }
                    return true;
                }}
            />

            <Field
                name="password"
                label="Password"
                type="password"
                required
                validate={(value) => {
                    if (value.length < 8) {
                        return 'Password must be at least 8 characters';
                    }
                    return true;
                }}
            />

            <Field
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                required
            />

            <button type="submit" style={{
                marginTop: '16px',
                padding: '10px 24px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
            }}>
                Register
            </button>
        </Form>
    ),
};

export const WithFieldGroups: Story = {
    render: () => (
        <Form
            defaultValues={{
                firstName: '',
                lastName: '',
                street: '',
                city: '',
                zip: '',
            }}
            onSubmit={(data) => console.log(data)}
        >
            <FieldGroup legend="Personal Information" description="Your basic details">
                <Field name="firstName" label="First Name" type="text" required />
                <Field name="lastName" label="Last Name" type="text" required />
            </FieldGroup>

            <FieldGroup legend="Address" description="Where you live">
                <Field name="street" label="Street" type="text" required />
                <Field name="city" label="City" type="text" required />
                <Field name="zip" label="ZIP Code" type="text" required />
            </FieldGroup>

            <button type="submit" style={{
                marginTop: '16px',
                padding: '10px 24px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
            }}>
                Save
            </button>
        </Form>
    ),
};

export const WithRepeater: Story = {
    render: () => (
        <Form
            defaultValues={{
                name: '',
                emails: [{ email: '' }],
            }}
            onSubmit={(data) => {
                console.log('Form submitted:', data);
                alert(JSON.stringify(data, null, 2));
            }}
        >
            <Field name="name" label="Name" type="text" required />

            <FieldGroup legend="Email Addresses" description="Add one or more email addresses">
                <Repeater
                    name="emails"
                    minItems={1}
                    maxItems={5}
                    defaultItem={{ email: '' }}
                >
                    {(fields, { append, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <div key={field.id} style={{ marginBottom: '12px', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '6px' }}>
                                    <Field
                                        name={`emails.${index}.email`}
                                        label={`Email ${index + 1}`}
                                        type="email"
                                        required
                                    />
                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            style={{
                                                marginTop: '8px',
                                                padding: '6px 12px',
                                                background: '#fee2e2',
                                                color: '#991b1b',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}

                            {fields.length < 5 && (
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
                                    Add Email
                                </button>
                            )}
                        </>
                    )}
                </Repeater>
            </FieldGroup>

            <button type="submit" style={{
                marginTop: '16px',
                padding: '10px 24px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
            }}>
                Submit
            </button>
        </Form>
    ),
};

export const WithSelectAndCheckbox: Story = {
    render: () => (
        <Form
            defaultValues={{
                country: '',
                role: '',
                newsletter: false,
                terms: false,
            }}
            onSubmit={(data) => console.log(data)}
        >
            <Field
                name="country"
                label="Country"
                type="select"
                required
                options={[
                    { value: 'us', label: 'United States' },
                    { value: 'uk', label: 'United Kingdom' },
                    { value: 'ca', label: 'Canada' },
                    { value: 'au', label: 'Australia' },
                ]}
            />

            <Field
                name="role"
                label="Role"
                type="radio"
                required
                options={[
                    { value: 'developer', label: 'Developer' },
                    { value: 'designer', label: 'Designer' },
                    { value: 'manager', label: 'Manager' },
                ]}
            />

            <Field
                name="newsletter"
                label="Subscribe to newsletter"
                type="checkbox"
            />

            <Field
                name="terms"
                label="I agree to the terms and conditions"
                type="checkbox"
                required
            />

            <button type="submit" style={{
                marginTop: '16px',
                padding: '10px 24px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
            }}>
                Submit
            </button>
        </Form>
    ),
};
