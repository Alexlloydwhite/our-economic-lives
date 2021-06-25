import InviteNewClient from './InviteNewClient';
import ClientTable from './ClientTable/ClientTable';
import { useSelector } from "react-redux"

export default function CoachDashboard() {
    // List of clients from store
    const clientList = useSelector(store => store.clients)
    // Filter client list to display NOT active clients
    // This is later passed to the TR component via props
    const filteredClientList = clientList.filter((client) => client.is_active === false);
    // Filter client list to display only ACTIVE clients
    // This is later passed to the TR component via props
    const notFilteredClientList = clientList.filter((client) => client.is_active === true);
    return (
        <div>
            {/* Page header / opens form to add new client */}
            <InviteNewClient
                clientList={clientList}
                filteredClientList={filteredClientList}
                notFilteredClientList={notFilteredClientList}
            />
            {/* Table of client data */}
            <ClientTable
                clientList={clientList}
                filteredClientList={filteredClientList}
                notFilteredClientList={notFilteredClientList}
            />
        </div>
    );
}