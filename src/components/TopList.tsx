import { useReadContract } from "wagmi";
import { wagmiContractConfig } from "./contracts";

export function TopList() {
  //   const { data, isRefetching, refetch, isLoading, isSuccess } = useReadContract(
  //     {
  //       ...wagmiContractConfig,
  //       functionName: "getLeaderboard",
  //       args: [],
  //     }
  //   );

  const { data, error, isPending } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getLeaderboard",
  });

  console.log("=====");
  console.log(data);
  console.log(isPending);
  console.log(error);

  return (
    <div>
      <button
        // onClick={async () => refetch()}
        className="border-2 border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        click me! Top List
      </button>
      {/* <div>{data}</div> */}
      {/* <div>{isRefetching}</div> */}
      {/* <div>
        游戏值{score}-{bestScore}
      </div> */}
    </div>
  );
}
