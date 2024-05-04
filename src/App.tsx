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

  /* Simple test */
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

  /* Simple test */
  const handlePrintUnifont = async () => {
    try {
      setLoading(true);
      const printer = new Printer(sharedPrinterName, { textSpecial: true, });
      printer.text("IT WORKS!!! :D\n");
      printer.text("Hola esto funciona\n");
      printer.text("Ողջույն, սա աշխատում է: \n");
      printer.text("こんにちは、これは機能します \n");
      printer.text("안녕하세요 이게 작동해요 \n");
      printer.text("你好，这有效 \n");
      printer.feed(2);
      printer.cut();
      printer.close();
      await printer.print();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

    /* Simple test */
    const handlePrintAsian = async () => {
      try {
        setLoading(true);
        const printer = new Printer(sharedPrinterName, { textAsian: true });
        printer.text("こんにちは、これは機能します \n");
        printer.text("你好，这有效 \n");
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
              <button onClick={() => handlePrintUnifont()}>TEST UNIFONT PRINT</button>
              <br />
              <button onClick={() => handlePrintAsian()}>TEST ASIAN TEXT PRINT</button>
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
