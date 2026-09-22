import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    "https://acgcejnucmaqgmpzqbv.supabase.co",
    "sb_publishable_7ZIA0Wa2HA3sy_vrsQKpcQ_EQl8-usj",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignored from Server Component
          }
        },
      },
    }
  );
}