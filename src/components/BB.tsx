import { useState } from "react";
import { useWriteContract, useAccount } from "wagmi";

import { wagmiContractConfig } from "./contracts";

export function BB() {
  const { data, error, isPending, isError, writeContract } = useWriteContract();
  const { addresses } = useAccount();

  console.log(addresses);
  console.log("------------");
  console.log(data);
  console.log(error);
  console.log(isPending);

  return (
    <div>
      <button
        onClick={() =>
          writeContract({
            ...wagmiContractConfig,
            functionName: "registerPlayer",
            // args: [addresses?.[0], "UserNameNorman"],
            args: ["UserNameIsNorman"],
          })
        }
      >
        click me!
      </button>
      <div>{data}</div>
      <div>{isPending}</div>
      <div>{isError}</div>
      {/* <div>
        游戏值{score}-{bestScore}
      </div> */}
    </div>
  );
}
