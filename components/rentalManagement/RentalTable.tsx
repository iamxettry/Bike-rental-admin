import {
  AlertTriangle,
  Bike,
  Calendar,
  CheckCircle,
  Clock4,
  DollarSign,
  User,
  XCircle,
} from "lucide-react";
import React from "react";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
const getStatusColor = (status: string) => {
  const colors = {
    active: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
    cancelled: "bg-gray-100 text-gray-800 border-gray-200",
    overdue: "bg-red-100 text-red-800 border-red-200",
    paid: "bg-green-100 text-green-800 border-green-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    refunded: "bg-purple-100 text-purple-800 border-purple-200",
  };
  return (
    colors[status as keyof typeof colors] ||
    "bg-gray-100 text-gray-800 border-gray-200"
  );
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "pending":
      return <Clock4 className="w-4 h-4 text-yellow-500" />;
    case "completed":
      return <CheckCircle className="w-4 h-4 text-blue-500" />;
    case "cancelled":
      return <XCircle className="w-4 h-4 text-gray-500" />;
    case "overdue":
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    default:
      return null;
  }
};
type RentalTableProps = {
  data: any; //TODO: fix any type here
  isLoading: boolean;
};
const RentalTable = ({ data, isLoading }: RentalTableProps) => {
  console.log(data, "data");
  return (
    <>
      {/* Rentals List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden  ">
        <div className="overflow-x-scroll ">
          <table className="min-w-full divide-y divide-gray-200 max-w-3xl">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rental Details
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dates
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.results.map(
                (
                  rental: any //TODO: fix any type here
                ) => (
                  <tr key={rental.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 ">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Bike className="h-10 w-10 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {rental.bike_details.name}
                          </div>
                          <div className="text-sm font-medium text-gray-700">
                            {rental.bike_details.color}
                          </div>
                          {/* <div className="text-sm text-gray-500">
                          ID: {rental.id}
                        </div> */}
                          <div className="text-sm text-gray-500">
                            ${rental.bike_details.price}/day
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {rental.user_details.username}
                          </div>
                          <div className="text-sm text-gray-500">
                            {rental.user_details.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getStatusIcon(rental.rental_status)}
                        <span
                          className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            rental.rental_status
                          )}`}
                        >
                          {rental.rental_status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-900">
                            ${rental.total_amount}
                          </span>
                        </div>
                        <span
                          className={`mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center ${getStatusColor(
                            rental.payment_status
                          )}`}
                        >
                          {rental.payment_status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                          <span>{formatDate(rental.pickup_date)}</span>
                        </div>
                        <div className="flex items-center mt-1 text-gray-500">
                          <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                          <span>{formatDate(rental.dropoff_date)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          // onClick={() => handleEditRental(rental)}
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RentalTable;
