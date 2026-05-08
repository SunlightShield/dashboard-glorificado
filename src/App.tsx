import { useState } from "react";
import { ToastContainer } from "react-toastify";
import CardLogin from "./components/login/CardLogin";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const [session, setSession] = useState<{ name: string; role: string } | null>(
    null,
  );

  function handleLogin(name: string, role: string) {
    setSession({ name, role });
  }

  function handleLogout() {
    setSession(null);
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <CardLogin onLogin={handleLogin} />
        <ToastContainer />
      </div>
    );
  }

  return <Dashboard name={session.name} role={session.role} onLogout={handleLogout} />;
}

export default App;
