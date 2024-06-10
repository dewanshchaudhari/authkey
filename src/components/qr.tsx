import { api } from "@/utils/api";
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function Qr({ id }: { id: number }) {
  const [open, setOpen] = React.useState(false);
  const utils = api.useContext();

  const {
    data: instance,
    isLoading: isInstanceLoading,
    isError: isInstanceError,
    refetch,
  } = api.account.generateInstance.useQuery(undefined, {
    enabled: false,
  });
  const {
    data: check,
    isLoading: isCheckLoading,
    isError: isCheckError,
  } = api.account.checkInstanceStatus.useQuery(
    {
      token: instance?.token ?? "",
      instanceId: instance?.instanceId ?? "",
      uid: instance?.uid ?? "",
    },
    {
      enabled: !!instance && open,
      refetchInterval: (data) => (data?.status ? false : 2000),
      onSuccess: (data) => {
        if (data.status) {
          addAccount({ instaceId: instance?.instanceId ?? "", id });
        }
      },
    }
  );
  const {
    mutate: addAccount,
    isLoading,
    isError,
  } = api.account.addAccount.useMutation({
    onSuccess: async () => {
      await utils.account.getAccountByUserId.invalidate();
      setOpen(false);
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" onClick={() => void refetch()}>
          <PlusCircle className="mr-2 h-4 w-4 " />
          Connect
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scan Qr code</DialogTitle>
          <DialogDescription>
            Add whatsapp account by scanning the qrcode. Make sure to check the
            status.
          </DialogDescription>
        </DialogHeader>
        {instance && (
          <Image src={instance.qrcode} width={500} height={500} alt="qrcode" />
        )}
        {isInstanceLoading && (
          <div className="flex h-[375px] w-[375px] flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}

        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
