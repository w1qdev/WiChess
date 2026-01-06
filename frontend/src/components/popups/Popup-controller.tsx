import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { apiInstance } from '../../api/api.service'
import { FormValidator } from '../../common/form.validator'
import { useAuthStore } from '../../store/store'
import type { PopupMode } from '../layout/Layout'
import { PopupLogin } from './Popup-login'
import { PopupSignUp } from './Popup-signup'

type PopupControllerPropsType = {
    currentPopupMode: PopupMode
    handleOpenSignUpPopup: () => void
    handleOpenLoginPopup: () => void
    handleClosePopup: () => void
}

export type FormDataType = {
    email: string | ''
    password: string | ''
    passwordRepeat: string | ''
    username: string | ''
}

export const PopupController = ({
    currentPopupMode,
    handleOpenSignUpPopup,
    handleOpenLoginPopup,
    handleClosePopup,
}: PopupControllerPropsType) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<FormDataType>({
        email: '',
        password: '',
        passwordRepeat: '',
        username: '',
    })
    const { setToken, setUsername } = useAuthStore()

    const handleChangeFormData = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.id]: event.target.value,
        }))
    }

    const sendForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

        if (currentPopupMode === 'login') {
            // Если вход в аккаунт

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

                        // Закрываем попап после успешного входа
                        handleClosePopup()
                        navigate('/playground')
                    }
                })
        } else if (currentPopupMode === 'signup') {
            // Если регистрация аккаунта

            if (formData.password !== formData.passwordRepeat) {
                return toast.error('Пароли не совпадают :(')
            }

            await apiInstance
                .signUpUser({
                    email: formData.email,
                    password: formData.password,
                    passwordRepeat: formData.passwordRepeat,
                    username: formData.username,
                })
                .then((res) => {
                    if (res.data?.error) {
                        return toast.error(res.data?.error)
                    }

                    if (res.data?.success) {
                        const accessToken = res.data?.tokens?.accessToken
                        if (accessToken) {
                            setToken(accessToken)
                        }

                        if (formData.username) {
                            setUsername(formData.username)
                        }

                        toast.success('Аккаунт успешно создан!')

                        handleClosePopup()
                        navigate('/playground')
                    }
                })
        }
    }

    return (
        <AnimatePresence>
            {currentPopupMode === 'signup' && (
                <PopupSignUp
                    key="signup"
                    trigger
                    triggerHandler={handleClosePopup}
                    triggerHandlerOpenLogin={handleOpenLoginPopup}
                    onSubmitHandler={sendForm}
                    formData={formData}
                    handleChangeFormData={handleChangeFormData}
                />
            )}

            {currentPopupMode === 'login' && (
                <PopupLogin
                    key="login"
                    trigger
                    triggerHandler={handleClosePopup}
                    triggerHandlerOpenSignUp={handleOpenSignUpPopup}
                    onSubmitHandler={sendForm}
                    formData={formData}
                    handleChangeFormData={handleChangeFormData}
                />
            )}
        </AnimatePresence>
    )
}
