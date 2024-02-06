export enum Status {
  Reading = 'reading',
  Read = 'read',
  Wish = 'wish',
  Queue = 'queue'
}

export interface Reading {
  title: string;
  authors: string[];
  rating: number;
  pagesRead: number;
  totalPages: number;
  finishDate: Date;
  startDate: Date;
  progress: number;
  status: Status;
  cover: string;
  amazonLink: string;
  pricing: number;
  pagesPerDay: number;
  daysToRead: number;
  meetingDate: Date;
}
