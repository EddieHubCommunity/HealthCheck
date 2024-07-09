import { z } from "zod";

export default function Repo({ url }) {
  const schema = z.object({
    url: z.string().url(),
  });

  const validatedFields = schema.safeParse({ url });

  return {
    data: { url },
    success: validatedFields.success,
    errors: validatedFields.error?.flatten().fieldErrors,
  };
}
