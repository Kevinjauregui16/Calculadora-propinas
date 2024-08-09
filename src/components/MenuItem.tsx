import type { MenuItem } from "../types";
import { formatCurrency } from "../helpers";

type MenuitemProps = {
  item: MenuItem;
  addItem: (item: MenuItem) => void;
};
export default function MenuItem({ item, addItem }: MenuitemProps) {
  return (
    <button
      className="border-2 border-blue-300 rounded-lg hover:bg-gray-100 w-full p-3 flex justify-between"
      onClick={() => addItem(item)}
    >
      <p className="text-2xl font-semibold text-start">{item.name}</p>
      <p className="font-bold text-lg md:text-2xl text-blue-400 my-auto">
        {formatCurrency(item.price)}
      </p>
    </button>
  );
}
