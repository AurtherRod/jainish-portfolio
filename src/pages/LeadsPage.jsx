import { useState, useEffect } from 'react';
import { createLead, fetchAllLeads, fetchLeadStats, updateLeadStatus, deleteLead } from '../services/api';
import { Card, Button, Badge } from '../components/ui';
import DashboardLayout from '../components/DashboardLayout';
import SEO from '../components/SEO';

const STATUS_OPTIONS = ['new', 'contacted', 'qualified', 'closed'];

const STATUS_COLORS = {
    new: 'tech',
    contacted: 'default',
    qualified: 'success',
    closed: 'playable'
};

const LeadsPage = () => {
    const [leads, setLeads] = useState([]);
    const [stats, setStats] = useState({ new: 0, contacted: 0, qualified: 0, closed: 0, total: 0 });
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [editingNote, setEditingNote] = useState(null);
    const [noteText, setNoteText] = useState('');

    useEffect(() => {
        loadLeads();
        loadStats();
    }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const handleFocus = () => {
            loadLeads();
            loadStats();
        };
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }); // Re-register on every render to avoid stale closure over `filter`

    const loadLeads = async () => {
        setLoading(true);
        try {
            const params = {};
            if (filter !== 'all') {
                params.status = filter;
            }
            const result = await fetchAllLeads(params);
            setLeads(result.data.leads);
        } catch (error) {
            console.error('Failed to load leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const result = await fetchLeadStats();
            setStats(result.data.stats);
        } catch (error) {
            console.error('Failed to load lead stats:', error);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
            errors.email = 'Valid email is required';
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Phone is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddLead = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await createLead({
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim()
            });
            setFormData({ name: '', email: '', phone: '' });
            setFormErrors({});
            setShowAddForm(false);
            setSuccessMessage('Lead added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
            await loadLeads();
            await loadStats();
        } catch (error) {
            alert('Failed to add lead: ' + error.message);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateLeadStatus(id, { status: newStatus });
            await loadLeads();
            await loadStats();
        } catch (error) {
            alert('Failed to update status: ' + error.message);
        }
    };

    const handleNoteSave = async (id) => {
        try {
            const lead = leads.find(l => l._id === id);
            await updateLeadStatus(id, { status: lead.status, note: noteText });
            setEditingNote(null);
            setNoteText('');
            await loadLeads();
        } catch (error) {
            alert('Failed to update note: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this lead?')) return;

        try {
            await deleteLead(id);
            setLeads(leads.filter(l => l._id !== id));
            await loadStats();
        } catch (error) {
            alert('Failed to delete lead: ' + error.message);
        }
    };

    if (loading && leads.length === 0) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-ink border-t-transparent"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <>
            <SEO title="Manage Leads - Dashboard" noindex={true} />

            <DashboardLayout>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-8 flex-wrap gap-4">
                        <h1 className="text-2xl md:text-4xl font-bold text-ink">
                            Manage Leads
                            {stats.total > 0 && (
                                <Badge variant="tech" className="ml-4">{stats.total} Total</Badge>
                            )}
                        </h1>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => { loadLeads(); loadStats(); }}
                                disabled={loading}
                            >
                                {loading ? '↻ Refreshing...' : '↻ Refresh'}
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => setShowAddForm(!showAddForm)}
                            >
                                {showAddForm ? '✕ Cancel' : '+ Add Lead'}
                            </Button>
                        </div>
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/40 rounded-lg text-green-300">
                            {successMessage}
                        </div>
                    )}

                    {/* Add Lead Form */}
                    {showAddForm && (
                        <Card className="bg-cream border-ink/15 mb-6" hover={false}>
                            <form onSubmit={handleAddLead} className="p-6">
                                <h2 className="text-xl font-bold text-ink mb-4">Add New Lead</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm text-ink/60 mb-1">Name *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-paper border border-ink/15 rounded-lg px-4 py-2 text-ink focus:border-ink focus:outline-none"
                                            placeholder="Full name"
                                        />
                                        {formErrors.name && <p className="text-coral text-sm mt-1">{formErrors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-ink/60 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-paper border border-ink/15 rounded-lg px-4 py-2 text-ink focus:border-ink focus:outline-none"
                                            placeholder="email@example.com"
                                        />
                                        {formErrors.email && <p className="text-coral text-sm mt-1">{formErrors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-ink/60 mb-1">Phone *</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-paper border border-ink/15 rounded-lg px-4 py-2 text-ink focus:border-ink focus:outline-none"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                        {formErrors.phone && <p className="text-coral text-sm mt-1">{formErrors.phone}</p>}
                                    </div>
                                </div>
                                <Button type="submit" variant="primary" size="sm">
                                    Submit Lead
                                </Button>
                            </form>
                        </Card>
                    )}

                    {/* Status Filter Badges */}
                    <div className="flex flex-wrap gap-2 mb-6 flex-wrap">
                        <Button
                            variant={filter === 'all' ? 'primary' : 'outline'}
                            onClick={() => setFilter('all')}
                        >
                            All ({stats.total})
                        </Button>
                        {STATUS_OPTIONS.map((status) => (
                            <Button
                                key={status}
                                variant={filter === status ? 'primary' : 'outline'}
                                onClick={() => setFilter(status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)} ({stats[status] || 0})
                            </Button>
                        ))}
                    </div>

                    {/* Leads List */}
                    {leads.length === 0 ? (
                        <Card className="bg-cream border-ink/15 p-12 text-center" hover={false}>
                            <p className="text-ink/60 text-lg">
                                {filter === 'all' ? 'No leads yet' : `No ${filter} leads`}
                            </p>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {leads.map(lead => (
                                <Card key={lead._id} className="bg-cream border-ink/15" hover={false}>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                    <span className="text-ink font-bold text-lg">{lead.name}</span>
                                                    <Badge variant={STATUS_COLORS[lead.status]} size="sm">
                                                        {lead.status}
                                                    </Badge>
                                                    <Badge
                                                        variant={lead.source === 'external' ? 'default' : 'success'}
                                                        size="sm"
                                                    >
                                                        {lead.source === 'external' ? '🌐 External' : '🖥️ Dashboard'}
                                                    </Badge>
                                                </div>
                                                <div className="flex gap-4 text-sm text-ink/60 flex-wrap">
                                                    <span>📧 {lead.email}</span>
                                                    <span>📱 {lead.phone}</span>
                                                    <span>📅 {new Date(lead.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                {/* Status Dropdown */}
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                                                    className="bg-paper border border-ink/15 rounded-lg px-3 py-2 text-ink text-sm focus:border-ink focus:outline-none"
                                                >
                                                    {STATUS_OPTIONS.map((s) => (
                                                        <option key={s} value={s}>
                                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                                        </option>
                                                    ))}
                                                </select>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(lead._id)}
                                                >
                                                    🗑 Delete
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Note Section */}
                                        <div className="bg-paper rounded-lg p-4">
                                            {editingNote === lead._id ? (
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={noteText}
                                                        onChange={(e) => setNoteText(e.target.value)}
                                                        className="flex-1 bg-cream border border-ink/15 rounded-lg px-3 py-2 text-ink text-sm focus:border-ink focus:outline-none"
                                                        placeholder="Add a note..."
                                                        maxLength={500}
                                                    />
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={() => handleNoteSave(lead._id)}
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => { setEditingNote(null); setNoteText(''); }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div
                                                    className="text-ink/60 text-sm cursor-pointer hover:text-ink/75"
                                                    onClick={() => { setEditingNote(lead._id); setNoteText(lead.note || ''); }}
                                                >
                                                    {lead.note ? (
                                                        <span>📝 {lead.note}</span>
                                                    ) : (
                                                        <span className="italic">Click to add a note...</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </>
    );
};

export default LeadsPage;
