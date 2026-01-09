"use client";

import { useEffect, useState } from 'react';
import DocumentForm from '../components/DocumentForm';
import DocumentList from '../components/DocumentList';
import NotificationList from '../components/NotificationList';
import { isAdmin } from '../utils/auth';

const DashboardPage: React.FC = () => {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    setAdmin(isAdmin()); // aman
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <NotificationList />
      <DocumentForm onUploaded={() => location.reload()} />
      <DocumentList />
    </div>
  );
};

export default DashboardPage;