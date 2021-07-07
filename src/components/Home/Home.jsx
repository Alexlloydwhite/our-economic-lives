// React
import { useSelector } from "react-redux";
// Components
import CoachDashboard from '../CoachDashboard/CoachDashboard';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import ClientPyramid from '../ClientPyramid/ClientPyramid';
import NavBar from '../App/NavBar/NavBar';

export default function Home() {
    const user = useSelector((store) => store.user);

    // If user is a client, show client Pyramid at /home
    if (user.authorization === 3) {
        return (
            <>
                <NavBar text="Pyramid" />
                <ClientPyramid />
            </>
        );
    }

    // If user is a coach, show coach dashboard at /home
    if (user.authorization === 2) {
        return (
            <>
                <NavBar text="Coach Dashboard" />
                <CoachDashboard />
            </>
        );
    }

    // If user is an admin, show admin dashboard at /home
    if (user.authorization === 1) {
        return (
            <>
                <NavBar text="Admin Dashboard" />
                <AdminDashboard />
            </>
        );
    }
}