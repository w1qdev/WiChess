import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router'
import { Header } from '../header/Header'
import { PopupController } from '../popups/Popup-controller'

export type PopupMode = 'login' | 'signup' | null

export function Layout() {
    const [popupMode, setPopupMode] = useState<PopupMode>(null)

    const handleOpenSignUpPopup = () => setPopupMode('signup')
    const handleOpenLoginPopup = () => setPopupMode('login')
    const handleClosePopup = () => setPopupMode(null)

    return (
        <div className="bg-[#1d1d1d] w-screen min-h-screen">
            <Header
                handleOpenSignUpPopup={handleOpenSignUpPopup}
                handleOpenLoginPopup={handleOpenLoginPopup}
            />

            <main>
                <Outlet />
            </main>

            <PopupController
                currentPopupMode={popupMode}
                handleOpenSignUpPopup={handleOpenSignUpPopup}
                handleOpenLoginPopup={handleOpenLoginPopup}
                handleClosePopup={handleClosePopup}
            />

            <Toaster />
        </div>
    )
}
