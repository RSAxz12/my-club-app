import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    "https://acgcejnucmaqgmpzqbv.supabase.co",
    "sb_publishable_7ZIA0Wa2HA3sy_vrsQKpcQ_EQl8-usj"
  );
}