import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const DefaultLayout: React.FC = () => 
{
    return (<>
        {/* Відображення навігаційної панелі. */}
        <Navbar/>
        {/* Відображення елементів сторінки */}
        <Outlet/>
    </>);
}

export default DefaultLayout;