import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans dark:bg-white gap-2">
      <Link href="/login"><Button variant="default" color="primary">
        Login
      </Button></Link>
      <Link href="/sign-up"><Button variant="default" color="primary">
        Sign-Up
      </Button></Link>
    </div>
  );
}