import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { Cobros } from './components/Cobros'
import { Pagos } from './components/Pagos'

const pagosBreadCrumbs: Array<PageLink> = [
  {
    title: '',
    path: '/crafted/pagos/charts',
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

const PagosPage: React.FC = () => {
  return (
    <Switch>
      <Route path='/crafted/pagos/cobros'>
        <PageTitle breadcrumbs={pagosBreadCrumbs}></PageTitle>
        <Cobros />
      </Route>
    </Switch>
  )
}

export default PagosPage
