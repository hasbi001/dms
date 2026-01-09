"use client";

import { useState, useEffect } from 'react';
import api from '../services/api';
import { Document } from '../types';

const AdminPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const fetchDocuments = async () => {
    const res = await api.get('http://localhost:8080/api/documents');
    setDocuments(res.data.data.filter((d: Document) => d.status !== 'ACTIVE'));
  };

  const approve = async (id: number) => {
    await api.post(`http://localhost:8080/api/documents/permissions/${id}/approve`);
    fetchDocuments();
  };

  const reject = async (id: number) => {
    await api.post(`http://localhost:8080/api/documents/permissions/${id}/reject`);
    fetchDocuments();
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div>
      <h1>Admin Approval</h1>
      {documents.map(d => (
        <div key={d.id} style={{ border: '1px solid black', margin: 5, padding: 5 }}>
          <h3>{d.title} ({d.status})</h3>
          <button onClick={() => approve(d.id)}>Approve</button>
          <button onClick={() => reject(d.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;