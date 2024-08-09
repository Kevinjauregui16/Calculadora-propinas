import { useMemo } from "react";
import { OrderItem } from "../types";
import { formatCurrency } from "../helpers";

type OrderTotalProps = {
  order: OrderItem[];
  tip: number;
  placeOrder: () => void;
};

export default function OrderTotal({
  order,
  tip,
  placeOrder,
}: OrderTotalProps) {
  const subtotalAmount = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order]);

  const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order]);

  const printTicket = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    if (!printWindow) return;

    const documentContent = `
      <html>
        <head>
          <title>Ticket</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .ticket { padding: 20px; }
            .ticket h2 { margin-top: 0; }
            .ticket p { margin: 5px 0; }
            .ticket .total { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="ticket">
            <h2>Totales y propina:</h2>
            <p>Subtotal a pagar: <span class="total">${formatCurrency(
              subtotalAmount
            )}</span></p>
            <p>Propina: <span class="total">${formatCurrency(
              tipAmount
            )}</span></p>
            <p>Total a pagar: <span class="total">${formatCurrency(
              totalAmount
            )}</span></p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(documentContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y propina:</h2>
        <p>
          Subtotal a pagar:{" "}
          <span className="font-bold">{formatCurrency(subtotalAmount)}</span>
        </p>
        <p>
          Propina:{" "}
          <span className="font-bold">{formatCurrency(tipAmount)}</span>
        </p>
        <p>
          Total a pagar:{" "}
          <span className="font-bold">{formatCurrency(totalAmount)}</span>
        </p>
      </div>
      <button
        className="w-full p-3 bg-blue-300 hover:bg-blue-200 transition-all font-bold text-white text-lg uppercase rounded-lg"
        onClick={() => {
          placeOrder();
          printTicket();
        }}
      >
        Guardar orden
      </button>
    </>
  );
}
