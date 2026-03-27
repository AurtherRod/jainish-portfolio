import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import LeadsPage from '../../pages/LeadsPage';
import * as api from '../../services/api';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
    Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
    useLocation: () => ({ pathname: '/dashboard/leads' }),
    useNavigate: () => jest.fn(),
}));

// Mock API functions
jest.mock('../../services/api', () => ({
    createLead: jest.fn(),
    fetchAllLeads: jest.fn(),
    fetchLeadStats: jest.fn(),
    updateLeadStatus: jest.fn(),
    deleteLead: jest.fn(),
    logout: jest.fn(),
}));

// Mock SEO component
jest.mock('../../components/SEO', () => {
    return function MockSEO() { return null; };
});

const mockLeads = [
    {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        status: 'new',
        source: 'external',
        note: 'Interested in services',
        createdAt: '2025-01-15T10:30:00.000Z',
    },
    {
        _id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+0987654321',
        status: 'contacted',
        source: 'admin-dashboard',
        note: '',
        createdAt: '2025-01-16T12:00:00.000Z',
    },
];

const mockStats = { new: 1, contacted: 1, qualified: 0, closed: 0, total: 2 };

const setupMocks = () => {
    api.fetchAllLeads.mockResolvedValue({ data: { leads: mockLeads, count: 2 } });
    api.fetchLeadStats.mockResolvedValue({ data: mockStats });
    api.createLead.mockResolvedValue({ status: 'success', data: { lead: mockLeads[0] } });
    api.updateLeadStatus.mockResolvedValue({ status: 'success', data: { lead: mockLeads[0] } });
    api.deleteLead.mockResolvedValue({ status: 'success' });
};

describe('LeadsPage', () => {
    beforeEach(() => {
        setupMocks();
        window.confirm = jest.fn(() => true);
    });

    describe('Lead list rendering', () => {
        it('renders leads with name, email, phone, status, and source', async () => {
            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText('John Doe')).toBeInTheDocument();
            });

            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
            expect(screen.getByText(/john@example\.com/)).toBeInTheDocument();
            expect(screen.getByText(/jane@example\.com/)).toBeInTheDocument();
            expect(screen.getByText(/\+1234567890/)).toBeInTheDocument();
            expect(screen.getByText(/\+0987654321/)).toBeInTheDocument();
            expect(screen.getByText('🌐 External')).toBeInTheDocument();
            expect(screen.getByText('🖥️ Dashboard')).toBeInTheDocument();
        });

        it('shows loading spinner initially', () => {
            api.fetchAllLeads.mockReturnValue(new Promise(() => {}));
            api.fetchLeadStats.mockReturnValue(new Promise(() => {}));
            const { container } = render(<LeadsPage />);
            expect(container.querySelector('.animate-spin')).toBeInTheDocument();
        });

        it('shows empty state when no leads', async () => {
            api.fetchAllLeads.mockResolvedValue({ data: { leads: [], count: 0 } });
            api.fetchLeadStats.mockResolvedValue({ data: { new: 0, contacted: 0, qualified: 0, closed: 0, total: 0 } });

            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText('No leads yet')).toBeInTheDocument();
            });
        });

        it('displays lead notes', async () => {
            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText(/Interested in services/)).toBeInTheDocument();
            });
        });
    });

    describe('Status filtering', () => {
        it('renders filter buttons with counts', async () => {
            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText('All (2)')).toBeInTheDocument();
            });

            expect(screen.getByText('New (1)')).toBeInTheDocument();
            expect(screen.getByText('Contacted (1)')).toBeInTheDocument();
            expect(screen.getByText('Qualified (0)')).toBeInTheDocument();
            expect(screen.getByText('Closed (0)')).toBeInTheDocument();
        });

        it('calls fetchAllLeads with status filter when clicking a filter button', async () => {
            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText('New (1)')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('New (1)'));

            await waitFor(() => {
                expect(api.fetchAllLeads).toHaveBeenCalledWith({ status: 'new' });
            });
        });

        it('calls fetchAllLeads without status when clicking All filter', async () => {
            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText('All (2)')).toBeInTheDocument();
            });

            // Click a specific filter first
            fireEvent.click(screen.getByText('New (1)'));
            await waitFor(() => {
                expect(api.fetchAllLeads).toHaveBeenCalledWith({ status: 'new' });
            });

            // Click All
            fireEvent.click(screen.getByText('All (2)'));
            await waitFor(() => {
                expect(api.fetchAllLeads).toHaveBeenCalledWith({});
            });
        });
    });

    describe('Add Lead form', () => {
        it('opens form when Add Lead button is clicked', async () => {
            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText('+ Add Lead')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('+ Add Lead'));
            expect(screen.getByText('Add New Lead')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Full name')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('email@example.com')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('+1 (555) 000-0000')).toBeInTheDocument();
        });

        it('shows validation errors for empty fields', async () => {
            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText('+ Add Lead')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('+ Add Lead'));
            fireEvent.click(screen.getByText('Submit Lead'));

            await waitFor(() => {
                expect(screen.getByText('Name is required')).toBeInTheDocument();
                expect(screen.getByText('Valid email is required')).toBeInTheDocument();
                expect(screen.getByText('Phone is required')).toBeInTheDocument();
            });

            expect(api.createLead).not.toHaveBeenCalled();
        });

        it('shows validation error for invalid email', async () => {
            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText('+ Add Lead')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('+ Add Lead'));

            const nameInput = screen.getByPlaceholderText('Full name');
            const emailInput = screen.getByPlaceholderText('email@example.com');
            const phoneInput = screen.getByPlaceholderText('+1 (555) 000-0000');

            fireEvent.change(nameInput, { target: { value: 'Test User' } });
            // Change input type to text to bypass jsdom email sanitization
            emailInput.type = 'text';
            fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
            fireEvent.change(phoneInput, { target: { value: '1234567890' } });

            fireEvent.click(screen.getByText('Submit Lead'));

            await waitFor(() => {
                expect(screen.getByText('Valid email is required')).toBeInTheDocument();
            });

            expect(api.createLead).not.toHaveBeenCalled();
        });

        it('submits form with valid data and shows success message', async () => {
            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText('+ Add Lead')).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText('+ Add Lead'));

            fireEvent.change(screen.getByPlaceholderText('Full name'), { target: { value: 'New Lead' } });
            fireEvent.change(screen.getByPlaceholderText('email@example.com'), { target: { value: 'new@example.com' } });
            fireEvent.change(screen.getByPlaceholderText('+1 (555) 000-0000'), { target: { value: '+1555000111' } });

            fireEvent.click(screen.getByText('Submit Lead'));

            await waitFor(() => {
                expect(api.createLead).toHaveBeenCalledWith({
                    name: 'New Lead',
                    email: 'new@example.com',
                    phone: '+1555000111',
                });
            });

            await waitFor(() => {
                expect(screen.getByText('Lead added successfully!')).toBeInTheDocument();
            });
        });
    });

    describe('Status update and delete', () => {
        it('calls updateLeadStatus when status dropdown changes', async () => {
            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText('John Doe')).toBeInTheDocument();
            });

            const selects = screen.getAllByRole('combobox');
            fireEvent.change(selects[0], { target: { value: 'contacted' } });

            await waitFor(() => {
                expect(api.updateLeadStatus).toHaveBeenCalledWith('1', { status: 'contacted' });
            });
        });

        it('calls deleteLead with confirmation when delete is clicked', async () => {
            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText('John Doe')).toBeInTheDocument();
            });

            const deleteButtons = screen.getAllByText('🗑 Delete');
            fireEvent.click(deleteButtons[0]);

            expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this lead?');
            await waitFor(() => {
                expect(api.deleteLead).toHaveBeenCalledWith('1');
            });
        });

        it('does not delete when confirmation is cancelled', async () => {
            window.confirm = jest.fn(() => false);

            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText('John Doe')).toBeInTheDocument();
            });

            const deleteButtons = screen.getAllByText('🗑 Delete');
            fireEvent.click(deleteButtons[0]);

            expect(window.confirm).toHaveBeenCalled();
            expect(api.deleteLead).not.toHaveBeenCalled();
        });

        it('allows editing notes on a lead', async () => {
            render(<LeadsPage />);

            await waitFor(() => {
                expect(screen.getByText(/Interested in services/)).toBeInTheDocument();
            });

            fireEvent.click(screen.getByText(/Interested in services/));

            const noteInput = screen.getByPlaceholderText('Add a note...');
            expect(noteInput).toBeInTheDocument();
            expect(noteInput.value).toBe('Interested in services');

            fireEvent.change(noteInput, { target: { value: 'Updated note' } });
            fireEvent.click(screen.getByText('Save'));

            await waitFor(() => {
                expect(api.updateLeadStatus).toHaveBeenCalledWith('1', {
                    status: 'new',
                    note: 'Updated note',
                });
            });
        });
    });
});
