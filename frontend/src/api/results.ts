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

export const createResult = (input: CreateResultInput) =>
  request("/results", {
    method: "POST",
    body: JSON.stringify(input),
  });
