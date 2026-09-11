import { DashboardPanel, useAccount } from "@/components/site-account";

export default function AccountPage() {
  const account = useAccount();
  return <DashboardPanel account={account} />;
}
