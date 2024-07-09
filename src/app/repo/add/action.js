"use server";

import { redirect } from "next/navigation";

import Repo from "@/models/Repo";

export async function getRepo(prevState, formData) {
  const url = formData.get("url");

  const validate = Repo({ url });

  if (!validate.success) {
    return validate;
  }

  // get data from github api

  // save data to db

  // redirect to RAG page for repo
  redirect("/repo/status");
}
