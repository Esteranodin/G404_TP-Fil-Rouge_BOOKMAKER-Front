import LoginForm from "@/components/form/LoginForm";

export const metadata = {
  title: "Connexion | BookMaker",
  description: "Connectez-vous à votre compte BookMaker",
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-[80vh] p-6">
      <LoginForm />
    </main>
  );
}