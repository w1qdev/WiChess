import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Header } from './components/header/Header'
import { PopupController } from './components/popups/Popup-controller'
import { WelcomePage } from './pages/WelcomePage/WelcomePage'
import { useAuth } from './store/store'

function App() {
    const [popupMode, setIsPopupOpen] = useState({
        isSignUpPopupOpen: false,
        isLoginPopupOpen: false,
    })
    const isUserAuthenticated = useAuth((state) => state.isAuthenticated)

    const handleOpenSignUpPopup = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        e.preventDefault()

        console.log(popupMode.isSignUpPopupOpen)

        setIsPopupOpen((prev) => ({
            ...prev,
            isSignUpPopupOpen: !prev.isSignUpPopupOpen,
        }))
        setIsPopupOpen((prev) => ({ ...prev, isLoginPopupOpen: false }))
    }

    const handleOpenLoginPopup = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        e.preventDefault()

        setIsPopupOpen((prev) => ({ ...prev }))

        setIsPopupOpen((prev) => ({
            ...prev,
            isSignUpPopupOpen: false,
        }))
        setIsPopupOpen((prev) => ({
            ...prev,
            isLoginPopupOpen: !prev.isLoginPopupOpen,
        }))
    }

    return (
        <div className="bg-[#1d1d1d] w-screen h-screen">
            <Header
                handleOpenSignUpPopup={handleOpenSignUpPopup}
                handleOpenLoginPopup={handleOpenLoginPopup}
            />

            <WelcomePage />

            <PopupController
                currentPopupMode={popupMode}
                handleOpenSignUpPopup={handleOpenSignUpPopup}
                handleOpenLoginPopup={handleOpenLoginPopup}
            />

            <Toaster />
        </div>
    )
}
export default App
