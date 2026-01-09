import { useState, useEffect } from 'react';
import api from '../services/api';
import { Notification } from '../types';

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    const res = await api.get('http://localhost:8080/api/notifications');
    setNotifications(res.data);
  };

  const markRead = async (id: number) => {
    await api.put(`http://localhost:8080/api/notifications/${id}/read`);
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map(n => (
        <div key={n.id} style={{ border: '1px solid gray', margin: 3, padding: 3 }}>
          <p>{n.message} {n.read ? '(Read)' : '(Unread)'}</p>
          {!n.read && <button onClick={() => markRead(n.id)}>Mark as read</button>}
        </div>
      ))}
    </div>
  );
};

export default NotificationList;