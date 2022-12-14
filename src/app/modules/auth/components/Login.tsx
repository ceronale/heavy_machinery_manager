/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'

import {useFormik} from 'formik'
import * as auth from '../redux/AuthRedux'
import {login} from '../redux/AuthCRUD'
import bcrypt from 'bcryptjs'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setTimeout(() => {

        login(values.email, bcrypt.hashSync(values.password, '$2a$10$CwTycUXWue0Thq9StjUM0u'))
          .then((response) => {
            if(response.data){
              setLoading(false)
              dispatch(auth.actions.login(response.data))
            }else{
              setLoading(false)
              console.log(response.data)
              setSubmitting(false)
              setStatus('The login detail is incorrect')
            }
   
          })
          .catch(() => {

          })
      }, 1000)
    },
  })

  return (
    <form
    className='form w-100'
    onSubmit={formik.handleSubmit}
    noValidate
    id='kt_login_signin_form'
  >
    {/* begin::Heading */}
    <div className='text-center mb-10'>
      <h1 className='text-dark mb-3'>Iniciar Sesion</h1>
      
    </div>
    {/* begin::Heading */}

   

    {/* begin::Form group */}
    <div className='fv-row mb-10'>
      <label className='form-label fs-6 fw-bolder text-dark'>Usuario</label>
      <input
        placeholder='Email'
        {...formik.getFieldProps('email')}
        className={clsx(
          'form-control form-control-lg form-control-solid',
          {'is-invalid': formik.touched.email && formik.errors.email},
          {
            'is-valid': formik.touched.email && !formik.errors.email,
          }
        )}
        type='email'
        name='email'
        autoComplete='off'
      />
      {formik.touched.email && formik.errors.email && (
        <div className='fv-plugins-message-container'>
          <span role='alert'>{formik.errors.email}</span>
        </div>
      )}
    </div>
    {/* end::Form group */}

    {/* begin::Form group */}
    <div className='fv-row mb-10'>
      <div className='d-flex justify-content-between mt-n5'>
        <div className='d-flex flex-stack mb-2'>
          {/* begin::Label */}
          <label className='form-label fw-bolder text-dark fs-6 mb-0'>Contrase??a</label>
          {/* end::Label */}
          {/* begin::Link */}
      
          {/* end::Link */}
        </div>
      </div>
      <input
        type='password'
        autoComplete='off'
        {...formik.getFieldProps('password')}
        className={clsx(
          'form-control form-control-lg form-control-solid',
          {
            'is-invalid': formik.touched.password && formik.errors.password,
          },
          {
            'is-valid': formik.touched.password && !formik.errors.password,
          }
        )}
      />
      {formik.touched.password && formik.errors.password && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik.errors.password}</span>
          </div>
        </div>
      )}
    </div>
    {/* end::Form group */}

    {/* begin::Action */}
    <div className='text-center'>
      <button
        type='submit'
        id='kt_sign_in_submit'
        className='btn btn-lg btn-primary w-100 mb-5'
        disabled={formik.isSubmitting || !formik.isValid}
      >
        {!loading && <span className='indicator-label'>Iniciar</span>}
        {loading && (
          <span className='indicator-progress' style={{display: 'block'}}>
            Cargando...
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        )}
      </button>

      {/* begin::Separator */}
     
      {/* end::Separator */}

      {/* begin::Google link */}
      
      {/* end::Google link */}

      {/* begin::Google link */}
  
      {/* end::Google link */}

      {/* begin::Google link */}
   
      {/* end::Google link */}
    </div>
    {/* end::Action */}
  </form>
  )
}
