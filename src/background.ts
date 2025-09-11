//src/background.ts
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.runtime.sendMessage({
    type: "TAB_SWITCHED",
    tabId
  }).catch(() => {}) 
})

let currentAuth = { accountType: "guest", userId: null }

function updateAuthState() {
  chrome.identity.getAuthToken({ interactive: false }, (token) => {
    if (chrome.runtime.lastError || !token) {
      currentAuth = { accountType: "guest", userId: null }
    } else {
      chrome.identity.getProfileUserInfo((info) => {
        currentAuth = { accountType: "signed-in", userId: info.id || null }
      })
    }
    chrome.runtime.sendMessage({ type: "AUTH_STATE", ...currentAuth })
      .catch(() => {}) 
  })
}

chrome.identity.onSignInChanged.addListener(() => updateAuthState())
chrome.runtime.onStartup.addListener(() => updateAuthState())
chrome.runtime.onInstalled.addListener(() => updateAuthState())

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_AUTH_STATE") {
    sendResponse(currentAuth)
  }
})
