/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import { DoughnutCharts } from '../../modules/charts/DoughnutCharts'
import { PolarCharts } from '../../modules/charts/PolarCharts'


const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}
    
    <div className='row gy-5 g-xl-12 d-flex justify-content-around'>
        {/* <ChartsWidget1 className={''}/> */}
        <div className='col-md-5 col-xxl-5'>
          <div className="card">
            <div className="card-header d-flex justify-content-center align-items-center">
              <h3 className='text-primary text-center'>Diagrama de Arriendo por Cliente</h3>
            </div>
            <div className="card-body">
              <DoughnutCharts />
              
            </div>
          </div>
          
        </div>
        <div className='col-md-5 col-xxl-5'>
          <div className="card">
            <div className="card-header d-flex justify-content-center align-items-center">
              <h3 className='text-primary text-center'>Diagrama de Inventario</h3>
            </div>
            <div className="card-body">
             <PolarCharts />
                           
            </div>
          </div>
        </div>
    </div>
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
