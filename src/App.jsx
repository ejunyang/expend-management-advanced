import Router from "./shared/Router";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { ExpenseProvider } from "./context/ExpenseContext";

const App = () => {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Router />
      </ExpenseProvider>
    </AuthProvider>
  );
};

export default App;
