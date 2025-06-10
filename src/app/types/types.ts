interface CollaboratorType {
  user_email: string;
  permission: string;
}

export interface NoteType {
  id?: string;
  _id?: string;
  title: string;
  content: string;
  owner: string;
  last_updated?: string;
  collaborator?: CollaboratorType;
}

export interface EditNoteType {
  id: string;
  title: string;
  content: string;
  collaborator?: CollaboratorType;
}

export interface NoteActionType {
  user_id: string;
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
}

export interface ViewNoteType {
  noteId: string;
}

export interface UserEmailProps {
  userEmail: string;
}

export interface UserIdProps {
  userId: string;
}

export interface UserStorageProps {
  user_id: string;
  name: string;
  user_email: string;
}
