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
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

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


  { title: "Razon Social", field: "Receptor_razon" },
  { title: "Giro", field: "Receptor_giro" },
  { title: "Rut", field: "Receptor_rut" },
  { title: "Comuna", field: "Receptor_comuna" },
  { title: "Direccion", field: "Receptor_direccion" },
  { title: "Ciudad", field: "Receptor_ciudad" },
  { title: "Email", field: "email" },
  { title: "Telefono", field: "Receptor_telefono" },
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
 Receptor_razon: '',
  Receptor_giro: '',
  Receptor_rut: '',
  Receptor_comuna: '',
  Receptor_direccion: '',
  Receptor_ciudad: '',
  email: '',
  Receptor_telefono: '',
  nombreContacto: '',
  activo: '',

  
}
const initialValues2 = {
  id2: '',
 Receptor_razon2: '',
  Receptor_giro2: '',
  Receptor_rut2: '',
  Receptor_comuna2: '',
  Receptor_direccion2: '',
  Receptor_ciudad2: '',
  email2: '',
  Receptor_telefono2: '',
  nombreContacto2: '',
  activo2: '',

}

const swlSuccess = (text: any) => {
  Swal.fire(
    'Cliente '+ text,
    'El cliente ha sido '+ text +' exitosamente',
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
  
 Receptor_razon: Yup.string().required('Razon Social es requerido'),
  Receptor_giro: Yup.string().required('Receptor_giro es requerido'),
  Receptor_rut: Yup.string().required('Rut es requerido'),
  Receptor_comuna: Yup.string().required('Comuna es requerido'),
  Receptor_direccion: Yup.string().required('Direccion es requerido'),
  Receptor_ciudad: Yup.string().required('ciudad es requerido'),
  email: Yup.string().required('Email es requerido'),
  Receptor_telefono: Yup.string().required('Telefono es requerido'),
  nombreContacto: Yup.string().required('Nombre de Contacto es requerido'),
  activo: Yup.string().required('Activo es requerido'),

  
})
const formSchema2 = Yup.object().shape({
  
 Receptor_razon2: Yup.string().required('Razon Social es requerido'),
  Receptor_giro2: Yup.string().required('Receptor_giro es requerido'),
  Receptor_rut2: Yup.string().required('Rut es requerido'),
  Receptor_comuna2: Yup.string().required('Comuna es requerido'),
  Receptor_direccion2: Yup.string().required('Direccion es requerido'),
  Receptor_ciudad2: Yup.string().required('ciudad es requerido'),
  email2: Yup.string().required('Email es requerido'),
  Receptor_telefono2: Yup.string().required('Telefono es requerido'),
  nombreContacto2: Yup.string().required('Nombre de Contacto es requerido'),
  activo2: Yup.string().required('Activo es requerido'),

})

const Clientes: FC = () => {
  
  const baseUrl = 'https://crisalex.cl/api/?metodo=cliente'
  const [data, setData] = useState([])
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  

  const [selectedData, setselectedData] = useState({
    id: '',
   Receptor_razon: '',
    Receptor_giro: '',
    Receptor_rut: '',
    Receptor_comuna: '',
    Receptor_direccion: '',
    Receptor_ciudad: '',
    email: '',
    Receptor_telefono: '',
    nombreContacto: '',
    activo: '',

  })
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values: { id: any;Receptor_razon: any; Receptor_giro: any; Receptor_rut: any; Receptor_comuna: any; Receptor_direccion: any;  Receptor_ciudad: any; email: any; Receptor_telefono: any; nombreContacto: any; activo: any;}) => {
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
  const peticionPost = async (values: {id: any;Receptor_razon: any; Receptor_giro: any; Receptor_rut: any; Receptor_comuna: any; Receptor_direccion: any;  Receptor_ciudad: any; email: any; Receptor_telefono: any; nombreContacto: any; activo: any; }) => {
    var f = new FormData()
    f.append('id', values.id)
    f.append('Receptor_razon', values.Receptor_razon)
    f.append('Receptor_giro', values.Receptor_giro)
    f.append('Receptor_rut', values.Receptor_rut)
    f.append('Receptor_comuna', values.Receptor_comuna)
    f.append('Receptor_direccion', values.Receptor_direccion)
    f.append('Receptor_ciudad', values.Receptor_ciudad)
    f.append('email', values.email)
    f.append('Receptor_telefono', values.Receptor_telefono)
    f.append('nombreContacto', values.nombreContacto)
    f.append('activo', values.activo)
    f.append('METHOD', 'POST')

   

    await axios
      .post(baseUrl, f)
      .then((response) => {
        setData(data.concat(response.data))
        console.log(response.data)
        setTimeout(() => {
          abrirCerrarModalInsertar()
          setLoading(false)
          swlSuccess('creado')
          peticionGet()
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
    initialValues2.Receptor_razon2 = data.Receptor_razon
    initialValues2.Receptor_giro2 = data.Receptor_giro
    initialValues2.Receptor_rut2 = data.Receptor_rut
    initialValues2.Receptor_comuna2 = data.Receptor_comuna
    initialValues2.Receptor_direccion2 = data.Receptor_direccion
    initialValues2.Receptor_ciudad2 = data.Receptor_ciudad
    initialValues2.email2 = data.email
    initialValues2.Receptor_telefono2 = data.Receptor_telefono
    initialValues2.nombreContacto2 = data.nombreContacto
    initialValues2.activo2 = data.activo



    caso === 'Editar' ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const peticionPut = async (values: {id2: any;Receptor_razon2: any; Receptor_giro2: any; Receptor_rut2: any; Receptor_comuna2: any; Receptor_direccion2: any;  Receptor_ciudad2: any; email2: any; Receptor_telefono2: any; nombreContacto2: any; activo2: any;}) => {
    var f = new FormData()
    f.append('id', values.id2)
    f.append('Receptor_razon', values.Receptor_razon2)
    f.append('Receptor_giro', values.Receptor_giro2)
    f.append('Receptor_rut', values.Receptor_rut2)
    f.append('Receptor_comuna', values.Receptor_comuna2)
    f.append('Receptor_direccion', values.Receptor_direccion2)
    f.append('Receptor_ciudad', values.Receptor_ciudad2)
    f.append('email', values.email2)
    f.append('Receptor_telefono', values.Receptor_telefono2)
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
            vairbale.Receptor_razon = values.Receptor_razon2
            vairbale.Receptor_giro = values.Receptor_giro2
            vairbale.Receptor_rut = values.Receptor_rut2
            vairbale.Receptor_comuna = values.Receptor_comuna2
            vairbale.Receptor_direccion = values.Receptor_direccion2
            vairbale.Receptor_ciudad = values.Receptor_ciudad2
            vairbale.email = values.email2
            vairbale.Receptor_telefono = values.Receptor_telefono2
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
        return (Swal.fire('No se puede eliminar Cliente','error'),setModalEliminar(false))
        
      }
      setData(data.filter((vairbale: any)=>vairbale.id!==selectedData.id));
      abrirCerrarModalEliminar();
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
            href='#'
            className='btn btn-sm btn-light-primary'
            onClick={() => abrirCerrarModalInsertar()}
          >
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            Agregar Cliente
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
          title="Clientes"
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
              exportFunc: (cols, x) => ExportPdf(cols, data, 'Clientes')
            },{
              label: 'Exportar CSV',
              exportFunc: (cols, x) => ExportCsv(cols, data, 'Clientes')
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
                {...formik.getFieldProps('Receptor_razon')}
                type='text'
                name='Receptor_razon'
                onChange={formik.handleChange}
                value={formik.values.Receptor_razon}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.Receptor_razon && formik.errors.Receptor_razon},
                  {
                    'is-valid': formik.touched.Receptor_razon && !formik.errors.Receptor_razon,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Giro
              </label>
              <input
                {...formik.getFieldProps('Receptor_giro')}
                type='text'
                name='Receptor_giro'
                onChange={formik.handleChange}
                value={formik.values.Receptor_giro}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.Receptor_giro && formik.errors.Receptor_giro},
                  {
                    'is-valid': formik.touched.Receptor_giro && !formik.errors.Receptor_giro,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Rut
              </label>
              <input
                {...formik.getFieldProps('Receptor_rut')}
                type='text'
                name='Receptor_rut'
                onChange={formik.handleChange}
                value={formik.values.Receptor_rut}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.Receptor_rut && formik.errors.Receptor_rut},
                  {
                    'is-valid': formik.touched.Receptor_rut && !formik.errors.Receptor_rut,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Comuna
              </label>
              <input
                {...formik.getFieldProps('Receptor_comuna')}
                type='text'
                name='Receptor_comuna'
                onChange={formik.handleChange}
                value={formik.values.Receptor_comuna}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.Receptor_comuna && formik.errors.Receptor_comuna},
                  {
                    'is-valid': formik.touched.Receptor_comuna && !formik.errors.Receptor_comuna,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Direccion
              </label>
              <input
                {...formik.getFieldProps('Receptor_direccion')}
                type='text'
                name='Receptor_direccion'
                onChange={formik.handleChange}
                value={formik.values.Receptor_direccion}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.Receptor_direccion && formik.errors.Receptor_direccion},
                  {
                    'is-valid': formik.touched.Receptor_direccion && !formik.errors.Receptor_direccion,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Ciudad
              </label>
              <input
               {...formik.getFieldProps('Receptor_ciudad')}
               type='text'
                name='Receptor_ciudad'
                onChange={formik.handleChange}
                value={formik.values.Receptor_ciudad}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.Receptor_ciudad && formik.errors.Receptor_ciudad},
                  {
                    'is-valid': formik.touched.Receptor_ciudad && !formik.errors.Receptor_ciudad,
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
                {...formik.getFieldProps('Receptor_telefono')}
                type='text'
                name='Receptor_telefono'
                onChange={formik.handleChange}
                value={formik.values.Receptor_telefono}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.Receptor_telefono && formik.errors.Receptor_telefono},
                  {
                    'is-valid': formik.touched.Receptor_telefono && !formik.errors.Receptor_telefono,
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
                {...formik2.getFieldProps('Receptor_razon2')}
                type='text'
                name='Receptor_razon2'
                onChange={formik2.handleChange}
                value={formik2.values.Receptor_razon2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.Receptor_razon2 && formik2.errors.Receptor_razon2},
                  {
                    'is-valid': formik2.touched.Receptor_razon2 && !formik2.errors.Receptor_razon2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
               Giro
              </label>
              <input
                {...formik2.getFieldProps('Receptor_giro2')}
                type='text'
                name='Receptor_giro2'
                onChange={formik2.handleChange}
                value={formik2.values.Receptor_giro2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.Receptor_giro2 && formik2.errors.Receptor_giro2},
                  {
                    'is-valid': formik2.touched.Receptor_giro2 && !formik2.errors.Receptor_giro2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Rut
              </label>
              <input
                {...formik2.getFieldProps('Receptor_rut2')}
                type='text'
                name='Receptor_rut2'
                onChange={formik2.handleChange}
                value={formik2.values.Receptor_rut2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.Receptor_rut2 && formik2.errors.Receptor_rut2},
                  {
                    'is-valid': formik2.touched.Receptor_rut2 && !formik2.errors.Receptor_rut2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Comuna
              </label>
              <input
                {...formik2.getFieldProps('Receptor_comuna2')}
                type='text'
                name='Receptor_comuna2'
                onChange={formik2.handleChange}
                value={formik2.values.Receptor_comuna2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.Receptor_comuna2 && formik2.errors.Receptor_comuna2},
                  {
                    'is-valid': formik2.touched.Receptor_comuna2 && !formik2.errors.Receptor_comuna2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Direccion
              </label>
              <input
                {...formik2.getFieldProps('Receptor_direccion2')}
                type='text'
                name='Receptor_direccion2'
                onChange={formik2.handleChange}
                value={formik2.values.Receptor_direccion2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.Receptor_direccion2 && formik2.errors.Receptor_direccion2},
                  {
                    'is-valid': formik2.touched.Receptor_direccion2 && !formik2.errors.Receptor_direccion2,
                  }
                )}
              />
            </div>
            
             <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Ciudad
              </label>
              <input
               {...formik2.getFieldProps('Receptor_ciudad2')}
               type='text'
                name='Receptor_ciudad2'
                onChange={formik2.handleChange}
                value={formik2.values.Receptor_ciudad2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.Receptor_ciudad2 && formik2.errors.Receptor_ciudad2},
                  {
                    'is-valid': formik2.touched.Receptor_ciudad2 && !formik2.errors.Receptor_ciudad2,
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
                type='text'
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
                {...formik2.getFieldProps('Receptor_telefono2')}
                type='text'
                name='Receptor_telefono2'
                onChange={formik2.handleChange}
                value={formik2.values.Receptor_telefono2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.Receptor_telefono2 && formik2.errors.Receptor_telefono2},
                  {
                    'is-valid': formik2.touched.Receptor_telefono2 && !formik2.errors.Receptor_telefono2,
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
          ¿Estás seguro que deseas eliminar el cliente
                <br />
          {selectedData && selectedData.Receptor_razon}?
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

export {Clientes}
