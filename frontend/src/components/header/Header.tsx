import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { ChessQueen, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../../store/store'

type HeaderPropsType = {
    handleOpenSignUpPopup: (e: React.MouseEvent<HTMLElement>) => void
    handleOpenLoginPopup: (e: React.MouseEvent<HTMLElement>) => void
}

const HeaderLoginSignUpButtons = ({
    handleOpenLoginPopup,
    handleOpenSignUpPopup,
}: HeaderPropsType) => {
    return (
        <>
            <button
                className="cursor-pointer px-4 py-1.5 font-medium rounded-md hover:bg-[#303030] transition-colors duration-300"
                onClick={handleOpenLoginPopup}
            >
                Войти
            </button>
            <button
                className="cursor-pointer px-4 py-1.5 bg-[#FBBF24] text-[#343434] font-medium rounded-md hover:bg-[#ffd56b] transition-colors duration-300"
                onClick={handleOpenSignUpPopup}
            >
                Играть
            </button>
        </>
    )
}

const DropDownMenuItems: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a rel="noopener noreferrer" href="/game">
                Играть
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a rel="noopener noreferrer" href="/profile">
                Профиль
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a rel="noopener noreferrer" href="/settings">
                Настройки
            </a>
        ),
    },
]

const HeaderUserProfileButton = () => {
    return (
        <Dropdown
            menu={{ items: DropDownMenuItems }}
            trigger={['click']}
            placement="bottomRight"
            className="bg-[#181818]"
        >
            <div className="flex justify-center items-center gap-2 cursor-pointer hover:bg-[#202020] py-1 px-2 rounded-md transition-colors duration-300">
                <div className="mr-3">Даниил</div>
                <div className="w-9 h-9 rounded-full bg-[#5f5f5f]"></div>
                <ChevronDown className="w-6 h-6 text-[#5f5f5f]" />
            </div>
        </Dropdown>
    )
}

export const Header = ({
    handleOpenSignUpPopup,
    handleOpenLoginPopup,
}: HeaderPropsType) => {
    const isUserAuthenticated = useAuthStore((state) => state.isAuthenticated)

    return (
        <div className="flex justify-center items-center w-full h-15 bg-[#111111] text-white fixed top-0 left-0">
            <div className="w-full max-w-300 flex justify-between items-center">
                <div className="cursor-pointer hover:text-[#FBBF24] transition-colors duration-300 flex justify-between gap-2 items-center">
                    <ChessQueen />
                    <div className="font-bold">WiChess</div>
                </div>

                <div className="flex justify-center gap-2 items-center transition-colors duration-300">
                    {isUserAuthenticated === false && (
                        <HeaderLoginSignUpButtons
                            handleOpenSignUpPopup={handleOpenSignUpPopup}
                            handleOpenLoginPopup={handleOpenLoginPopup}
                        />
                    )}

                    {isUserAuthenticated === true && (
                        <HeaderUserProfileButton />
                    )}
                </div>
            </div>
        </div>
    )
}
