import { useState, useEffect, ChangeEvent } from 'react';
import api from '../services/api';
import { Document } from '../types';

interface Props {
  isAdmin?: boolean;
}

const DocumentList: React.FC<Props> = ({ isAdmin }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const fetchDocs = async () => {
    const res = await api.get('http://localhost:8080/api/documents');
    setDocuments(res.data.data);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleDelete = async (id: number) => {
    await api.delete(`http://localhost:8080/api/documents/${id}`);
    fetchDocs();
  };

  const handleReplace = async (id: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    await api.put(`http://localhost:8080/api/documents/${id}/replace`, formData);
    fetchDocs();
  };

  const handleFileChange = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleReplace(id, e.target.files[0]);
  };

  return (
    <div>
      <h2>Documents</h2>
      {documents.map(doc => (
        <div key={doc.id} style={{ border: '1px solid black', margin: 5, padding: 5 }}>
          <h3>{doc.title} ({doc.status})</h3>
          <p>{doc.description}</p>
          <a href={doc.fileUrl} target="_blank" rel="noreferrer">Download</a>
          <div>
            <input type="file" onChange={e => handleFileChange(doc.id, e)} />
            <button onClick={() => handleDelete(doc.id)}>Request Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;