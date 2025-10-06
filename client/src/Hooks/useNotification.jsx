import React, { useEffect } from "react";
import endPoint from "../API/Interface";

const useNotification = () => {
  const [notifications, setNotifications] = React.useState([]);
  const [unreadCount, setUnreadCount] = React.useState(0);

  async function fetchNotifications() {
    try {
      const response = await endPoint.get("/api/notifications", {
        headers: {
          authorization: `Bearer ${
            localStorage.getItem("adminAuthToken") ||
            localStorage.getItem("userAuthToken")
          }`,
        },
      });

      const data = response.data;

      if (data.status === true) {
        setNotifications(data.notifications);
        const unread = data.notifications.filter((n) => !n.viewed).length;
        setUnreadCount(unread);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);
  return { notifications, unreadCount };
};

export default useNotification;
