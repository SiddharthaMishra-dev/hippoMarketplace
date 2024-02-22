"use client";

interface PaymentStatusProps {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
}
const PaymentStatus = ({ orderEmail, isPaid, orderId }: PaymentStatusProps) => {
  return (
    <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
      <div>
        <p className="font-medium text-gray-900">Shipping To</p>

        <p>{orderEmail}</p>
      </div>

      <div>
        <p className="font-medium text-gray-900">Order Status</p>
        <p>{isPaid ? "Payment Successfull" : "Payment Pending"}</p>
      </div>
    </div>
  );
};

export default PaymentStatus;
