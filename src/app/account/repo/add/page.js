import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Title from "@/components/Title";
import Form from "./form";

export default async function Page() {
  // check authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <Title text="Check your repo" />
      <Form />
    </div>
  );
}
