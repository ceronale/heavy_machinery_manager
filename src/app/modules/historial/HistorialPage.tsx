import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { Historial } from './components/Historial'


const historialBreadCrumbs: Array<PageLink> = [
  {
    title: '',
    path: '/crafted/historial/charts',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const HistorialPage: React.FC = () => {
  return (
    <Switch>
      <Route path='/crafted/historial/historial'>
        <PageTitle breadcrumbs={historialBreadCrumbs}></PageTitle>
        <Historial />
      </Route>
    </Switch>
  )
}

export default HistorialPage
