import { request } from "./client";

export type LeaderboardItem = {
  rank: number;
  userId: string;
  username: string;
  bestWpm: number | null;
  bestAccuracy: number | null;
  totalGames: number;
};

export type LeaderboardResponse = {
  items: LeaderboardItem[];
  page: number;
  pageSize: number;
  total: number;
};

export type MyRankResponse = {
  rank: number | null;
  bestWpm: number | null;
};

export type GetLeaderboardInput = {
  mode?: "time";
  page?: number;
  pageSize?: number;
};

export const getLeaderboard = ({ mode = "time", page = 1, pageSize = 20 }: GetLeaderboardInput = {}) => {
  const params = new URLSearchParams({
    mode,
    page: String(page),
    pageSize: String(pageSize),
  });

  return request<LeaderboardResponse>(`/leaderboard?${params.toString()}`);
};

export const getMyRank = (mode: "time" = "time") => {
  const params = new URLSearchParams({ mode });
  return request<MyRankResponse>(`/leaderboard/me?${params.toString()}`);
};
