export default function InflationForm({ state, setState, onSubmit }) {
  const update = (key) => (e) =>
    setState((s) => ({ ...s, [key]: e.target.value }));

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-3xl shadow-lg p-8 space-y-5"
    >
      <h2 className="text-2xl font-semibold text-slate-900">
        Calculator Settings
      </h2>

      <input
        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="number"
        value={state.amount}
        onChange={update("amount")}
        placeholder="Initial amount"
      />

      <input
        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={state.startDate}
        onChange={update("startDate")}
        placeholder="Start date"
      />

      <input
        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={state.endDate}
        onChange={update("endDate")}
        placeholder="End date"
      />

      <select
        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={state.country}
        onChange={update("country")}
      >
        <option value="ukraine">Ukraine</option>
        <option value="DK">Denmark</option>
      </select>

      <select
        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={state.type}
        onChange={update("type")}
      >
        <option value="percent">Inflation percent</option>
        <option value="money">Money value</option>
      </select>

      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition">
        Calculate
      </button>

      {state.endPrice && (
        <div className="text-lg font-semibold text-slate-800 text-center">
          Result: {state.endPrice}
        </div>
      )}
    </form>
  );
}
