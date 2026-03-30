import { ThemeProvider } from './context/ThemeProvider'
import Popup from './pages/Popup'

export default function App() {
    return (
        <ThemeProvider>
            <Popup />
        </ThemeProvider>
    )
}