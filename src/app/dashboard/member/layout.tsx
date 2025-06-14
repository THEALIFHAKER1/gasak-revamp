interface MemberDashboardLayoutProps {
    children: React.ReactNode;
}

export default function MemberDashboardLayout({children}: MemberDashboardLayoutProps) {
    return (
        <section>
            {children}
        </section>
    );
}