//src/sidepanel.tsx
import App from "~App"
import { AuthProvider } from "~authContext"
import "~style.css"

function IndexPopup() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

export default IndexPopup
