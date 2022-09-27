import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Maquinaria} from './components/Maquinaria'


const nuevoBreadCrumbs: Array<PageLink> = [
  {
    title: '',
    path: '/crafted/nuevo/charts',
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

const nuevoPage: React.FC = () => {
  return (
    <Switch>
      <Route path='/crafted/nuevo/Maquinaria'>
        <PageTitle breadcrumbs={nuevoBreadCrumbs}></PageTitle>
        <Maquinaria />
      </Route>
    </Switch>
  )
}

export default nuevoPage
