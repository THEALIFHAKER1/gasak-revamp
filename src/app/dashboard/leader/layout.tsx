interface LeaderDashboardLayoutProps {
    children: React.ReactNode;
}

export default function LeaderDashboardLayout({children}: LeaderDashboardLayoutProps) {
    return (
        <section>
            {children}
        </section>
    );
}