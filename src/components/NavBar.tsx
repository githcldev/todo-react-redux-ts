import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../common/store";
export const NavBar = () => {
    const userLogin = useSelector((state: RootState) => state.app.userLogin);
    return (
        <nav className="topNav">
            <h1>Redux Essentials Example</h1>
            <div className="navContent">
                <div className="navLinks">
                    <Link to="/home">Home</Link>
                    <Link to="/todo">Todos</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/dt">API Dt</Link>
                    <Link to="/loginRegister">Reg/Log</Link>
                    <Link to={userLogin ? "/pOne" : "/loginRegister"}>*Page One</Link>
                </div>
            </div>
        </nav>
    );
};
