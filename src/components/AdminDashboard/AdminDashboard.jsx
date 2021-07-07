// Components
import CoachTable from './CoachTable/CoachTable';
import InviteNewCoach from './InviteNewCoach';
// Admin Dashboard index. 
// Currently this is fairly "bare bones" but could be useful in future
export default function AdminDashboard() {
    return (
        <div>
            <InviteNewCoach />
            <CoachTable />
        </div>
    );
}