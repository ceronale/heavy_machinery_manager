import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'

import { Mantenimiento } from './components/Mantenimiento'
import { Salida } from './components/Salida'
import { Retorno } from './components/Retorno'
import { Devolucion } from './components/Devolucion'

const administracionBreadCrumbs: Array<PageLink> = [
  {
    title: '',
    path: '/crafted/administracion/charts',
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

const AdministracionPage: React.FC = () => {
  return (
    <Switch>
      <Route path='/crafted/administracion/mantenimiento'>
        <PageTitle breadcrumbs={administracionBreadCrumbs}></PageTitle>
        <Mantenimiento />
      </Route>
      <Route path='/crafted/administracion/salida'>
        <PageTitle breadcrumbs={administracionBreadCrumbs}></PageTitle>
        <Salida />
      </Route>
      <Route path='/crafted/administracion/devolucion'>
        <PageTitle breadcrumbs={administracionBreadCrumbs}></PageTitle>
        <Devolucion />
      </Route>
      <Route path='/crafted/administracion/retorno'>
        <PageTitle breadcrumbs={administracionBreadCrumbs}></PageTitle>
        <Retorno />
      </Route>
    </Switch>
  )
}

export default AdministracionPage
