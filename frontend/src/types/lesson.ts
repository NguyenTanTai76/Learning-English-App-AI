export interface UserRef {
  _id: string;
  username: string;
  email?: string;
}

export interface Comment {
  _id: string;
  content: string;
  userId: UserRef;
  createdAt: string;
}

export interface Lesson {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: UserRef;
  comments?: Comment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface LessonFormData {
  title: string;
  content: string;
  image?: File;
}
