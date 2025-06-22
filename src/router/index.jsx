import { createBrowserRouter } from 'react-router-dom'
import { routes } from './rotues.jsx'
import BlankLayout from "../components/Layouts/BlankLauouts.jsx";
import DefaultLayout from "../components/Layouts/DefaultLayouts.jsx";

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element:
            route.layout === 'blank' ? (
                <BlankLayout>{route.element}</BlankLayout>
            ) : (
                <DefaultLayout>{route.element}</DefaultLayout>
            ),
    }
})

const router = createBrowserRouter(finalRoutes)

export default router
