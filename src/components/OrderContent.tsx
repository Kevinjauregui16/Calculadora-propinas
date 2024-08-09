import { formatCurrency } from "../helpers";
import { MenuItem, OrderItem } from "../types";

type OrderContentProps = {
  order: OrderItem[];
  removeItem: (id: MenuItem["id"]) => void;
};

export default function OrderContent({ order, removeItem }: OrderContentProps) {
  return (
    <div>
      <h2 className="text-4xl font-bold text-blue-300">Consumo</h2>
      <div className="space-y-3 mt-5">
        {order.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-t border-gray-300 py-4 last-of-type:border-b"
          >
            <div className="">
              <p className="text-2xl">
                {item.name} - {formatCurrency(item.price)}
              </p>
              <p className="font-black">
                Cantidad: {item.quantity} -{" "}
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>

            <button
              className="text-white text-lg font-black bg-red-400 hover:bg-red-300 transition-all h-7 w-7 rounded-full"
              onClick={() => removeItem(item.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
