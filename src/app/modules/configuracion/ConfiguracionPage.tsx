import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { Clientes } from './components/Clientes'
import { Obras } from './components/Obras'
import {Maquinaria} from './components/Maquinaria'
import { Marcas } from './components/Marcas'
import { Modelo } from './components/Modelo'
import { Materiales } from './components/Materiales'
import { Proveedores } from './components/Proveedores'
import { Usuarios } from './components/Usuarios'
import { Categorias } from './components/Categorias'
import { Repuestos } from './components/Repuestos'
import { Historial } from '../historial/components/Historial'
import { Cobros } from '../pagos/components/Cobros'
import { Pagos } from '../pagos/components/Pagos'

const configuracionBreadCrumbs: Array<PageLink> = [
  {
    title: '',
    path: '/crafted/configuracion/charts',
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

const ConfiguracionPage: React.FC = () => {
  return (
    <Switch>
      <Route path='/crafted/configuracion/maquinaria'>
        <PageTitle breadcrumbs={configuracionBreadCrumbs}></PageTitle>
        <Maquinaria />
      </Route>
      <Route path='/crafted/configuracion/materiales'>
        <PageTitle breadcrumbs={configuracionBreadCrumbs}></PageTitle>
        <Materiales />
      </Route>
      <Route path='/crafted/configuracion/clientes'>
        <PageTitle breadcrumbs={configuracionBreadCrumbs}></PageTitle>
        <Clientes />
      </Route>
      <Route path='/crafted/configuracion/obras'>
        <PageTitle breadcrumbs={configuracionBreadCrumbs}></PageTitle>
        <Obras />
      </Route>
      <Route path='/crafted/configuracion/proveedores'>
        <PageTitle breadcrumbs={configuracionBreadCrumbs}></PageTitle>
        <Proveedores />
      </Route>
      <Route path='/crafted/configuracion/marcas'>
        <PageTitle breadcrumbs={configuracionBreadCrumbs}></PageTitle>
        <Marcas />
      </Route>
      <Route path='/crafted/configuracion/modelo'>
        <PageTitle breadcrumbs={configuracionBreadCrumbs}></PageTitle>
        <Modelo />
      </Route>
      <Route path='/crafted/configuracion/categorias'>
        <PageTitle breadcrumbs={configuracionBreadCrumbs}></PageTitle>
        <Categorias />
      </Route>
      <Route path='/crafted/configuracion/usuarios'>
        <PageTitle breadcrumbs={configuracionBreadCrumbs}></PageTitle>
        <Usuarios />
      </Route>
      <Route path='/crafted/configuracion/repuestos'>
        <PageTitle breadcrumbs={configuracionBreadCrumbs}></PageTitle>
        <Repuestos />
      </Route>
      <Route path='/crafted/configuracion/historial'>
        <PageTitle breadcrumbs={configuracionBreadCrumbs}></PageTitle>
        <Historial />
        <Route path='/crafted/configuracion/pagos'>
        <PageTitle breadcrumbs={configuracionBreadCrumbs}></PageTitle>
        <Pagos />
      </Route>
      <Route path='/crafted/configuracion/cobros'>
        <PageTitle breadcrumbs={configuracionBreadCrumbs}></PageTitle>
        <Cobros />
      </Route>
      </Route>
    </Switch>
  )
}

export default ConfiguracionPage
