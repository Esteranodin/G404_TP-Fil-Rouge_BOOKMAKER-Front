import UserDashboard from "@/components/dashboard/UserDashboard";

export const metadata = {
  title: "Tableau de bord | BookMaker",
  description: "Gérez votre compte et vos préférences"
};

export default function DashboardPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <UserDashboard />
    </main>
  );
}