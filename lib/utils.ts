import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseJWT(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
}

export function loadUserAuthData(data: any) {
    const tokenData = parseJWT(data.token)
    return {
        token: data.token,
        refreshToken: data.refreshToken,
        name: data.name,
        lastname: data.lastname,
        email: tokenData.email,
        rootDirectoryId: data.rootDirectoryId,
        uid: tokenData.user_id,
    }
}