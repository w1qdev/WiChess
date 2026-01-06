import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'

const GAME_MODES = [
    { time: '1+0', label: 'Hyper Bullet' },
    { time: '1+1', label: 'Bullet' },
    { time: '3+0', label: 'Blitz' },
    { time: '3+1', label: 'Blitz Increment' },
    { time: '5+0', label: 'Rapid' },
    { time: '10+0', label: 'Classical' },
]

const PlaygroundPage = () => {
    const [selectedMode, setSelectedMode] = useState(GAME_MODES[2])
    const [game, setGame] = useState(() => new Chess())
    const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white')
    const [isPlaying, setIsPlaying] = useState(false)

    const fen = useMemo(() => game.fen(), [game])

    const resetGame = (color: 'white' | 'black') => {
        setGame(new Chess())
        setPlayerColor(color)
        setIsPlaying(true)
    }

    const makeRandomMove = (currentGame: Chess) => {
        const moves = currentGame.moves({ verbose: true })
        if (moves.length === 0) return

        const randomMove = moves[Math.floor(Math.random() * moves.length)]
        currentGame.move({
            from: randomMove.from,
            to: randomMove.to,
            promotion: 'q',
        })
    }

    const maybeBotMove = (nextGame: Chess) => {
        if (nextGame.isGameOver()) {
            const isDraw = nextGame.isDraw()
            toast.success(isDraw ? 'Ничья' : 'Игра окончена')
            setIsPlaying(false)
            return
        }

        const turn = nextGame.turn() // 'w' | 'b'
        const botTurn =
            (playerColor === 'white' && turn === 'b') ||
            (playerColor === 'black' && turn === 'w')

        if (!botTurn) return

        const copy = new Chess(nextGame.fen())
        window.setTimeout(() => {
            makeRandomMove(copy)
            setGame(copy)
        }, 250)
    }

    const onDrop = (sourceSquare: string, targetSquare: string) => {
        if (!isPlaying) return false

        const turn = game.turn()
        const playerTurn =
            (playerColor === 'white' && turn === 'w') ||
            (playerColor === 'black' && turn === 'b')
        if (!playerTurn) return false

        const copy = new Chess(game.fen())
        const move = copy.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q',
        })
        if (move === null) return false

        setGame(copy)
        maybeBotMove(copy)
        return true
    }

    const handleStartRandom = () => {
        const randomColor: 'white' | 'black' =
            Math.random() > 0.5 ? 'white' : 'black'
        resetGame(randomColor)
        toast.success(`Режим: ${selectedMode.time} (${selectedMode.label})`)

        if (randomColor === 'black') {
            const copy = new Chess()
            window.setTimeout(() => {
                makeRandomMove(copy)
                setGame(copy)
            }, 250)
        }
    }

    return (
        <div className="w-full max-w-300 mx-auto text-white pt-22 px-4">
            <div className="flex justify-between items-start gap-8">
                <div className="w-[420px]">
                    <h2 className="text-3xl font-bold mb-4">Играть</h2>

                    <div className="bg-[#181818] rounded-xl border border-[#2a2a2a] p-4">
                        <div className="text-sm text-[#9e9e9e] mb-3">Режим</div>
                        <div className="grid grid-cols-2 gap-2">
                            {GAME_MODES.map((mode) => (
                                <button
                                    key={mode.time}
                                    type="button"
                                    className={`px-3 py-2 rounded-md border transition-colors duration-200 text-left ${
                                        selectedMode.time === mode.time
                                            ? 'bg-[#202020] border-[#FBBF24]'
                                            : 'bg-[#131313] border-[#2a2a2a] hover:border-[#FBBF24]'
                                    }`}
                                    onClick={() => setSelectedMode(mode)}
                                >
                                    <div className="font-semibold text-[#FBCD4A]">
                                        {mode.time}
                                    </div>
                                    <div className="text-xs text-[#9e9e9e]">
                                        {mode.label}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 flex gap-2">
                            <button
                                type="button"
                                className="flex-1 h-10 bg-[#FBBF24] text-[#000000] font-medium rounded-md hover:bg-[#ffd56b] transition-colors duration-200"
                                onClick={handleStartRandom}
                            >
                                Играть
                            </button>

                            <button
                                type="button"
                                className="h-10 px-4 bg-[#131313] border border-[#2a2a2a] rounded-md hover:border-[#FBBF24] transition-colors duration-200"
                                onClick={() => {
                                    setGame(new Chess())
                                    setIsPlaying(false)
                                }}
                            >
                                Сброс
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex justify-end">
                    <div className="w-[560px] bg-[#181818] rounded-xl border border-[#2a2a2a] p-4">
                        <div className="flex justify-between items-center mb-3">
                            <div className="text-sm text-[#9e9e9e]">
                                {isPlaying
                                    ? `Ты играешь за ${
                                          playerColor === 'white'
                                              ? 'белых'
                                              : 'чёрных'
                                      }`
                                    : 'Выбери режим и начни игру'}
                            </div>
                            <div className="text-sm text-[#9e9e9e]">
                                {selectedMode.time}
                            </div>
                        </div>

                        <Chessboard
                            position={fen}
                            onPieceDrop={onDrop}
                            boardWidth={520}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaygroundPage
