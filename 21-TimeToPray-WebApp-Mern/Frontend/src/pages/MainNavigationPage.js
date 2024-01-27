import { Outlet } from "react-router-dom"

import MainNavigation from "../components/MainNavigation/MainNavigation"

export default function MainNavigationPage() {
    return <>
        <main>
            <MainNavigation />
            <Outlet />
        </main>
    </>
}
