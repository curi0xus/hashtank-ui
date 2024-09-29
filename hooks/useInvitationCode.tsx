import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const useInvitationCode = () => {
  const router = useRouter();
  const [codeStatus, setCodeStatus] = useState<"used" | "unused" | null>(null); // To track the status of the invitation code

  useEffect(() => {
    // Function to check and store the invitation code
    const checkAndStoreInvitationCode = async () => {
      const { invitationCode } = router.query;

      if (invitationCode) {
        // Check if the invitation code exists in the Supabase table
        const { data: existingCode, error } = await supabase
          .from("invitations")
          .select("*")
          .eq("invitation_code", invitationCode)
          .single();

        if (error && error.code !== "PGRST116") {
          // Handle error if it's not about a non-existent row
          console.error("Error checking invitation code:", error);
          return;
        }

        if (existingCode) {
          // If the invitation code has already been used
          setCodeStatus("used");
        } else {
          // If the invitation code hasn't been used, store it in the database
          const { error: insertError } = await supabase
            .from("invitations")
            .insert([{ invitation_code: invitationCode }]);

          if (insertError) {
            console.error("Error inserting invitation code:", insertError);
            return;
          }

          // Mark the code as new/unused
          setCodeStatus("unused");
        }
      }
    };

    checkAndStoreInvitationCode();
  }, [router.query]);

  return codeStatus; // Return the status of the code ('used', 'unused', or null if no code yet)
};

export default useInvitationCode;
