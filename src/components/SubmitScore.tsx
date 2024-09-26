import { useState } from "react";
import { useWriteContract, useAccount } from "wagmi";

import { wagmiContractConfig } from "./contracts";

export function SubmitScore() {
  const score = 5;
  const { data, error, isPending, isError, writeContract } = useWriteContract();
  const { addresses } = useAccount();

  console.log(addresses);

  return (
    <div>
      <button
        className="border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() =>
          writeContract({
            ...wagmiContractConfig,
            functionName: "submitScore",
            args: [score],
          })
        }
      >
        click me Score
      </button>
      <div>{data}</div>
      <div>{isPending}</div>
      <div>{isError}</div>
    </div>
  );
}
