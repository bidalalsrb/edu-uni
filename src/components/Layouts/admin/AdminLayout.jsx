import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.jsx";
import AdminHeader from "./AdminHeader.jsx";

function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100 text-gray-800">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
