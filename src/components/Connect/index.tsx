import {
  useAccount,
  useConnect,
  useDisconnect,
  useAccountEffect,
  useWriteContract,
} from "wagmi";
import abi from "../../abi/contract.abi.json";

export default function Connect() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  // useAccountEffect({
  //   onConnect() {
  //     console.log("Connected!");
  //     const { data: hash, writeContract } = useWriteContract();
  //     console.log("Connected!11");
  //     const UNI_CONTRACT_ADDRESS = "0x50755A185A71CCF017D686e7662D30CAE71b8294";
  //     const NULL_ADDRESS = account.addresses?.[0];

  //     console.log(NULL_ADDRESS);
  //     writeContract({
  //       address: UNI_CONTRACT_ADDRESS,
  //       abi: abi,
  //       functionName: "registerPlayer",
  //       args: [NULL_ADDRESS],
  //     });
  //   },
  //   onDisconnect() {
  //     console.log("Disconnected!");
  //   },
  // });

  return (
    <>
      <div>
        <h2>Hello1 World! Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => {
              connect({ connector });
              console.log(status);
            }}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  );
}
