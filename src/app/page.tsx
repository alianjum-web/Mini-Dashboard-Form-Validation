import { ProductDashboard } from "@/components/ProductDashboard";
import { UserInputForm } from "@/components/UserInputForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-8 dark:bg-black">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Mini Dashboard + Form Validation
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
            Built with React hooks, TypeScript typing, and TailwindCSS for a
            scalable and production-friendly UI foundation.
          </p>
        </header>

        <ProductDashboard />
        <UserInputForm />
      </main>
    </div>
  );
}
