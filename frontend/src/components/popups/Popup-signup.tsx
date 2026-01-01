import { type FormEventHandler } from 'react'
import { Popup } from './Popup'
import { type FormDataType } from './Popup-controller'

type PopupSignUpPropsType = {
    trigger: boolean
    triggerHandler: (e: React.MouseEvent<HTMLElement>) => void
    onSubmitHandler: (e: React.FormEvent<FormEventHandler>) => void
    triggerHandlerOpenLogin: (e: React.MouseEvent<HTMLElement>) => void
    formData: FormDataType
    handleChangeFormData: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const PopupSignUp = ({
    trigger,
    triggerHandler,
    onSubmitHandler,
    triggerHandlerOpenLogin,
    formData,
    handleChangeFormData,
}: PopupSignUpPropsType) => {
    return (
        <Popup
            trigger={trigger}
            triggerHandler={triggerHandler}
            title="Регистрация в WiChess"
        >
            <form className="flex flex-col">
                <div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1.5 text-sm">
                            Email
                        </label>
                        <input
                            id="email"
                            placeholder="emailexample@gmail.com"
                            required
                            type="email"
                            className="bg-[#131313] h-10 rounded-md outline-none px-2 border-transparent border-2 focus:border-[#fcc028] hover:border-[#fbbe243b] transition-colors duration-300"
                            value={formData.email}
                            onChange={handleChangeFormData}
                        />
                    </div>

                    <div className="flex flex-col mt-2">
                        <label htmlFor="password" className="mb-1.5 text-sm">
                            Your password
                        </label>
                        <input
                            id="password"
                            required
                            type="password"
                            className="bg-[#131313] h-10 rounded-md outline-none px-2 border-transparent border-2 focus:border-[#fcc028] hover:border-[#fbbe243b] transition-colors duration-300"
                            value={formData.password}
                            onChange={handleChangeFormData}
                        />
                    </div>

                    <div className="flex flex-col mt-2">
                        <label htmlFor="pasword" className="mb-1.5 text-sm">
                            Repeat password
                        </label>
                        <input
                            id="passwordRepeat"
                            required
                            type="password"
                            className="bg-[#131313] h-10 rounded-md outline-none px-2 border-transparent border-2 focus:border-[#fcc028] hover:border-[#fbbe243b] transition-colors duration-300"
                            value={formData.passwordRepeat}
                            onChange={handleChangeFormData}
                        />
                    </div>
                </div>
                <div className="w-full h-30 mt-8">
                    <button
                        className="h-10 w-full flex justify-center items-center bg-[#fcc028] text-[#343434] rounded-sm cursor-pointer"
                        onClick={onSubmitHandler}
                    >
                        Зарегистрироваться
                    </button>

                    <button
                        className="w-full mt-2 cursor-pointer px-10 py-2 bg-[#181818] text-[#d8d8d8] text-md font-mediu, rounded-sm hover:bg-[#303030] hover:text-[#ffd56b] transition-colors duration-300"
                        onClick={triggerHandlerOpenLogin}
                    >
                        Есть аккаунт? Войти
                    </button>
                </div>
            </form>
        </Popup>
    )
}
