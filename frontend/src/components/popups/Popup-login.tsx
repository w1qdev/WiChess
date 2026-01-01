import { type FormEventHandler } from 'react'
import { Popup } from './Popup'
import { type FormDataType } from './Popup-controller'

type PopupLoginPropsType = {
    trigger: boolean
    triggerHandler: (e: React.MouseEvent<HTMLElement>) => void
    onSubmitHandler: (e: React.FormEvent<FormEventHandler>) => void
    triggerHandlerOpenSignUp: (e: React.MouseEvent<HTMLElement>) => void
    formData: FormDataType
    handleChangeFormData: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const PopupLogin = ({
    trigger,
    triggerHandler,
    onSubmitHandler,
    triggerHandlerOpenSignUp,
    formData,
    handleChangeFormData,
}: PopupLoginPropsType) => {
    return (
        <Popup
            trigger={trigger}
            triggerHandler={triggerHandler}
            title="Вход в WiChess"
        >
            <form className="flex flex-col">
                <div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1.5 text-sm">
                            Почта
                        </label>
                        <input
                            id="email"
                            required
                            type="email"
                            placeholder="emailexample@gmail.com"
                            className="bg-[#131313] h-10 rounded-md outline-none px-2 border-transparent border-2 focus:border-[#fcc028] hover:border-[#fbbe243b] transition-colors duration-300"
                            value={formData.email}
                            onChange={handleChangeFormData}
                        />
                    </div>

                    <div className="flex flex-col mt-2">
                        <div className="flex justify-between items-center">
                            <label
                                htmlFor="password"
                                className="mb-1.5 text-sm"
                            >
                                Пароль
                            </label>
                            <div className="w-full h-5 text-sm flex justify-end gap-1">
                                Забыли пароль?
                                <button className="cursor-pointer underline hover:text-[#fcc028]">
                                    Восстановить
                                </button>
                            </div>
                        </div>
                        <input
                            id="password"
                            required
                            type="password"
                            className="bg-[#131313] h-10 rounded-md outline-none px-2 border-transparent border-2 focus:border-[#fcc028] hover:border-[#fbbe243b] transition-colors duration-300"
                            value={formData.password}
                            onChange={handleChangeFormData}
                        />
                    </div>
                </div>
                <div className="w-full h-30 mt-8">
                    <button
                        className="h-10 w-full flex justify-center items-center bg-[#fcc028] text-[#343434] rounded-sm cursor-pointer"
                        onClick={onSubmitHandler}
                    >
                        Войти
                    </button>

                    <button
                        className="w-full mt-2 cursor-pointer px-10 py-2 bg-[#181818] text-[#d8d8d8] text-md font-mediu, rounded-sm hover:bg-[#303030] hover:text-[#ffd56b] transition-colors duration-300"
                        onClick={triggerHandlerOpenSignUp}
                    >
                        Нет аккаунта? Зарегистрироваться
                    </button>
                </div>
            </form>
        </Popup>
    )
}
