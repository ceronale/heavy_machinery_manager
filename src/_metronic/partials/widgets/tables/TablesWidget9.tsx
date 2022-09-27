/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {KTSVG,} from '../../../helpers'

type Props = {
  colNames: string[]
  className: string
  data: never[]
}

const TablesWidget9: React.FC<Props> = ({className,data,colNames}) => {
  console.log(colNames)
  const [modalInsertar, setModalInsertar]= useState(false);
  
  

  
  return (
    <div className={`card mb-5 mb-xl-8`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Members Statistics</span>
          <span className='text-muted mt-1 fw-bold fs-7'>Over 500 members</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <a
            href='#'
            className='btn btn-sm btn-light-primary'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_add_form1'
          >
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            New Member
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            
            
            <thead>
              <tr className='fw-bolder text-muted'>
                {colNames.map((headerItem, index) => ( 
                  <th key={index} className='min-w-150px'>{headerItem}</th>
                ))}
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            
            
            
            
            
            
            <tbody>
              {data.map(prueba=>(
                <tr key=  {prueba['id']} >
                  <td>
                    <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                    {prueba['id']}
                    </a>
                    <span className='text-muted fw-bold text-muted d-block fs-7'>
                      Web, UI/UX Design
                    </span>
                  </td>

                  <td>
                    <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                      {prueba['nombre']}
                    </a>
                    <span className='text-muted fw-bold text-muted d-block fs-7'>
                      Web, UI/UX Design
                    </span>
                  </td>
                  <td className='text-end'>
                    <div className='d-flex flex-column w-100 me-2'>
                      <div className='d-flex flex-stack mb-2'>
                        <span className='text-muted me-2 fs-7 fw-bold'>50%</span>
                      </div>
                      <div className='progress h-6px w-100'>
                        <div
                          className='progress-bar bg-primary'
                          role='progressbar'
                          style={{width: '50%'}}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen019.svg'
                          className='svg-icon-3'
                        />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen027.svg'
                          className='svg-icon-3'
                        />
                      </a>
                    </div>
                  </td>
                </tr>

              ))}

              

            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
      
      <div className='modal fade' id='kt_modal_add_form1' aria-hidden='true'>
      <div className='modal-dialog mw-650px'>
        <div className='modal-content'>
          <div className='modal-header pb-0 border-0 justify-content-end'>
            <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>

          <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-13'>
              <h1 className='mb-3'>Agregar dato</h1>

              <div className='text-muted fw-bold fs-5'>
                Ingrese el campo que desea agregar
              </div>
            </div>

            <div className="mb-10">
                <label htmlFor="exampleFormControlInput1" className="required form-label">ID</label>
                <input type="email" className="form-control form-control-solid" placeholder="Example input"/>
            </div>
            <div className="mb-10">
                <label htmlFor="exampleFormControlInput1" className="required form-label">Nombre</label>
                <input type="email" className="form-control form-control-solid" placeholder="Example input"/>
            </div>
            <a href="#" className="btn btn-primary">Primary</a>
          </div>
        </div>
      </div>
    </div>
    </div>
    



  )
}

export {TablesWidget9}
