/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG, } from '../../../helpers'

const AddForm: FC = () => {


  return (
    <div className='modal fade' id='kt_modal_add_form' aria-hidden='true'>
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
  )
}

export {AddForm}
