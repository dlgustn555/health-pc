import {lazy, Suspense} from 'react'
import {Switch, Route, Link} from 'react-router-dom'

import ROUTES from 'constants/routes'

const Index = () => {
    return (
        <ul>
            <li><Link to={ROUTES.MONTH}>Month</Link></li>
            <li>
                <Link to={ROUTES.PLAN}>Plan 작성</Link>
            </li>
            <li>
                <Link to={ROUTES.PRACTICE}>Practice 작성</Link>
            </li>
        </ul>
    )
}

const Month = lazy(() => import('pages/Month'))
const Plan = lazy(() => import('pages/Plan'))

function App() {
    return (
        <Suspense fallback={<></>}>
            <Switch>
                <Route exact path={ROUTES.HOME} component={Index} />
                <Route exact path={ROUTES.MONTH} component={Month} />
                <Route exact path={ROUTES.PLAN} component={Plan} />
            </Switch>
        </Suspense>
    )
}

export default App
