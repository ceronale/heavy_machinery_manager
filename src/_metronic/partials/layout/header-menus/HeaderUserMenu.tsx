/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'


import * as auth from '../../../../app/modules/auth/redux/AuthRedux'
import {useDispatch} from 'react-redux'
import {toAbsoluteUrl} from '../../../helpers'

const HeaderUserMenu: FC = () => {

  const dispatch = useDispatch()
  const logout = () => {
    dispatch(auth.actions.logout())
  }

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/150-26.jpg')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Administrador</span>
              
              
            </div>
            <a href='' className='fw-bold text-muted text-hover-primary fs-7'>
              
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

     
      

      <div
        className='menu-item px-5'
        data-kt-menu-trigger='hover'
        data-kt-menu-placement='left-start'
        data-kt-menu-flip='bottom'
      >
        

        <div className='menu-sub menu-sub-dropdown w-175px py-4'>
          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
              
            </a>
          </div>

          

          

          <div className='menu-item px-3'>
            <a href='#' className='menu-link d-flex flex-stack px-5'>
             
              <i
                className='fas fa-exclamation-circle ms-2 fs-7'
                data-bs-toggle='tooltip'
                title='View your statements'
              ></i>
            </a>
          </div>

          <div className='separator my-2'></div>

          <div className='menu-item px-3'>
            <div className='menu-content px-3'>
              <label className='form-check form-switch form-check-custom form-check-solid'>
                <input
                  className='form-check-input w-30px h-20px'
                  type='checkbox'
                  value='1'
                  defaultChecked={true}
                  name='notifications'
                />
                
              </label>
            </div>
          </div>
        </div>
      </div>

      

      

     

      

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Cerrar Sesión
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
