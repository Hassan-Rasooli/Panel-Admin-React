import RenderRoutes from 'routes'
import List from 'components/manualOrder/province/List'

const ROUTES = [
    {
        key: 'deposit',
        path: '/*',
        private: true,
        component: <List />,
    }
]

function Router() {
    return (
        <RenderRoutes routes={ROUTES} />
    )
}

export default Router
