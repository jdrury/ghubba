import { useEffect } from "react";
import { useLocation } from "wouter";

export function Logout() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    fetch("http://localhost:8000/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
    }).then((resp) => {
      if (!resp.ok) {
        console.error(resp);
        return;
      }
      // TODO flickering
      setLocation("/");
      document.location.reload();
    });
  }, [setLocation]);

  return "Logging out...";
}
