import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
    Input,
    Textarea,
    Select,
    Checkbox,
    RadioGroup,
    FormField,
    FormGroup,
    Button
} from '../packages/ui/src';

// Input Stories
const inputMeta = {
    title: 'Forms/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default inputMeta;
type Story = StoryObj<typeof inputMeta>;

export const TextInput: Story = {
    args: {
        type: 'text',
        placeholder: 'Enter your name',
    },
};

export const EmailInput: Story = {
    args: {
        type: 'email',
        placeholder: 'your.email@example.com',
    },
};

export const PasswordInput: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter password',
    },
};

export const SearchInput: Story = {
    args: {
        type: 'search',
        placeholder: 'Search...',
    },
};

export const InputSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
            <Input size="sm" placeholder="Small input" />
            <Input size="md" placeholder="Medium input" />
            <Input size="lg" placeholder="Large input" />
        </div>
    ),
};

export const InputStates: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
            <Input placeholder="Normal state" />
            <Input placeholder="Disabled state" disabled />
            <Input placeholder="Error state" error />
        </div>
    ),
};

// Textarea Stories
export const TextareaBasic: Story = {
    render: () => (
        <Textarea
            placeholder="Enter your message..."
            rows={4}
            style={{ width: '400px' }}
        />
    ),
};

export const TextareaAutoResize: Story = {
    render: () => {
        const [value, setValue] = useState('');
        return (
            <Textarea
                autoResize
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type here and watch it grow..."
                style={{ width: '400px' }}
            />
        );
    },
};

export const TextareaWithMaxLength: Story = {
    render: () => {
        const [value, setValue] = useState('');
        const maxLength = 200;
        return (
            <div style={{ width: '400px' }}>
                <Textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    maxLength={maxLength}
                    placeholder="Maximum 200 characters..."
                    rows={4}
                />
                <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--oxy-color-text-secondary)', textAlign: 'right' }}>
                    {value.length} / {maxLength}
                </div>
            </div>
        );
    },
};

// Select Stories
export const SelectBasic: Story = {
    render: () => (
        <Select
            options={[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' },
                { value: 'angular', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
            ]}
            placeholder="Select a framework"
            style={{ width: '300px' }}
        />
    ),
};

export const SelectWithDisabled: Story = {
    render: () => (
        <Select
            options={[
                { value: 'option1', label: 'Available Option 1' },
                { value: 'option2', label: 'Available Option 2' },
                { value: 'option3', label: 'Disabled Option', disabled: true },
                { value: 'option4', label: 'Available Option 3' },
            ]}
            placeholder="Select an option"
            style={{ width: '300px' }}
        />
    ),
};

// Checkbox Stories
export const CheckboxBasic: Story = {
    render: () => <Checkbox label="Accept terms and conditions" />,
};

export const CheckboxStates: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Checked & Disabled" defaultChecked disabled />
        </div>
    ),
};

export const CheckboxIndeterminate: Story = {
    render: () => {
        const [checkedItems, setCheckedItems] = useState([false, false, false]);

        const allChecked = checkedItems.every(Boolean);
        const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Checkbox
                    label="Select All"
                    checked={allChecked}
                    indeterminate={isIndeterminate}
                    onChange={(e) => {
                        const newValue = e.target.checked;
                        setCheckedItems([newValue, newValue, newValue]);
                    }}
                />
                <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Checkbox
                        label="Option 1"
                        checked={checkedItems[0]}
                        onChange={(e) => {
                            const newItems = [...checkedItems];
                            newItems[0] = e.target.checked;
                            setCheckedItems(newItems);
                        }}
                    />
                    <Checkbox
                        label="Option 2"
                        checked={checkedItems[1]}
                        onChange={(e) => {
                            const newItems = [...checkedItems];
                            newItems[1] = e.target.checked;
                            setCheckedItems(newItems);
                        }}
                    />
                    <Checkbox
                        label="Option 3"
                        checked={checkedItems[2]}
                        onChange={(e) => {
                            const newItems = [...checkedItems];
                            newItems[2] = e.target.checked;
                            setCheckedItems(newItems);
                        }}
                    />
                </div>
            </div>
        );
    },
};

// RadioGroup Stories
export const RadioGroupBasic: Story = {
    render: () => {
        const [value, setValue] = useState('option1');
        return (
            <RadioGroup
                name="basic-radio"
                value={value}
                onChange={setValue}
                options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                ]}
            />
        );
    },
};

export const RadioGroupHorizontal: Story = {
    render: () => {
        const [value, setValue] = useState('small');
        return (
            <RadioGroup
                name="size-radio"
                value={value}
                onChange={setValue}
                horizontal
                options={[
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                ]}
            />
        );
    },
};

export const RadioGroupWithDisabled: Story = {
    render: () => {
        const [value, setValue] = useState('available1');
        return (
            <RadioGroup
                name="disabled-radio"
                value={value}
                onChange={setValue}
                options={[
                    { value: 'available1', label: 'Available Option 1' },
                    { value: 'disabled', label: 'Disabled Option', disabled: true },
                    { value: 'available2', label: 'Available Option 2' },
                ]}
            />
        );
    },
};

// FormField Stories
export const FormFieldBasic: Story = {
    render: () => (
        <FormField label="Email Address" htmlFor="email" required>
            <Input id="email" type="email" placeholder="your.email@example.com" />
        </FormField>
    ),
};

export const FormFieldWithHint: Story = {
    render: () => (
        <FormField
            label="Username"
            htmlFor="username"
            hint="Choose a unique username (3-20 characters)"
        >
            <Input id="username" type="text" placeholder="johndoe" />
        </FormField>
    ),
};

export const FormFieldWithError: Story = {
    render: () => (
        <FormField
            label="Password"
            htmlFor="password"
            required
            error="Password must be at least 8 characters"
        >
            <Input id="password" type="password" error />
        </FormField>
    ),
};

// FormGroup Stories
export const FormGroupBasic: Story = {
    render: () => (
        <FormGroup
            legend="Personal Information"
            description="Please provide your basic details"
        >
            <FormField label="First Name" htmlFor="firstName" required>
                <Input id="firstName" placeholder="John" />
            </FormField>

            <FormField label="Last Name" htmlFor="lastName" required>
                <Input id="lastName" placeholder="Doe" />
            </FormField>

            <FormField label="Email" htmlFor="email" required>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
            </FormField>
        </FormGroup>
    ),
};

// Complete Form Example
export const CompleteFormExample: Story = {
    render: () => {
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            message: '',
            framework: '',
            notifications: false,
            plan: 'free',
        });

        return (
            <div style={{ maxWidth: '600px', padding: '24px' }}>
                <form onSubmit={(e) => { e.preventDefault(); console.log(formData); }}>
                    <FormGroup legend="Contact Form" description="Fill out this form to get in touch">
                        <FormField label="Full Name" htmlFor="name" required>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                            />
                        </FormField>

                        <FormField
                            label="Email Address"
                            htmlFor="email"
                            required
                            hint="We'll never share your email"
                        >
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john.doe@example.com"
                            />
                        </FormField>

                        <FormField label="Favorite Framework" htmlFor="framework">
                            <Select
                                id="framework"
                                value={formData.framework}
                                onChange={(e) => setFormData({ ...formData, framework: e.target.value })}
                                options={[
                                    { value: 'react', label: 'React' },
                                    { value: 'vue', label: 'Vue' },
                                    { value: 'angular', label: 'Angular' },
                                    { value: 'svelte', label: 'Svelte' },
                                ]}
                                placeholder="Select a framework"
                            />
                        </FormField>

                        <FormField label="Message" htmlFor="message" required>
                            <Textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Tell us about your project..."
                                autoResize
                            />
                        </FormField>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Checkbox
                                label="Send me email notifications"
                                checked={formData.notifications}
                                onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                            />

                            <FormField label="Select a plan">
                                <RadioGroup
                                    name="plan"
                                    value={formData.plan}
                                    onChange={(plan) => setFormData({ ...formData, plan })}
                                    options={[
                                        { value: 'free', label: 'Free Plan' },
                                        { value: 'pro', label: 'Pro Plan ($9/mo)' },
                                        { value: 'enterprise', label: 'Enterprise Plan (Contact us)' },
                                    ]}
                                />
                            </FormField>
                        </div>

                        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                            <Button type="submit" variant="primary">Submit</Button>
                            <Button type="button" variant="secondary" onClick={() => console.log('Cancel')}>Cancel</Button>
                        </div>
                    </FormGroup>
                </form>
            </div>
        );
    },
};
