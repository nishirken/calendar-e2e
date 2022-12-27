export const ORIGIN = process.env.ORIGIN ?? "http://localhost:8080";
export const API_ORIGIN = process.env.API_ORIGIN ?? "http://127.0.0.1:8081";
export const url = (input: string) => new URL(input, ORIGIN).toString();
export const apiUrl = (input: string) => new URL(input, API_ORIGIN).toString();
