import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    let jwtToken = localStorage.getItem('token');
    console.log('Token: ', jwtToken);

    return (
        jwtToken ? children : <Navigate to="/" />
    );
}

export default ProtectedRoute;