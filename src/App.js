import {lazy, Suspense} from 'react'
import {Switch, Route, Link} from 'react-router-dom'

import ROUTES from 'constants/routes'
import {RootProvider} from 'contexts'

const Index = () => {
    return (
        <ul>
            <li>
                <Link to={ROUTES.MONTH}>Month</Link>
            </li>
            <li>
                테스트!!!22SS331111111 
            </li>
        </ul>
    )
}

const Month = lazy(() => import('pages/Month'))
const ProgramDetail = lazy(() => import('pages/ProgramDetail'))

function App() {
    return (
        <Suspense fallback={<></>}>
            <RootProvider>
                <Switch>
                    <Route exact path={ROUTES.HOME} component={Index} />
                    <Route exact path={ROUTES.MONTH} component={Month} />
                    <Route path={ROUTES.PROGRAM_DETAIL} component={ProgramDetail} />
                </Switch>
            </RootProvider>
        </Suspense>
    )
}

export default App
