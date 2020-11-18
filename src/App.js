import {Switch, Route, Link} from 'react-router-dom'

import ROUTES from 'constants/routes'

const Index = () => {
    return (
        <ul>
            <li>
                <Link to={ROUTES.PLAN}>Plan 작성</Link>
            </li>
            <li>
                <Link to={ROUTES.PRACTICE}>Practice 작성</Link>
            </li>
        </ul>
    )
}

function App() {
    return (
        <Switch>
            <Route exact path={ROUTES.HOME} component={Index} />
        </Switch>
    )
}

export default App
