import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// lib/utils/timeAgo.js
export function timeAgo(dateString) {
  const now = new Date()
  const postDate = new Date(dateString)
  const diff = Math.floor((now - postDate) / 1000) // 초 단위

  if (diff < 60) return `${diff}초 전`
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`

  return postDate.toLocaleDateString() // 7일 초과는 날짜로 표시
}