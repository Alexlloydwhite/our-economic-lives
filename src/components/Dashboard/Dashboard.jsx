import { useSelector } from 'react-redux';
import CoachDashboard from '../CoachDashboard/CoachDashboard';

export default function Dashboard() {
    const user = useSelector(store => store.user);
    
    if (user.authorization === 2) {
        return <CoachDashboard />
    } else {    
        return (
            <h1 style={{ textAlign: 'center' }}>This is a restricted area for coach's only</h1>
        );
    };
};