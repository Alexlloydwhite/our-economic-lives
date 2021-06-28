import InviteNewClient from './InviteNewClient';
import ClientTable from './ClientTable/ClientTable';
import { useSelector } from "react-redux"

export default function CoachDashboard() {
    // List of clients from store
    const clientList = useSelector(store => store.clients)
    // Filter client list to display NOT active clients
    // This is later passed to the TR component via props
    const deactivatedClientList = clientList.filter((client) => client.is_active === false);
    // Filter client list to display only ACTIVE clients
    // This is later passed to the TR component via props
    const activeClientList = clientList.filter((client) => client.is_active === true);
    return (
        <div>
            {/* Page header / opens form to add new client */}
            <InviteNewClient
                activeClientList={activeClientList}
            />
            {/* Table of client data */}
            <ClientTable
                clientList={clientList}
                deactivatedClientList={deactivatedClientList}
                activeClientList={activeClientList}
            />
        </div>
    );
}