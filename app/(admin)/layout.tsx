import React from "react";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>
                <AdminHeader />
                <div style={{ display: "flex" }}>
                    <AdminSidebar />
                    <main
                        style={{
                            marginTop: 60, // header height
                            marginLeft: 220, // sidebar width
                            padding: "2rem",
                            flex: 1,
                            minHeight: "calc(100vh - 60px)",
                            background: "#f7fafc",
                        }}
                    >
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
