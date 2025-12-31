import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { PopupLogin } from './Popup-login'
import { PopupSignUp } from './Popup-signup'

type PopupControllerPropsType = {
    currentPopupMode: {
        isSignUpPopupOpen: boolean
        isLoginPopupOpen: boolean
    }
    handleOpenSignUpPopup: (e: React.MouseEvent<HTMLElement>) => void
    handleOpenLoginPopup: (e: React.MouseEvent<HTMLElement>) => void
}

export const PopupController = ({
    currentPopupMode,
    handleOpenSignUpPopup,
    handleOpenLoginPopup,
}: PopupControllerPropsType) => {
    const [formData, setFormData] = useState({
        email: null,
        password: null,
        passwordRepeat: null,
    })

    const sendForm = async () => {
        if (!formData.email || !formData.password) {
            return toast.error('Поля не заполнены')
        }
    }

    return (
        <AnimatePresence>
            {currentPopupMode.isSignUpPopupOpen && (
                <PopupSignUp
                    key="signup"
                    trigger={currentPopupMode.isSignUpPopupOpen}
                    triggerHandler={handleOpenSignUpPopup}
                    triggerHandlerOpenLogin={handleOpenLoginPopup}
                    onSubmitHandler={sendForm}
                />
            )}

            {currentPopupMode.isLoginPopupOpen && (
                <PopupLogin
                    key="login"
                    trigger={currentPopupMode.isLoginPopupOpen}
                    triggerHandler={handleOpenLoginPopup}
                    triggerHandlerOpenSignUp={handleOpenSignUpPopup}
                    onSubmitHandler={sendForm}
                />
            )}
        </AnimatePresence>
    )
}
