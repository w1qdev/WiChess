import { motion } from 'framer-motion'
import ChessBoards from '../../assets/chessBoard.png'

export const Hero = () => {
    return (
        <div className="max-w-300 h-full flex justify-between items-center">
            <div className="flex justify-between items-center gap-15">
                <div className="w-1/2">
                    <motion.h1
                        className="text-[70px] font-bold leading-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Master Your Game.
                    </motion.h1>
                    <motion.h1
                        className="text-[70px] font-bold text-[#FBCD4A] leading-20 mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Play with Style.
                    </motion.h1>

                    <motion.p
                        className="text-[#A3A3A3] text-2xl mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        Expirience the classic strategy game reimagined with a
                        modern, distraction-free interface designed for focus
                        elegance, and mastery
                    </motion.p>

                    <motion.div
                        className="flex justify-start items-center gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <motion.button
                            className="flex justify-between items-center gap-1.5 cursor-pointer px-10 py-2 bg-[#FBBF24] text-[#000000] text-md font-mediu, rounded-sm hover:bg-[#ffd56b] transition-colors duration-300"
                            whileHover={{ y: -5, scale: 1.05 }}
                            whileTap={{ y: 5, scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 100 }}
                        >
                            Играть в шахматы
                        </motion.button>

                        <motion.button
                            className="flex justify-between items-center gap-1.5 cursor-pointer px-10 py-2 bg-[#181818] text-[#d8d8d8] text-md font-mediu, rounded-sm border-2 border-transparent hover:border-[#ffd56b] hover:text-[#ffd56b] transition-colors duration-300"
                            whileHover={{ y: -5, scale: 1.05 }}
                            whileTap={{ y: 5, scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 100 }}
                        >
                            Тренировочная зона
                        </motion.button>
                    </motion.div>
                </div>
                <div className="w-1/2">
                    <motion.img
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="w-full h-full rounded-lg"
                        src={ChessBoards}
                    />
                </div>
            </div>
        </div>
    )
}
