import { AuthPanel, useAccount } from "@/components/site-account";

export default function LoginPage() {
  const account = useAccount();
  return <AuthPanel account={account} />;
}
