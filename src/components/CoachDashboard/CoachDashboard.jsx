import InviteNewClient from './InviteNewClient';
import ClientTable from './ClientTable/ClientTable';

export default function CoachDashboard() {
    return (
        <div>
            {/* Page header / opens form to add new client */}
            <InviteNewClient />
            {/* Table of client data */}
            <ClientTable />
        </div>
    );
}