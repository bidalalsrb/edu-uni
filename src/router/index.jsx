import { createBrowserRouter } from 'react-router-dom'
import { routes } from './rotues.jsx'
import BlankLayout from "../components/Layouts/BlankLauouts.jsx";
import DefaultLayout from "../components/Layouts/DefaultLayouts.jsx";

// children(중첩)이 있는 경우에는 element만 감싸주고 children은 그대로 둠
const finalRoutes = routes.map((route) => {
    if (route.layout === "blank") {
        return { ...route, element: <BlankLayout>{route.element}</BlankLayout> };
    }
    if (route.layout === "default") {
        return { ...route, element: <DefaultLayout>{route.element}</DefaultLayout> };
    }
    // admin 중첩 라우트는 children 있음 (element는 감싸지 않음)
    return route;
});

const router = createBrowserRouter(finalRoutes)
export default router
