import MenuItem from "./components/MenuItem";
import OrderContent from "./components/OrderContent";
import OrderTotal from "./components/OrderTotal";
import TipPercentageForm from "./components/TipPercentageForm";
import { menuItems } from "./data/db";
import useOrder from "./hooks/useOrder";

function App() {
  const { order, tip, setTip, addItem, removeItem, placeOrder } = useOrder();

  return (
    <>
      <header className="bg-blue-300 py-4">
        <h1 className="text-center text-3xl font-bold md:font-black text-white">
          Calculadora de propinas y consumos
        </h1>
      </header>
      <main className="max-w-7xl mx-auto md:py-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-bold text-blue-300">Menu</h2>
          <div className="space-y-3 mt-10">
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} addItem={addItem} />
            ))}
          </div>
        </div>

        <div className="border border-dashed border-blue-300 p-5 mx-5 rounded-lg space-y-10 mb-28">
          {order.length ? (
            <>
              <OrderContent order={order} removeItem={removeItem} />

              <TipPercentageForm setTip={setTip} tip={tip} />

              <OrderTotal order={order} tip={tip} placeOrder={placeOrder} />
            </>
          ) : (
            <p className="text-red-300 text-xl font-semibold text-center uppercase">
              La orden esta vacia
            </p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
