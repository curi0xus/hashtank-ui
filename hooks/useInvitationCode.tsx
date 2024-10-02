import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useInvitationCode = () => {
  const router = useRouter();
  const [codeStatus, setCodeStatus] = useState<"used" | "unused" | null>(null);

  useEffect(() => {
    // Function to check and store the invitation code
    const checkAndStoreInvitationCode = async () => {
      const { invitationCode } = router.query;

      if (invitationCode) {
        try {
          // Call the Next.js API route
          const response = await fetch(
            `/api/invitationCode/check-invitation?invitationCode=${invitationCode}`
          );
          const data = await response.json();

          if (data.error) {
            console.error("Error from API:", data.error);
          } else {
            setCodeStatus(data.status); // Set status to 'used' or 'unused'
          }
        } catch (error) {
          console.error("Error checking invitation code:", error);
        }
      }
    };

    checkAndStoreInvitationCode();
  }, [router.query]);

  return codeStatus;
};

export default useInvitationCode;
