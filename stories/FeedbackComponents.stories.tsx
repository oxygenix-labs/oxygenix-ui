import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
    Alert,
    Toast,
    ToastContainer,
    Progress,
    Badge,
    Button,
    Stack,
    Grid
} from '../packages/ui/src';

// Feedback Stories
const feedbackMeta = {
    title: 'Feedback/Alert',
    component: Alert,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default feedbackMeta;
type Story = StoryObj<typeof feedbackMeta>;

// Alert Stories
export const AlertInfo: Story = {
    render: () => (
        <Alert
            variant="info"
            title="Information"
            description="This is an informational message to help you understand something."
        />
    ),
};

export const AlertSuccess: Story = {
    render: () => (
        <Alert
            variant="success"
            title="Success!"
            description="Your changes have been saved successfully."
        />
    ),
};

export const AlertWarning: Story = {
    render: () => (
        <Alert
            variant="warning"
            title="Warning"
            description="Please review your changes before proceeding."
        />
    ),
};

export const AlertError: Story = {
    render: () => (
        <Alert
            variant="error"
            title="Error"
            description="Something went wrong. Please try again."
        />
    ),
};

export const AlertClosable: Story = {
    render: () => (
        <Stack direction="vertical" gap={4}>
            <Alert
                variant="info"
                title="Closable Alert"
                description="Click the X button to dismiss this alert."
                closable
            />
            <Alert
                variant="success"
                title="Another Closable Alert"
                description="This one can also be dismissed."
                closable
            />
        </Stack>
    ),
};

export const AlertVariants: Story = {
    render: () => (
        <Stack direction="vertical" gap={4}>
            <Alert variant="info" title="Info" description="Informational message" />
            <Alert variant="success" title="Success" description="Operation completed successfully" />
            <Alert variant="warning" title="Warning" description="Please be careful" />
            <Alert variant="error" title="Error" description="Something went wrong" />
        </Stack>
    ),
};

// Toast Stories
export const ToastBasic: Story = {
    render: () => {
        const [toasts, setToasts] = useState<Array<{ id: number; variant: any; title: string; description: string }>>([]);
        let nextId = 0;

        const addToast = (variant: any, title: string, description: string) => {
            const id = nextId++;
            setToasts(prev => [...prev, { id, variant, title, description }]);
        };

        const removeToast = (id: number) => {
            setToasts(prev => prev.filter(t => t.id !== id));
        };

        return (
            <div>
                <Stack direction="horizontal" gap={2}>
                    <Button onClick={() => addToast('info', 'Info', 'This is an info notification')}>
                        Show Info
                    </Button>
                    <Button onClick={() => addToast('success', 'Success', 'Operation completed successfully')}>
                        Show Success
                    </Button>
                    <Button onClick={() => addToast('warning', 'Warning', 'Please review your changes')}>
                        Show Warning
                    </Button>
                    <Button onClick={() => addToast('error', 'Error', 'Something went wrong')}>
                        Show Error
                    </Button>
                </Stack>

                <ToastContainer position="top-right">
                    {toasts.map(toast => (
                        <Toast
                            key={toast.id}
                            variant={toast.variant}
                            title={toast.title}
                            description={toast.description}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </ToastContainer>
            </div>
        );
    },
};

export const ToastPositions: Story = {
    render: () => {
        const [position, setPosition] = useState<any>('top-right');
        const [toasts, setToasts] = useState<Array<{ id: number }>>([]);
        let nextId = 0;

        const addToast = () => {
            const id = nextId++;
            setToasts(prev => [...prev, { id }]);
        };

        const removeToast = (id: number) => {
            setToasts(prev => prev.filter(t => t.id !== id));
        };

        return (
            <div>
                <Stack direction="vertical" gap={4}>
                    <div>
                        <label style={{ marginRight: '8px' }}>Position:</label>
                        <select value={position} onChange={(e) => setPosition(e.target.value)}>
                            <option value="top-right">Top Right</option>
                            <option value="top-left">Top Left</option>
                            <option value="bottom-right">Bottom Right</option>
                            <option value="bottom-left">Bottom Left</option>
                            <option value="top-center">Top Center</option>
                            <option value="bottom-center">Bottom Center</option>
                        </select>
                    </div>

                    <Button onClick={addToast}>Show Toast</Button>
                </Stack>

                <ToastContainer position={position}>
                    {toasts.map(toast => (
                        <Toast
                            key={toast.id}
                            variant="success"
                            title="Notification"
                            description={`Toast at ${position}`}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </ToastContainer>
            </div>
        );
    },
};

// Progress Stories
export const ProgressDeterminate: Story = {
    render: () => {
        const [progress, setProgress] = useState(0);

        const start = () => {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 500);
        };

        return (
            <Stack direction="vertical" gap={4}>
                <Progress value={progress} showValue />
                <Button onClick={start}>Start Progress</Button>
            </Stack>
        );
    },
};

export const ProgressIndeterminate: Story = {
    render: () => (
        <Progress indeterminate label="Loading..." />
    ),
};

export const ProgressWithLabel: Story = {
    render: () => (
        <Stack direction="vertical" gap={4}>
            <Progress value={30} label="Uploading files" showValue />
            <Progress value={60} label="Processing data" showValue />
            <Progress value={90} label="Almost done" showValue />
        </Stack>
    ),
};

export const ProgressVariants: Story = {
    render: () => (
        <Stack direction="vertical" gap={4}>
            <Progress value={75} variant="primary" label="Primary" showValue />
            <Progress value={75} variant="success" label="Success" showValue />
            <Progress value={75} variant="warning" label="Warning" showValue />
            <Progress value={75} variant="error" label="Error" showValue />
        </Stack>
    ),
};

export const ProgressSizes: Story = {
    render: () => (
        <Stack direction="vertical" gap={4}>
            <Progress value={60} size="sm" label="Small" showValue />
            <Progress value={60} size="md" label="Medium" showValue />
            <Progress value={60} size="lg" label="Large" showValue />
        </Stack>
    ),
};

// Badge Stories
export const BadgeBasic: Story = {
    render: () => (
        <Stack direction="horizontal" gap={2}>
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
        </Stack>
    ),
};

export const BadgeWithDot: Story = {
    render: () => (
        <Stack direction="horizontal" gap={2}>
            <Badge variant="success" dot>Active</Badge>
            <Badge variant="warning" dot>Pending</Badge>
            <Badge variant="error" dot>Archived</Badge>
            <Badge variant="info" dot>Draft</Badge>
        </Stack>
    ),
};

export const BadgeSizes: Story = {
    render: () => (
        <Stack direction="horizontal" gap={2} align="center">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
        </Stack>
    ),
};

export const BadgeInContext: Story = {
    render: () => (
        <Stack direction="vertical" gap={4}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>User Status:</span>
                <Badge variant="success" dot>Online</Badge>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Order Status:</span>
                <Badge variant="warning" dot>Pending</Badge>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Account Status:</span>
                <Badge variant="error" dot>Suspended</Badge>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Document Status:</span>
                <Badge variant="info" dot>Draft</Badge>
            </div>
        </Stack>
    ),
};

// Complete Feedback Example
export const CompleteFeedbackExample: Story = {
    render: () => {
        const [uploadProgress, setUploadProgress] = useState(0);
        const [uploading, setUploading] = useState(false);
        const [toasts, setToasts] = useState<Array<{ id: number; variant: any; title: string; description: string }>>([]);
        let nextId = 0;

        const addToast = (variant: any, title: string, description: string) => {
            const id = nextId++;
            setToasts(prev => [...prev, { id, variant, title, description }]);
        };

        const removeToast = (id: number) => {
            setToasts(prev => prev.filter(t => t.id !== id));
        };

        const startUpload = () => {
            setUploading(true);
            setUploadProgress(0);

            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setUploading(false);
                        addToast('success', 'Upload Complete', 'Your files have been uploaded successfully');
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);
        };

        return (
            <div style={{ padding: '24px' }}>
                <Stack direction="vertical" gap={6}>
                    {/* Alerts */}
                    <div>
                        <h3 style={{ marginBottom: '16px' }}>System Alerts</h3>
                        <Stack direction="vertical" gap={3}>
                            <Alert
                                variant="info"
                                title="New Feature Available"
                                description="Check out our new file upload feature with progress tracking!"
                                closable
                            />
                            <Alert
                                variant="warning"
                                title="Maintenance Scheduled"
                                description="System maintenance is scheduled for tonight at 2 AM EST."
                            />
                        </Stack>
                    </div>

                    {/* Progress */}
                    <div>
                        <h3 style={{ marginBottom: '16px' }}>File Upload</h3>
                        <Stack direction="vertical" gap={3}>
                            {uploading ? (
                                <Progress
                                    value={uploadProgress}
                                    variant={uploadProgress === 100 ? 'success' : 'primary'}
                                    label="Uploading files..."
                                    showValue
                                />
                            ) : (
                                <Button onClick={startUpload}>Start Upload</Button>
                            )}
                        </Stack>
                    </div>

                    {/* Badges */}
                    <div>
                        <h3 style={{ marginBottom: '16px' }}>Status Indicators</h3>
                        <Grid cols={2} gap={3}>
                            <div style={{ padding: '12px', border: '1px solid var(--oxy-color-border-default)', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>Server Status</span>
                                    <Badge variant="success" dot>Online</Badge>
                                </div>
                            </div>
                            <div style={{ padding: '12px', border: '1px solid var(--oxy-color-border-default)', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>Database</span>
                                    <Badge variant="success" dot>Connected</Badge>
                                </div>
                            </div>
                            <div style={{ padding: '12px', border: '1px solid var(--oxy-color-border-default)', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>API Status</span>
                                    <Badge variant="warning" dot>Degraded</Badge>
                                </div>
                            </div>
                            <div style={{ padding: '12px', border: '1px solid var(--oxy-color-border-default)', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>Backup</span>
                                    <Badge variant="info" dot>In Progress</Badge>
                                </div>
                            </div>
                        </Grid>
                    </div>
                </Stack>

                {/* Toast Container */}
                <ToastContainer position="top-right">
                    {toasts.map(toast => (
                        <Toast
                            key={toast.id}
                            variant={toast.variant}
                            title={toast.title}
                            description={toast.description}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </ToastContainer>
            </div>
        );
    },
};
