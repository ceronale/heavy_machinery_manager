/* eslint-disable react/jsx-no-target-blank */

import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  return (
    <>
      <AsideMenuItemWithSub
        to='/crafted/nuevo'
        title='Nuevo Equipo'
        icon='/media/icons/duotune/general/gen035.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/Nuevo/maquinaria' title='Crear Equipo' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/crafted/administracion'
        title='Gestion de Equipo'
        icon='/media/icons/duotune/coding/cod001.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/administracion/salida' title='Arrendar Equipo' hasBullet={true} />
        <AsideMenuItem to='/crafted/administracion/devolucion' title='Devolucion de Equipo' hasBullet={true} />
        <AsideMenuItem to='/crafted/administracion/retorno' title='Retorno Equipo' hasBullet={true} />
        <AsideMenuItem to='/crafted/administracion/mantenimiento' title='Mantencion' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/crafted/pagos'
        title='Gestion de Pagos'
        icon='/media/icons/duotune/finance/fin010.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/pagos/cobros' title='Cobros' hasBullet={true} />
        
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/crafted/historial'
        title='Historial de Mantenimiento'
        icon='/media/icons/duotune/general/gen005.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/historial/historial' title='Historial Mantencion' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/crafted/configuracion'
        title='Administracion'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/coding/cod009.svg'
      >
        <AsideMenuItem to='/crafted/configuracion/materiales' title='Materiales' hasBullet={true} />
        <AsideMenuItem to='/crafted/configuracion/clientes' title='Clientes' hasBullet={true} />
        <AsideMenuItem to='/crafted/configuracion/obras' title='Obras' hasBullet={true} />
        <AsideMenuItem to='/crafted/configuracion/proveedores' title='Proveedores' hasBullet={true} />
        <AsideMenuItem to='/crafted/configuracion/marcas' title='Marcas' hasBullet={true} />
        <AsideMenuItem to='/crafted/configuracion/modelo' title='Modelos' hasBullet={true} />
        <AsideMenuItem to='/crafted/configuracion/categorias' title='Categorias' hasBullet={true} />
        <AsideMenuItem to='/crafted/configuracion/usuarios' title='Usuarios' hasBullet={true} />
        <AsideMenuItem to='/crafted/configuracion/repuestos' title='Repuestos' hasBullet={true} />
      </AsideMenuItemWithSub>
     
       
    </>
  )
}
