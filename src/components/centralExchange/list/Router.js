import RenderRoutes from 'routes';
import List from 'components/centralExchange/list/List'

const ROUTES = [
    {
        key: 'list',
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

export default Router;
