import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout";
import { Statistik, Task } from "./pages";

function App() {
  return (
    <Routes>
      <Route
        path="/statistik"
        element={
          <Layout>
            <Statistik />
          </Layout>
        }
      />
      <Route
        path="/task"
        element={
          <Layout>
            <Task />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/statistik" />} />
    </Routes>
  );
}

export default App;
