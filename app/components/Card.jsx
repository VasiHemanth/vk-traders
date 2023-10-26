import Link from "next/link";
import { color } from "../utils/helper";

export default function Card({ lorry }) {
  //   if (goIn) {
  //     return <Navigate to="/vehicle" />;
  //   }

  return (
    <div className="p-2">
      <div className="w-80 bg-card rounded-md p-2 drop-shadow-md">
        <div className="flex justify-between">
          <div className="basis-1/2">
            <h1 className="font-bold text-slate-800">
              {lorry.registration_number}
            </h1>
            <p className="text-sm font-semibold text-slate-600 py-1 w-64">
              Driver: {lorry.driver_name}
            </p>
          </div>
          <div className="m-2">
            <Link
              href={`/vehicles/${lorry.registration_number}`}
              className="rounded-full hover:bg-purple-200"
            >
              <svg
                className="fill-slate-600 h-5 w-5 sm:h-6 sm:w-6 hover:cursor-pointer hover:fill-indigo-500"
                viewBox="0 0 1792 1792"
              >
                <path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center mt-2">
          <p className="text-sm text-gray-400">
            Status:
            <span className={`${color(lorry.status)} pl-2 font-bold`}>
              {lorry.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
