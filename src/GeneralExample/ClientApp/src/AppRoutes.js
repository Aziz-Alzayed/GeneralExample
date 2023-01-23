import AllUsers from "./components/AllUsers";
import Counter from "./components/counter/Counter";
import FetchData from "./components/FetchData";
import Home from "./components/Home";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/all-users',
        element: <AllUsers />
    }
];

export default AppRoutes;
