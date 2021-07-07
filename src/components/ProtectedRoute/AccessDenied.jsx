// Message displays if a user tries to view a route without proper auth level
export default function AccessDenied() {
    return (
        <div style={{ backgroundColor: 'red', textAlign: 'center' }}>
            <h2>ACCESS DENIED</h2>
            <h5>You do not have permission to view this page</h5>
        </div>
    );
}