import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (accessToken) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans dark:bg-white gap-2">
      <Link href="/login">
        <Button variant="default">Login</Button>
      </Link>
      <Link href="/sign-up">
        <Button variant="default">Sign-Up</Button>
      </Link>
    </div>
  );
}