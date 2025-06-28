export interface Review {
  id?: string;
  gameId: string;
  userId: string;
  comment: string;
  rating: number;
  userName?: string;
  createdAt?: string;
}
