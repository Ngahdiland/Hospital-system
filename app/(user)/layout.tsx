import React, { ReactNode } from "react";
// import UserHeader from "../../components/UserHeader";
// import UserSidebar from "../../components/UserSidebar";

interface UserLayoutProps {
    children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
    return (
        <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
            {children}
        </div>
    );
};

export default UserLayout;
