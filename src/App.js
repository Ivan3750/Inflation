import { useState } from "react";
import InflationForm from "./components/InflationForm";
import InflationChart from "./components/InflationChart";
import { getCountryAmount } from "./services/countryAmount.service";
import { getDanmarkIndex } from "./services/denmark.service";
import { getInflationPercent } from "./services/percent.service";

export default function App() {
  const [state, setState] = useState({
    country: "ukraine",
    type: "percent",
    startDate: "2012/1/1",
    endDate: "2015/1/1",
    amount: 100,
    endPrice: ""
  });

  const [chart, setChart] = useState({ years: [], values: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.type === "percent") {
      const data = await getInflationPercent(
        state.startDate,
        state.endDate,
        state.country
      );
      setChart(data);
      setState((s) => ({ ...s, endPrice: "" }));
    } else if (state.country === "DK") {
      const result = await getDanmarkIndex(
        state.amount,
        state.startDate,
        state.endDate
      );
      setState((s) => ({ ...s, endPrice: result }));
    } else {
      const result = await getCountryAmount(
        state.amount,
        state.startDate,
        state.endDate,
        state.country
      );
      setState((s) => ({ ...s, endPrice: result }));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-14 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Inflation Calculator
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Analyze inflation trends or calculate how your money value changes over time.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <InflationForm
          state={state}
          setState={setState}
          onSubmit={handleSubmit}
        />
        <InflationChart
          years={chart.years}
          values={chart.values}
        />
      </section>
    </main>
  );
}
