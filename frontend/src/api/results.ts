import { request } from "./client";

export type ResultMode = "time";

export type CreateResultInput = {
  wpm: number;
  accuracy: number;
  correctCount: number;
  totalCount: number;
  durationSec: number;
  mode: ResultMode;
};

export type ResultItem = {
  id: string;
  userId: string;
  wpm: number;
  accuracy: number;
  correctCount: number;
  totalCount: number;
  durationSec: number;
  mode: ResultMode;
  createdAt: string;
};

export type MyResultsResponse = {
  items: ResultItem[];
  page: number;
  pageSize: number;
  total: number;
};

export type UserProfileStats = {
  bestWpm: number | null;
  bestAccuracy: number | null;
  avgWpm: number | null;
  avgAccuracy: number | null;
  totalGames: number;
};

export type UserProfile = {
  id: string;
  username: string;
  createdAt: string;
  stats: UserProfileStats;
};

export const createResult = (input: CreateResultInput) =>
  request("/results", {
    method: "POST",
    body: JSON.stringify(input),
  });

export const getMyResults = (page = 1, pageSize = 10) => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  return request<MyResultsResponse>(`/results/me?${params.toString()}`);
};

export const getUserProfile = (userId: string) =>
  request<UserProfile>(`/users/${userId}/profile`);
