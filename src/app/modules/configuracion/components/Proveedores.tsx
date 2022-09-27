import {FC, useState, useEffect, forwardRef} from 'react';
import {KTSVG} from '../../../../_metronic/helpers';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter} from 'reactstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import MaterialTable, { Icons } from '@material-table/core';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { ExportCsv,ExportPdf } from '@material-table/exporters';
import {toAbsoluteUrl} from '../../../../_metronic/helpers';

import Swal from 'sweetalert2';

const tableIcons: Icons = {
  Add: forwardRef<SVGSVGElement>((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef<SVGSVGElement>((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef<SVGSVGElement>((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef<SVGSVGElement>((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef<SVGSVGElement>((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef<SVGSVGElement>((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef<SVGSVGElement>((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef<SVGSVGElement>((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef<SVGSVGElement>((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef<SVGSVGElement>((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef<SVGSVGElement>((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef<SVGSVGElement>((props, ref) => <ViewColumn {...props} ref={ref} />)
};

/* Variables Iniciales de los modal insertar */
const  columns=[


  { title: "Razon Social", field: "razonSocial" },
  { title: "Direccion", field: "direccion" },
  { title: "Email", field: "email" },
  { title: "Telefono", field: "telefono" },
  { title: "Nombre Contacto", field: "nombreContacto" },
  { 
    title: 'Activo', 
    field: 'activo', 
    /**
     * Custom column rendering 
     */
    render: (rowData: { activo: string | undefined }) => {
      const styles = { width: 30, borderRadius: '50%' };
      return <img src={toAbsoluteUrl('/media/activo/' + rowData.activo+".png")} style={styles}/> 
    }
  },

  
]

const initialValues = {
  id: '',
  razonSocial: '',
  direccion: '',
  email: '',
  telefono: '',
  nombreContacto: '',
  activo: ''
 
  
}
const initialValues2 = {
  id2: '',
  razonSocial2: '',
  direccion2: '',
  email2: '',
  telefono2: '',
  nombreContacto2: '',
  activo2: ''
}

const swlSuccess = (text: any) => {
  Swal.fire(
    'Proveedor '+ text,
    'El proveedor ha sido '+ text +' exitosamente',
    'success'
  )
}
const swlErr = () => {
  Swal.fire(
    'Error',
    'Algo salió mal',
    'error'
  )
}

const formSchema = Yup.object().shape({
  
  razonSocial: Yup.string().required('Razon Social es requerido'),
  direccion: Yup.string(),
  email: Yup.string(),
  telefono: Yup.string(),
  nombreContacto: Yup.string(),
  activo: Yup.string().required('Activo es requerido'),
  
})
const formSchema2 = Yup.object().shape({
  
  razonSocial2: Yup.string().required('Razon Social es requerido'),
  direccion2: Yup.string(),
  email2: Yup.string(),
  telefono2: Yup.string(),
  nombreContacto2: Yup.string(),
  activo2: Yup.string().required('Activo es requerido'),
})

const Proveedores: FC = () => {
  
  const baseUrl = 'https://crisalex.cl/api/?metodo=proveedores'
  const [data, setData] = useState([])
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  

  const [selectedData, setselectedData] = useState({
    id: '',
    razonSocial: '',
    direccion: '',
    email: '',
    telefono: '',
    nombreContacto: '',
    activo: ''
  })
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values: { id: any; razonSocial: any; direccion: any; email: any; telefono: any; nombreContacto: any; activo: any }) => {
      setLoading(true)
      peticionPost(values)
      
    },
  })

  const [loading2, setLoading2] = useState(false)
  const formik2 = useFormik({
    initialValues: initialValues2,
    validationSchema: formSchema2,
    onSubmit: (values) => {
      setLoading2(true)
      peticionPut(values)
    },
  })

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar)
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar)
  }
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar)
  }
  const peticionPost = async (values: {id: any; razonSocial: any; direccion: any;  email: any; telefono: any; nombreContacto: any; activo: any}) => {
    var f = new FormData()
    f.append('id', values.id)
    f.append('razonSocial', values.razonSocial)
    f.append('direccion', values.direccion)
    f.append('email', values.email)
    f.append('telefono', values.telefono)
    f.append('nombreContacto', values.nombreContacto)
    f.append('activo', values.activo)
    f.append('METHOD', 'POST')

    await axios
      .post(baseUrl, f)
      .then((response) => {
        console.log(response)
        setData(data.concat(response.data))
        console.log(response.data)
        setTimeout(() => {
          abrirCerrarModalInsertar()
          peticionGet()
          setLoading(false)
          swlSuccess('creado')
          formik.resetForm()
        }, 1000)
      })
      .catch((error) => {
        console.log(error)
        swlErr()
      })
  }

  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const seleccionarFramework = (data: any, caso: string) => {
    setselectedData(data)
    initialValues2.id2 = data.id
    initialValues2.razonSocial2 = data.razonSocial
    initialValues2.direccion2 = data.direccion
    initialValues2.email2 = data.email
    initialValues2.telefono2 = data.telefono
    initialValues2.nombreContacto2 = data.nombreContacto
    initialValues2.activo2 = data.activo


    caso === 'Editar' ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const peticionPut = async (values: {id2: any; razonSocial2: any; direccion2: any; email2: any; telefono2: any; nombreContacto2: any; activo2: any}) => {
    var f = new FormData()
    f.append('id', values.id2)
    f.append('razonSocial', values.razonSocial2)
    f.append('direccion', values.direccion2)
    f.append('email', values.email2)
    f.append('telefono', values.telefono2)
    f.append('nombreContacto', values.nombreContacto2)
    f.append('activo', values.activo2)
    f.append('METHOD', 'PUT')
    await axios
      .post(baseUrl, f, {params: {id: selectedData.id}})
      .then((response) => {
        console.log(response.data)
        var dataNueva = data
        dataNueva.forEach((vairbale: any) => {
          if (vairbale.id === selectedData.id) {
            vairbale.razonSocial = values.razonSocial2
            vairbale.direccion = values.direccion2
            vairbale.email = values.email2
            vairbale.telefono = values.telefono2
            vairbale.nombreContacto = values.nombreContacto2
            vairbale.activo = values.activo2
           
          }
        })
        setData([]);
        setData(dataNueva)
        setTimeout(() => {
          abrirCerrarModalEditar()
          setLoading2(false)
          peticionGet()
          swlSuccess('actualizado')
          formik2.resetForm()
        }, 1000)
      })
      .catch((error) => {
        console.log(error)
        swlErr()
      })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: selectedData.id}})
    .then(response=>{
      if(isNaN(response.data)){
        return (Swal.fire('No se puede eliminar Proveedor','El Proveedor esta asociado a un Equipo','error'), setModalEliminar(false))
      }
      setData(data.filter((vairbale: any)=>vairbale.id!==selectedData.id));
      abrirCerrarModalEliminar();
      peticionGet()
      swlSuccess('eliminado')
    }).catch(error=>{
      console.log(error);
      swlErr()
    })
  }

  useEffect(() => {
    peticionGet()
  }, [])

  return (
    
    <div className={`card mb-5 mb-xl-8`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
       
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <a
           href="#"
            className='btn btn-sm btn-light-primary'
            onClick={() => abrirCerrarModalInsertar()}
          >
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            Agregar Proveedor
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          
         
            {/* begin::Table head */}
            
            {/* end::Table head */}
            {/* begin::Table body */}

        </div>
        {/* end::Table container */}
      </div>
      <MaterialTable
          icons={ tableIcons }
          columns={columns}
          data={data}
          title="Proveedores"
          actions ={[
            {
              icon: Edit,
              tooltip: "Editar",
              onClick:(event, rowData)=> seleccionarFramework(rowData, 'Editar')
          

            },
            {
              icon: DeleteOutline,
              tooltip: "Eliminar",
              onClick:(event, rowData)=> seleccionarFramework(rowData, "Eliminar")
          

            },
          ]}
          options={{
            actionsColumnIndex: -1,
            headerStyle: {
              fontSize: "12px",
            },filtering: true,

            exportMenu: [{
              label: 'Exportar PDF',
              exportFunc: (cols, x) => ExportPdf(cols, data, 'Proveedores')
            },{
              label: 'Exportar CSV',
              exportFunc: (cols, x) => ExportCsv(cols, data, 'Proveedores')
            }]
          }}
          localization={{
            header:{
              actions: 'Acciones',
              
              
            },
            toolbar: {
              searchPlaceholder: 'Buscar'
            }
           
          }}
        />
      {/* begin::Body */}

      <Modal isOpen={modalInsertar} scrollable>
        <div className='modal-header pb-0 border-0 justify-content-end'>
          <div
            className='btn btn-sm btn-icon btn-active-color-primary-center'
            onClick={() => abrirCerrarModalInsertar()}
          >
            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
          </div>
        </div>
        <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
          <div className='text-center mb-13'>
            <h1 className='mb-3'>Agregar datos</h1>

            <div className='text-muted fw-bold fs-5'>Ingrese el campo que desea agregar</div>
          </div>
          <form onSubmit={formik.handleSubmit}>
           
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Razon Social
              </label>
              <input
                {...formik.getFieldProps('razonSocial')}
                type='text'
                name='razonSocial'
                onChange={formik.handleChange}
                value={formik.values.razonSocial}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.razonSocial && formik.errors.razonSocial},
                  {
                    'is-valid': formik.touched.razonSocial && !formik.errors.razonSocial,
                  }
                )}
              />
            </div>
            
            
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Direccion
              </label>
              <input
                {...formik.getFieldProps('direccion')}
                type='text'
                name='direccion'
                onChange={formik.handleChange}
                value={formik.values.direccion}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.direccion && formik.errors.direccion},
                  {
                    'is-valid': formik.touched.direccion && !formik.errors.direccion,
                  }
                )}
              />
            </div>
            
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Email
              </label>
              <input
                {...formik.getFieldProps('email')}
                type='email'
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.email && formik.errors.email},
                  {
                    'is-valid': formik.touched.email && !formik.errors.email,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Telefono
              </label>
              <input
                {...formik.getFieldProps('telefono')}
                type='text'
                name='telefono'
                onChange={formik.handleChange}
                value={formik.values.telefono}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.telefono && formik.errors.telefono},
                  {
                    'is-valid': formik.touched.telefono && !formik.errors.telefono,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Nombre de Contacto
              </label>
              <input
                {...formik.getFieldProps('nombreContacto')}
                type='text'
                name='nombreContacto'
                onChange={formik.handleChange}
                value={formik.values.nombreContacto}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.nombreContacto && formik.errors.nombreContacto},
                  {
                    'is-valid': formik.touched.nombreContacto && !formik.errors.nombreContacto,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Activo
                </label>
                <select aria-label="Select example" 
                  {...formik.getFieldProps('activo')}
                    name='activo'
                    onChange={formik.handleChange}
                    value={formik.values.activo}
                    className={clsx(
                      'form-control form-control-lg form-control-solid',
                      {'is-invalid': formik.touched.activo && formik.errors.activo},
                      {
                        'is-valid': formik.touched.activo && !formik.errors.activo,
                      }
                    )}
                    >
                  <option>Seleccione el estado</option>
                  <option value="S">Si</option>
                  <option value="N">No</option>
                </select>
              </div>

            <button
              type='submit'
              id='kt_sign_in_submit'
              className='btn btn-lg btn-primary w-100 mb-5'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!loading && <span className='indicator-label'>Ingresar</span>}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Cargando...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </form>
        </div>
      </Modal>


      <Modal isOpen={modalEditar} scrollable>
        <div className='modal-header pb-0 border-0 justify-content-end'>
          <div
            className='btn btn-sm btn-icon btn-active-color-primary'
            onClick={() => abrirCerrarModalEditar()}
          >
            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
          </div>
        </div>
        <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
          <div className='text-center mb-13'>
            <h1 className='mb-3'>Editar datos</h1>

            <div className='text-muted fw-bold fs-5'>Ingrese el o los campos que desea editar</div>
          </div>
          <form onSubmit={formik2.handleSubmit}>
            
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Razon Social
              </label>
              <input
                {...formik2.getFieldProps('razonSocial2')}
                type='text'
                name='razonSocial2'
                onChange={formik2.handleChange}
                value={formik2.values.razonSocial2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.razonSocial2 && formik2.errors.razonSocial2},
                  {
                    'is-valid': formik2.touched.razonSocial2 && !formik2.errors.razonSocial2,
                  }
                )}
              />
            </div>
            
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Direccion
              </label>
              <input
                {...formik2.getFieldProps('direccion2')}
                type='text'
                name='direccion2'
                onChange={formik2.handleChange}
                value={formik2.values.direccion2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.direccion2 && formik2.errors.direccion2},
                  {
                    'is-valid': formik2.touched.direccion2 && !formik2.errors.direccion2,
                  }
                )}
              />
            </div>
            
            
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Email
              </label>
              <input
                {...formik2.getFieldProps('email2')}
                type='email'
                name='email2'
                onChange={formik2.handleChange}
                value={formik2.values.email2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.email2 && formik2.errors.email2},
                  {
                    'is-valid': formik2.touched.email2 && !formik2.errors.email2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Telefono
              </label>
              <input
                {...formik2.getFieldProps('telefono2')}
                type='text'
                name='telefono2'
                onChange={formik2.handleChange}
                value={formik2.values.telefono2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.telefono2 && formik2.errors.telefono2},
                  {
                    'is-valid': formik2.touched.telefono2 && !formik2.errors.telefono2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Nombre Contacto
              </label>
              <input
                {...formik2.getFieldProps('nombreContacto2')}
                type='text'
                name='nombreContacto2'
                onChange={formik2.handleChange}
                value={formik2.values.nombreContacto2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.nombreContacto2 && formik2.errors.nombreContacto2},
                  {
                    'is-valid': formik2.touched.nombreContacto2 && !formik2.errors.nombreContacto2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Activo
                </label>
                <select aria-label="Select example" 
                          {...formik2.getFieldProps('activo2')}
                          name='activo2'
                          onChange={formik2.handleChange}
                          value={formik2.values.activo2}
                          className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {'is-invalid': formik2.touched.activo2 && formik2.errors.activo2},
                            {
                              'is-valid': formik2.touched.activo2 && !formik2.errors.activo2,
                            }
                          )}
                    >
                  <option>Seleccione el estado</option>
                  <option value="S">Si</option>
                  <option value="N">No</option>
                </select>
              </div>

            <button
              type='submit'
              id='kt_sign_in_submit'
              className='btn btn-lg btn-primary w-100 mb-5'
              disabled={formik2.isSubmitting || !formik2.isValid}
            >
              {!loading2 && <span className='indicator-label'>Actualizar</span>}
              {loading2 && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Cargando...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </form>
        </div>
      </Modal>
      
      <Modal isOpen={modalEliminar} className="p-5 my-10">
        <ModalBody className='d-flex justify-content-center'>
          <h4 className='text-center'>
          ¿Estás seguro que deseas eliminar el proveedor
                <br />
          {selectedData && selectedData.razonSocial}?
          </h4>
        </ModalBody>
        <ModalFooter className='d-flex justify-content-center'>
          <button className='btn mx-5 btn-danger w-25' onClick={() => peticionDelete()}>
            Sí
          </button>
          <button className='btn mx-5 btn-secondary w-25' onClick={() => abrirCerrarModalEliminar()}>
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export {Proveedores}
