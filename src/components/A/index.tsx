import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
} from "wagmi";
import abi from "../../abi/contract.abi";
import { useEffect, useState } from "react";

export const A = () => {

  const hey = async () => {
    console.log("hey111");
    const account = useAccount();
    const NULL_ADDRESS = account.addresses?.[0];
    console.log(NULL_ADDRESS);

    const { isPending, isSuccess, writeContractAsync } = useWriteContract();

    const UNI_CONTRACT_ADDRESS = "0x50755A185A71CCF017D686e7662D30CAE71b8294";
    // inside Profile()
    await writeContractAsync({
      address: UNI_CONTRACT_ADDRESS,
      abi: abi,
      functionName: "registerPlayer",
      args: [NULL_ADDRESS],
    });

    console.log(isPending, isSuccess);
  };

  //   console.log(data);
  return (
    <>
      <button onClick={hey} className="btn btn-primary">
        1111111111
      </button>
    </>
  );
};
