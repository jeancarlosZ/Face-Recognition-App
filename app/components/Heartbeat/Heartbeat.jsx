import { useEffect } from "react";
import { heartbeat } from "../../api/heartbeat";

const heartbeatFunction = async () => {
  try {
    const response = await heartbeat();
    console.log("Heartbeat sent:", response);
  } catch (err) {
    console.log("Error sending heartbeat:", err);
  }
};

const Heartbeat = () => {
  useEffect(() => {
    heartbeatFunction();
    const intervalId = setInterval(heartbeatFunction, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default Heartbeat;
