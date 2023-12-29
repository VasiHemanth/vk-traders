import Link from "next/link";
import { cookies } from "next/headers";
import EnvAPI from "@/lib/EnvAPI";

export const dynamic = "force-dynamic";

export default async function Order({ params, searchParams }) {
  const vehicleId = params["vehicleId"];
  const tripDetails = params["trip-details"];
  const orderId = searchParams["key"];
  const tripType = searchParams["trip-type"];

  const cookieStore = cookies();
  const access_token = cookieStore.get("django-auth-access");
  const envUrl = EnvAPI();

  const orderDetials = await fetch(
    `${envUrl}/api/order-data?orderId=${orderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token.value,
      },
      cache: "no-store",
    }
  );
  const response = await orderDetials.json();
  if (orderDetials.status === 200) {
    return (
      <div className="m-4 sm:m-8">
        <Link
          href={`/vehicles/${vehicleId}/${tripDetails}`}
          className="flex items-center justify-start w-[72px] gap-1 p-1
        hover:cursor-pointer hover:text-primary hover:bg-primary-foreground rounded-md"
          prefetch={false}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span>Back</span>
        </Link>
        <div className="mb-4 border-b border-neutral-300 flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-700">{vehicleId}</p>
            <p className="text-sm font-semibold text-gray-500">
              Shipment Number: {response.order_data[4].value}
            </p>
          </div>
          {!response.order_submit_status && (
            <Link
              href={{
                pathname: `/vehicles/${vehicleId}/${tripDetails}/submit-order`,
                query: {
                  key: orderId,
                  "trip-type": tripType,
                  "order-id": response.order_data[4].value,
                },
              }}
              className="relative cursor-pointer bg-purple-100 px-2 py-0.5 
          mb-1 text-sm font-semibold text-primary rounded-sm hover:bg-purple-200"
            >
              Submit Order
            </Link>
          )}
        </div>
        <div className="max-w-md mx-auto">
          {response.order_data.map((data, index) => (
            <div
              key={index}
              className="mb-4 w-full text-gray-600 font-medium flex flex-row"
            >
              <span className=" basis-1/2">{data.label}</span>
              <span className=" text-center basis-1/6">:</span>
              <span className="text-left basis-3/4">{data.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    logOutUser();
  }
}
