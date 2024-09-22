import { useState } from "react";
import { useWriteContract, useAccount } from "wagmi";

import { wagmiContractConfig } from "./contracts";

export function BB({ score, bestScore }) {
  const { data, error, isPending, isError, writeContract } = useWriteContract();
  const { addresses } = useAccount();

  console.log(addresses);

  return (
    <div>
      <button
        onClick={() =>
          writeContract({
            ...wagmiContractConfig,
            functionName: "registerPlayer",
            args: [addresses?.[0]],
          })
        }
      >
        click me
      </button>
      <div>{data}</div>
      <div>{isPending}</div>
      <div>{isError}</div>
      <div>游戏值{score}-{bestScore}</div>
    </div>
  );
}
