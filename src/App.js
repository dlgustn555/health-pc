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
            <li>
                테스트!!!
            </li>
        </ul>
    )
}

const Month = lazy(() => import('pages/Month'))

function App() {
    return (
        <Suspense fallback={<></>}>
            <Switch>
                <Route exact path={ROUTES.HOME} component={Index} />
                <Route exact path={ROUTES.MONTH} component={Month} />
            </Switch>
        </Suspense>
    )
}

export default App
