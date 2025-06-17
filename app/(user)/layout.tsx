import React, { ReactNode } from "react";
import UserHeader from "../../components/UserHeader";
import UserSidebar from "../../components/UserSidebar";

interface UserLayoutProps {
    children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
    return (
        <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
            <UserHeader />
            <div style={{ display: "flex" }}>
                <UserSidebar />
                <main
                    style={{
                        marginTop: 60, // header height
                        marginLeft: 200, // sidebar width
                        padding: "2rem",
                        flex: 1,
                        minHeight: "calc(100vh - 60px)",
                        background: "#f1f5f9",
                    }}
                >
                    {children}
                </main>
            </div>
            <footer
                style={{
                    background: "#fff",
                    boxShadow: "0 -2px 8px rgba(0,0,0,0.03)",
                    padding: "1rem",
                    marginTop: 32,
                    textAlign: "center",
                    color: "#64748b",
                }}
            >
                &copy; {new Date().getFullYear()} Hospital System. All rights reserved.
            </footer>
        </div>
    );
};

export default UserLayout;
