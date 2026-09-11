import { AuthPanel, useAccount } from "@/components/site-account";

export default function SignupPage() {
  const account = useAccount();
  return <AuthPanel account={account} initialSignup />;
}
