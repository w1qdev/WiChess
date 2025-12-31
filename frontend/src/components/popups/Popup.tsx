import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

type PopupPropsType = {
    trigger?: boolean
    triggerHandler?: (e: React.MouseEvent<HTMLElement>) => void
    title?: string
    children?: ReactNode
}

export const Popup = ({ title, triggerHandler, children }: PopupPropsType) => {
    const handleContentClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            exit={{ opacity: 0 }}
            className="w-full h-full absolute left-0 top-0 flex justify-center items-center bg-black/30 backdrop-blur-lg"
            onClick={triggerHandler}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-100 h-auto bg-[#222222] rounded-md text-white shadow-[0px_4px_6px_0px_#1c1c1c]"
                onClick={handleContentClick}
            >
                <div className="w-full h-12 flex justify-between items-center mb-5 px-4">
                    <h4 className="font-bold">{title}</h4>
                    <button onClick={triggerHandler}>
                        <X
                            className="text-[#7a7a7aee] hover:text-white cursor-pointer"
                            width={30}
                            height={30}
                        />
                    </button>
                </div>

                <div className="h-auto p-4">{children}</div>
            </motion.div>
        </motion.div>
    )
}
