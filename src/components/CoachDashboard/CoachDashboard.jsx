import { useSelector } from 'react-redux';

export default function CoachDashboard() {
    const user = useSelector(store => store.user);
    if (user.authorization === 2) {
        return (
            <h1 style={{ textAlign: 'center' }}>This is the coach's dashboard</h1>
        );
    } else {    
        return (
            <h1 style={{ textAlign: 'center' }}>This is a restricted area for coach's only</h1>
        );
    };
};