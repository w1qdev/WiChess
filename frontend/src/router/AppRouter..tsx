import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { Layout } from '../components/layout/Layout'

const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'))
const PlaygroundPage = lazy(() =>
    import('../pages/Playground/PlaygroundPage')
)

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <WelcomePage />
                    </Suspense>
                ),
            },
            {
                path: 'playground',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <PlaygroundPage />
                    </Suspense>
                ),
            },
        ],
    },
])
