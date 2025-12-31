import { ChessQueen } from 'lucide-react'

type HeaderPropsType = {
    handleOpenSignUpPopup: (e: React.MouseEvent<HTMLElement>) => void
    handleOpenLoginPopup: (e: React.MouseEvent<HTMLElement>) => void
}

export const Header = ({
    handleOpenSignUpPopup,
    handleOpenLoginPopup,
}: HeaderPropsType) => {
    return (
        <div className="flex justify-center items-center w-full h-15 bg-[#111111] text-white fixed top-0 left-0">
            <div className="w-full max-w-300 flex justify-between items-center">
                <div className="cursor-pointer hover:text-[#FBBF24] transition-colors duration-300 flex justify-between gap-2 items-center">
                    <ChessQueen />
                    <div className="font-bold">WiChess</div>
                </div>

                <div className="flex justify-center gap-2 items-center transition-colors duration-300">
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
                </div>
            </div>
        </div>
    )
}
