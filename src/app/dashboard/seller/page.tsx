import { redirect } from "next/navigation";

export default function SellerDashboardPage() {
  // Redirect to main dashboard
  redirect("/dashboard/seller/main");
}
