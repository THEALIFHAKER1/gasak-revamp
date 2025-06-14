interface AdminDashboardLayoutProps {
    children: React.ReactNode;
}

export default function AdminDashboardLayout({children}: AdminDashboardLayoutProps) {
    return (
        <section>
            {children}
        </section>
    );
}