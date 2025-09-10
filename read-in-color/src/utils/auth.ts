// src/utils/auth.ts
export const getAuthToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        reject(new Error(chrome.runtime.lastError?.message || "Authentication token not received"))
      } else {
        resolve(token)
      }
    })
  })
}
  