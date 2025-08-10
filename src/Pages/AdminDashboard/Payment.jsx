import React, { useState } from "react";
import { Search, Filter, MoreVertical, X } from "lucide-react";
import { useGetPaymentListQuery } from "../../redux/features/baseApi";



export default function Payment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data: paymentInfo} = useGetPaymentListQuery()
  console.log(paymentInfo)

 console.log("Payment Info:", paymentInfo);


  return (
    <div className=" bg-gray-50 min-h-screen">
   

      {/* Table */}
      <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr className="bg-[#0A3161] text-white">
        <th className="py-3 px-4">User</th>
        <th className="py-3 px-4">Email</th>
        <th className="py-3 px-4">Amount</th>
        <th className="py-3 px-4">Plan</th>
        <th className="py-3 px-4">Status</th>
       
        <th className="py-3 px-4">Date</th>
      </tr>
    </thead>
    <tbody>
      {paymentInfo?.map((payment, index) => (
        <tr key={index} className="border-b dark:text-gray-900">
          <td className="py-3 px-4">
            <div>
              <p className="font-medium">{payment?.user_name}</p>
              
            </div>
          </td>
          <td className="py-3 px-4">{payment?.user_email}</td>
          <td className="py-3 px-4">{payment?.amount ? `$${payment.amount}` : '0'}</td>
          <td className="py-3 px-4">{payment.plan ? `${payment.plan}`: "Free"}</td>
          <td className="py-3 px-4">{payment.status ? `${payment.status}`: "Free"}</td>
         
        
          <td className="py-3 px-4 flex flex-col">
  <h1>
    Start Date:{" "}
    <span className="font-semibold">
      {payment?.start_date && new Date(payment.start_date).toLocaleDateString()}
    </span>
  </h1>
  <h1>
    End Date:{" "}
    <span className="font-semibold">
      {payment?.end_date && new Date(payment.end_date).toLocaleDateString()}
    </span>
  </h1>
</td>

        </tr>
      ))}
    </tbody>
  </table>
</div>

   
    </div>
  );
}