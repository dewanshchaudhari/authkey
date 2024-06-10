import { api } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const utils = api.useContext();
  const router = useRouter();
  api.user.getUserById.useQuery(undefined, {
    onSuccess: (data) => {
      if (!data?.stripeCustomerId) {
        console.log(data);
        createStripeCustomer();
      } else {
        void router.push("/dashboard/overview");
      }
    },
  });
  const {
    mutate: createStripeCustomer,
    isLoading: isStripeCreateLoading,
    isError: isStripeCreateError,
  } = api.stripe.createStripeCustomer.useMutation({
    onSuccess: async () => {
      await utils.user.getUserById.invalidate();
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Loader2 className="animate-spin" />
    </main>
  );
}
