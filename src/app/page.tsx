import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Customer from "@/app/(pages)/customer/page";
import Employee from "@/app/(pages)/employee/page";

export default function Home() {
  return (
    <div>
      <div>HOME</div>
      <Link href="/customer">Customer</Link>
      <Link href="/employee">Employee</Link>
    </div>
  );
}
