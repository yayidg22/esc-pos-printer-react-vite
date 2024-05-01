import { Fragment, useEffect, useMemo, useState } from "react";
import handleInvoicePrintExample from "./lib/invoice";
import Printer from "esc-pos-printer";
import "./App.css";

function App() {
  const [printersList, setPrintersList] = useState<string[] | []>([]);
  const [sharedPrinterName, setSharedPrinterName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleInvoicePrintClick = async () => {
    try {
      setLoading(true);
      await handleInvoicePrintExample(sharedPrinterName);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePrint = async () => {
    try {
      setLoading(true);
      const printer = new Printer(sharedPrinterName);
      printer.text("IT WORKS!!! :D\n");
      printer.feed(2);
      printer.cut();
      printer.close();
      await printer.print();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getPrintersList = async () => {
    try {
      const printer = new Printer();
      const printerList = await printer.getPrinters();
      setPrintersList(printerList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrintersList();
  }, []);

  const printersListOptions = useMemo(
    () =>
      printersList.map((item, i) => (
        <option key={`option-${i}-${item}`} value={item}>
          {item}
        </option>
      )),
    [printersList]
  );

  return (
    <Fragment>
      {loading ? (
        <h1>IMPRIMIENDO</h1>
      ) : (
        <Fragment>
          <h1>escpos-printer-example</h1>
          <h4>ESC/POS Printer-manager v1.0.0 BETA</h4>
          <div className="card">
            <label htmlFor="printerNameInput">Printer: </label>
            <select
              id="printerNameInput"
              value={sharedPrinterName}
              onChange={(e) => setSharedPrinterName(e.target.value)}
            >
              <option value="">Select printer</option>
              {printersListOptions}
            </select>

            <div className="buttons-container">
              <button onClick={() => handlePrint()}>TEST PRINT</button>
              <br />
              <button onClick={() => handleInvoicePrintClick()}>
                INVOICE PRINT
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
