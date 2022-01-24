import firebase from 'firebase';

export type Tokens = {
  privateKey: string,
  publicKey: string
}

export enum Currency {
  EUR = 'EUR',
  USD = 'USD'
}

export enum Period {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export const periodToElem = {
  [Period.DAILY]: 'day',
  [Period.MONTHLY]: 'month',
  [Period.WEEKLY]: 'week',
}

export type User = {
  hasDoneOnboarding: boolean;
  createdAt: firebase.firestore.Timestamp,
  id: string,
  lastDashboardUpdate: firebase.firestore.Timestamp
}
