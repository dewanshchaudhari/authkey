import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { Loader2, PlusCircle, Repeat2 } from "lucide-react";
import React from "react";

export default function Keys() {
  const [hide, setHide] = React.useState(true);
  const utils = api.useContext();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = api.user.getUserById.useQuery();
  const {
    mutate,
    isLoading: isRollApiKeyLoading,
    isError: isRollApiKeyError,
  } = api.key.rollApiKey.useMutation({
    onSuccess: async () => {
      await utils.user.getUserById.invalidate();
    },
  });
  if (isUserLoading) return <>loading...</>;
  if (isUserError || !user) return <>error...</>;
  return (
    <div className="w-full">
      <h1 className="break-normal text-lg font-medium sm:text-xl">API Keys</h1>
      <h2 className="text-xs text-gray-600 sm:text-sm">
        View and manage your Authkey API keys.
      </h2>
      <div className="mt-6 flex w-full flex-col gap-2 rounded-lg bg-gray-100 p-4">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div className="flex w-full flex-col gap-2 text-start">
            <h1 className="text-lg font-medium sm:text-xl">Quick Copy</h1>
            <p className="text-xs text-gray-600 sm:text-sm">
              Copy your API key to your clipboard.
            </p>
          </div>
          {!user.key && (
            <Button size="icon" variant="ghost" onClick={() => mutate()}>
              {isRollApiKeyLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <PlusCircle />
              )}
            </Button>
          )}
        </div>
        {user.key && (
          <div className="mt-6 hidden flex-col gap-2 rounded-md bg-gray-900 p-4 sm:flex sm:w-full">
            <div className="flex flex-row items-center justify-between">
              <span className="text-xs text-white sm:text-sm">.env</span>
              <div className="flex flex-row gap-4">
                <button onClick={() => mutate()}>
                  {isRollApiKeyLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Repeat2 className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <button
                  className="px-2 focus:outline-red-500"
                  onClick={() => setHide(!hide)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="h-4 w-4 text-gray-400 hover:text-gray-300"
                  >
                    <g fill="currentColor">
                      <path d="M10 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5Z"></path>
                      <path
                        fillRule="evenodd"
                        d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41c.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0a4 4 0 0 1 8 0Z"
                        clipRule="evenodd"
                      ></path>
                    </g>
                  </svg>
                </button>
                <button
                  className="rounded-md bg-gray-800 px-2 py-1 text-xs font-medium text-white hover:bg-gray-700 focus:outline-red-500 sm:text-sm"
                  onClick={() =>
                    void navigator.clipboard.writeText(user.key ?? "")
                  }
                >
                  Copy
                </button>
              </div>
            </div>
            <code className="flex flex-col text-xs sm:text-sm">
              <div className="flex flex-row">
                <span className="pr-4 text-gray-400">1</span>
                <span className=" text-blue-400/80">AUTHKEY_SECRET=</span>
                <span className="text-white">
                  {hide ? "authkey_••••••••••••••••••••••••" : user.key}
                </span>
              </div>
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
