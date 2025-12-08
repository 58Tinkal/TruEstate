import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}
