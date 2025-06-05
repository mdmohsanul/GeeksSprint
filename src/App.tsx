import {Outlet} from 'react-router-dom'
import './App.css'
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  // const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    useAuthStore.getState().checkAuth();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App
