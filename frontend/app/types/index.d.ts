export interface User {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface Document {
  id: number;
  title: string;
  description: string;
  documentType: string;
  fileUrl: string;
  version: number;
  status: 'ACTIVE' | 'PENDING_DELETE' | 'PENDING_REPLACE';
  createdBy: number;
  createdAt: string;
}

export interface Permission {
  id: number;
  userId: number;
  documentId: number;
  action: 'DELETE' | 'REPLACE';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface Notification {
  id: number;
  userId: number;
  message: string;
  read: boolean;
  createdAt: string;
}
