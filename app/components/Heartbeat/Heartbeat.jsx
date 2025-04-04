import { useEffect } from "react";
import { heartbeat } from "../../api/heartbeat";

const Heartbeat = () => {
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await heartbeat();
        console.log("Heartbeat sent:", response);
      } catch (err) {
        console.log("Error sending heartbeat", err);
      }
    }, 13 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return null;
}

export default Heartbeat;
