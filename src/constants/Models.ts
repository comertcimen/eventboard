export interface EventInterface {
  certainty: string;
  created_at: string;
  event_date: string;
  description: string;
  id: string;
  images: string[] | null;
  title: string;
  user_id: string;
  user: UserInterface;
  people_attending: AttendingPeopleInterface[] | [];
}

export interface UserInterface {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  avatar_url?: string;
}

export interface AttendingPeopleInterface {
  id: string;
  user_id: string;
  event_id: string;
}
