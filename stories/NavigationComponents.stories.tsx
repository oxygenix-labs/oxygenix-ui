import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Breadcrumbs,
    Pagination,
    Modal,
    ModalBody,
    ModalFooter,
    Button,
    Stack,
    Text,
    Input,
    FormField,
    DataTable,
    type TableColumn
} from '../packages/ui/src';

// Navigation Stories
const navigationMeta = {
    title: 'Navigation/Tabs',
    component: Tabs,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default navigationMeta;
type Story = StoryObj<typeof navigationMeta>;

// Tabs Stories
export const TabsBasic: Story = {
    render: () => (
        <Tabs defaultValue="tab1">
            <TabsList>
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Details</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="tab1">
                <div style={{ padding: '16px', background: 'var(--oxy-color-bg-secondary)', borderRadius: '4px' }}>
                    <Text weight="medium">Overview Content</Text>
                    <Text variant="small">This is the overview tab content.</Text>
                </div>
            </TabsContent>

            <TabsContent value="tab2">
                <div style={{ padding: '16px', background: 'var(--oxy-color-bg-secondary)', borderRadius: '4px' }}>
                    <Text weight="medium">Details Content</Text>
                    <Text variant="small">This is the details tab content.</Text>
                </div>
            </TabsContent>

            <TabsContent value="tab3">
                <div style={{ padding: '16px', background: 'var(--oxy-color-bg-secondary)', borderRadius: '4px' }}>
                    <Text weight="medium">Settings Content</Text>
                    <Text variant="small">This is the settings tab content.</Text>
                </div>
            </TabsContent>
        </Tabs>
    ),
};

export const TabsLazyLoading: Story = {
    render: () => (
        <Tabs defaultValue="tab1">
            <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2 (Lazy)</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3 (Lazy)</TabsTrigger>
            </TabsList>

            <TabsContent value="tab1" lazy={false}>
                <Text>This content is always rendered</Text>
            </TabsContent>

            <TabsContent value="tab2" lazy={true}>
                <Text>This content is only rendered when the tab is active (lazy loaded)</Text>
            </TabsContent>

            <TabsContent value="tab3" lazy={true}>
                <Text>This content is also lazy loaded</Text>
            </TabsContent>
        </Tabs>
    ),
};

export const TabsWithContent: Story = {
    render: () => {
        const users = [
            { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
            { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
        ];

        const columns: TableColumn[] = [
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Role' },
        ];

        return (
            <Tabs defaultValue="users">
                <TabsList>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="users">
                    <DataTable
                        columns={columns}
                        data={users}
                        getRowKey={(row) => row.id}
                    />
                </TabsContent>

                <TabsContent value="settings">
                    <Stack direction="vertical" gap={4}>
                        <FormField label="Site Name">
                            <Input placeholder="Enter site name" />
                        </FormField>
                        <FormField label="Description">
                            <Input placeholder="Enter description" />
                        </FormField>
                    </Stack>
                </TabsContent>

                <TabsContent value="activity">
                    <Text>No recent activity</Text>
                </TabsContent>
            </Tabs>
        );
    },
};

// Breadcrumbs Stories
export const BreadcrumbsBasic: Story = {
    render: () => (
        <Breadcrumbs
            items={[
                { label: 'Home', href: '#' },
                { label: 'Products', href: '#' },
                { label: 'Electronics', href: '#' },
                { label: 'Laptops' },
            ]}
        />
    ),
};

export const BreadcrumbsCustomSeparator: Story = {
    render: () => (
        <Stack direction="vertical" gap={4}>
            <Breadcrumbs
                items={[
                    { label: 'Home', href: '#' },
                    { label: 'Docs', href: '#' },
                    { label: 'Components' },
                ]}
                separator=">"
            />

            <Breadcrumbs
                items={[
                    { label: 'Home', href: '#' },
                    { label: 'Docs', href: '#' },
                    { label: 'Components' },
                ]}
                separator="→"
            />

            <Breadcrumbs
                items={[
                    { label: 'Home', href: '#' },
                    { label: 'Docs', href: '#' },
                    { label: 'Components' },
                ]}
                separator="•"
            />
        </Stack>
    ),
};

export const BreadcrumbsClickable: Story = {
    render: () => {
        const [path, setPath] = useState(['Home', 'Products', 'Electronics']);

        return (
            <div>
                <Breadcrumbs
                    items={path.map((item, index) => ({
                        label: item,
                        onClick: index < path.length - 1 ? () => setPath(path.slice(0, index + 1)) : undefined,
                    }))}
                />
                <Text variant="small" style={{ marginTop: '16px' }}>
                    Current path: {path.join(' / ')}
                </Text>
            </div>
        );
    },
};

// Pagination Stories
export const PaginationBasic: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);

        return (
            <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
            />
        );
    },
};

export const PaginationWithInfo: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);

        return (
            <Pagination
                currentPage={currentPage}
                totalPages={20}
                onPageChange={setCurrentPage}
                showInfo
                totalItems={200}
                pageSize={10}
            />
        );
    },
};

export const PaginationLargeDataset: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(50);

        return (
            <Pagination
                currentPage={currentPage}
                totalPages={100}
                onPageChange={setCurrentPage}
                siblingCount={2}
                showInfo
                totalItems={1000}
                pageSize={10}
            />
        );
    },
};

// Modal Stories
export const ModalBasic: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div>
                <Button onClick={() => setOpen(true)}>Open Modal</Button>

                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Basic Modal"
                >
                    <ModalBody>
                        <Text>This is a basic modal dialog with a title and close button.</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => setOpen(false)}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    },
};

export const ModalSizes: Story = {
    render: () => {
        const [size, setSize] = useState<any>('md');
        const [open, setOpen] = useState(false);

        return (
            <div>
                <Stack direction="horizontal" gap={2}>
                    <Button onClick={() => { setSize('sm'); setOpen(true); }}>Small</Button>
                    <Button onClick={() => { setSize('md'); setOpen(true); }}>Medium</Button>
                    <Button onClick={() => { setSize('lg'); setOpen(true); }}>Large</Button>
                    <Button onClick={() => { setSize('xl'); setOpen(true); }}>Extra Large</Button>
                    <Button onClick={() => { setSize('full'); setOpen(true); }}>Full Screen</Button>
                </Stack>

                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    title={`${size.toUpperCase()} Modal`}
                    size={size}
                >
                    <ModalBody>
                        <Text>This is a {size} modal.</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    },
};

export const ModalForm: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div>
                <Button onClick={() => setOpen(true)}>Add User</Button>

                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Add New User"
                    size="md"
                >
                    <ModalBody>
                        <Stack direction="vertical" gap={4}>
                            <FormField label="Name" required>
                                <Input placeholder="Enter name" />
                            </FormField>

                            <FormField label="Email" required>
                                <Input type="email" placeholder="Enter email" />
                            </FormField>

                            <FormField label="Role">
                                <Input placeholder="Enter role" />
                            </FormField>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => setOpen(false)}>
                            Add User
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    },
};

export const ModalConfirmation: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div>
                <Button variant="error" onClick={() => setOpen(true)}>Delete Item</Button>

                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Confirm Deletion"
                    size="sm"
                >
                    <ModalBody>
                        <Text>Are you sure you want to delete this item? This action cannot be undone.</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="error" onClick={() => setOpen(false)}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    },
};

// Complete Navigation Example
export const CompleteNavigationExample: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [modalOpen, setModalOpen] = useState(false);

        const users = [
            { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
            { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
            { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Editor' },
        ];

        const columns: TableColumn[] = [
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Role' },
        ];

        return (
            <div style={{ padding: '24px' }}>
                <Stack direction="vertical" gap={6}>
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        items={[
                            { label: 'Home', href: '#' },
                            { label: 'Admin', href: '#' },
                            { label: 'Users' },
                        ]}
                    />

                    {/* Tabs */}
                    <Tabs defaultValue="all">
                        <TabsList>
                            <TabsTrigger value="all">All Users</TabsTrigger>
                            <TabsTrigger value="active">Active</TabsTrigger>
                            <TabsTrigger value="inactive">Inactive</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all">
                            <Stack direction="vertical" gap={4}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text weight="medium">Total: {users.length} users</Text>
                                    <Button onClick={() => setModalOpen(true)}>Add User</Button>
                                </div>

                                <DataTable
                                    columns={columns}
                                    data={users}
                                    getRowKey={(row) => row.id}
                                />

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={5}
                                    onPageChange={setCurrentPage}
                                    showInfo
                                    totalItems={users.length}
                                    pageSize={10}
                                />
                            </Stack>
                        </TabsContent>

                        <TabsContent value="active">
                            <Text>Active users only</Text>
                        </TabsContent>

                        <TabsContent value="inactive">
                            <Text>Inactive users only</Text>
                        </TabsContent>
                    </Tabs>
                </Stack>

                {/* Modal */}
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Add New User"
                >
                    <ModalBody>
                        <Stack direction="vertical" gap={4}>
                            <FormField label="Name" required>
                                <Input placeholder="Enter name" />
                            </FormField>
                            <FormField label="Email" required>
                                <Input type="email" placeholder="Enter email" />
                            </FormField>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="secondary" onClick={() => setModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => setModalOpen(false)}>
                            Add User
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    },
};
