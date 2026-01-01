import { AnimatePresence } from 'framer-motion'
import { useState, type FormEventHandler } from 'react'
import toast from 'react-hot-toast'
import { apiInstance } from '../../api/api.service'
import { FormValidator } from '../../common/form.validator'
import { useAuthStore } from '../../store/store'
import { PopupLogin } from './Popup-login'
import { PopupSignUp } from './Popup-signup'

type PopupControllerPropsType = {
    currentPopupMode: {
        isSignUpPopupOpen: boolean
        isLoginPopupOpen: boolean
        isRefreshPopupOpen: boolean
    }
    handleOpenSignUpPopup: (e: React.MouseEvent<HTMLElement>) => void
    handleOpenLoginPopup: (e: React.MouseEvent<HTMLElement>) => void
}

export type FormDataType = {
    email: string | ''
    password: string | ''
    passwordRepeat: string | ''
}

export const PopupController = ({
    currentPopupMode,
    handleOpenSignUpPopup,
    handleOpenLoginPopup,
}: PopupControllerPropsType) => {
    const [formData, setFormData] = useState<FormDataType>({
        email: '',
        password: '',
        passwordRepeat: '',
    })
    const { setToken } = useAuthStore()

    const handleChangeFormData = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.id]: event.target.value,
        }))
    }

    const sendForm = async (e: React.FormEvent<FormEventHandler>) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            return toast.error('Поля не заполнены')
        }

        const isEmailCorrect = FormValidator.emailValidation({
            email: formData.email,
        })
        const isPasswordCorrect = FormValidator.passwordValidation({
            password: formData.password,
        })

        if (!isEmailCorrect || !isPasswordCorrect) {
            return toast.error('Неверный Email или Пароль')
        }

        if (currentPopupMode.isLoginPopupOpen) {
            // Если вход в аккаунт
            // TODO: Сделать проверку на правильность ввода email и пароля через regex

            await apiInstance
                .loginUser({
                    email: formData.email,
                    password: formData.password,
                })
                .then((res) => {
                    if (res.data?.error) {
                        return toast.error(res.data?.error)
                    }

                    if (res.data?.success) {
                        if (res.data?.token) {
                            setToken(res.data?.token)
                        }
                    }
                })
        } else if (currentPopupMode.isSignUpPopupOpen) {
            // Если регистрация аккаунта
            // TODO: Сделать проверку на правильность ввода email и пароля через regex

            if (formData.password !== formData.passwordRepeat) {
                return toast.error('Пароли не совпадают :(')
            }

            await apiInstance
                .signUpUser({
                    email: formData.email,
                    password: formData.password,
                    passwordRepeat: formData.passwordRepeat,
                })
                .then((res) => {
                    if (res.data?.error) {
                        return toast.error(res.data?.error)
                    }

                    if (res.data?.success) {
                        if (res.data?.token) {
                            setToken(res.data?.token)
                        }

                        return toast.success('Аккаунт успешно создан!')
                    }
                })
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
                    formData={formData}
                    handleChangeFormData={handleChangeFormData}
                />
            )}

            {currentPopupMode.isLoginPopupOpen && (
                <PopupLogin
                    key="login"
                    trigger={currentPopupMode.isLoginPopupOpen}
                    triggerHandler={handleOpenLoginPopup}
                    triggerHandlerOpenSignUp={handleOpenSignUpPopup}
                    onSubmitHandler={sendForm}
                    formData={formData}
                    handleChangeFormData={handleChangeFormData}
                />
            )}
        </AnimatePresence>
    )
}
