import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

/****Layouts*****/
const FullLayout = lazy(() => import('../layouts/FullLayout.js'))
const FullLayoutcopy = lazy(() => import('../layouts/FullLayout copy.js'))

/***** Pages ****/

const Starter = lazy(() => import('../views/Starter.js'))
const About = lazy(() => import('../views/About.js'))
const Alerts = lazy(() => import('../views/ui/Alerts'))
const Badges = lazy(() => import('../views/ui/Badges'))
const Buttons = lazy(() => import('../views/ui/Buttons'))
const Cards = lazy(() => import('../views/ui/Cards'))
const Grid = lazy(() => import('../views/ui/Grid'))
const Tables = lazy(() => import('../views/ui/Tables'))
const Forms = lazy(() => import('../views/ui/Forms'))
const Breadcrumbs = lazy(() => import('../views/ui/Breadcrumbs'))
const Employelist = lazy(() => import('../views/employelist.js'))
const CustomerList = lazy(() => import('../views/CustomerList.js'))
const Actions = lazy(() => import('../views/Actions.js'))
const Actionsverseme = lazy(() => import('../views/Actionsverseme.js'))
const Actionsvirement = lazy(() => import('../views/actionsvirement.js'))
const TransactionPage = lazy(() => import('../views/trans.js'))
const LoginPage = lazy(() => import('../views/login.js'))
const ModifierClient = lazy(() => import('../views/usermod.js'))
const DoRec = lazy(() => import('../views/dorec.js'))
const Rec = lazy(() => import('../views/showrec.js'))
const ClientPage = lazy(() => import('../views/Clientpage.js'))
const ClientBalance = lazy(() => import('../views/balance.js'))

/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to='/starter' /> },
      { path: '/starter', exact: true, element: <Starter /> },
      { path: '/about', exact: true, element: <About /> },
      { path: '/alerts', exact: true, element: <Alerts /> },
      { path: '/badges', exact: true, element: <Badges /> },
      { path: '/buttons', exact: true, element: <Buttons /> },
      { path: '/cards', exact: true, element: <Cards /> },
      { path: '/grid', exact: true, element: <Grid /> },
      { path: '/table', exact: true, element: <Tables /> },
      { path: '/forms', exact: true, element: <Forms /> },
      { path: '/breadcrumbs', exact: true, element: <Breadcrumbs /> },
      { path: '/employelist', exact: true, element: <Employelist /> },
      { path: '/CustomerList', exact: true, element: <CustomerList /> },
      { path: '/actions', exact: true, element: <Actions /> },
      { path: '/actionsverseme', exact: true, element: <Actionsverseme /> },
      { path: '/actionsvirement', exact: true, element: <Actionsvirement /> },
      { path: '/transaction', exact: true, element: <TransactionPage /> },
      { path: '/login', exact: true, element: <LoginPage /> },
      { path: '/showrec', exact: true, element: <Rec /> },

    ]
  },
  {
    path: '/',
    element: <FullLayoutcopy />,
    children: [
      { path: '/modifier', exact: true, element: <ModifierClient /> },
      { path: '/dorec', exact: true, element: <DoRec /> },
      { path: '/client', exact: true, element: <ClientPage /> },
      { path: '/balance', exact: true, element: <ClientBalance /> }
    ]
  }
]

export default ThemeRoutes;
