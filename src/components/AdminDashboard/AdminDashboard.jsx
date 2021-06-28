import CoachTable from './CoachTable/CoachTable';
import InviteNewCoach from './InviteNewCoach';

export default function AdminDashboard() {
    return (
        <div>
            <InviteNewCoach />
            <CoachTable />
        </div>
    );
}