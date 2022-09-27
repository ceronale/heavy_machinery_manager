import {FC, useState, useEffect, forwardRef} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import axios from 'axios'
import {Modal, ModalBody, ModalFooter} from 'reactstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
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

  { title: "Id", field: "id" },
  { title: "Nombre", field: "nombre" },
  { title: "Disponible", field: "disponible" },
  { title: "Arriendo", field: "arriendo" },
  { title: "Mantencion", field: "mantencion" },
  { title: "Dado de Baja", field: "baja" },
  
]

const initialValues = {
  id: '',
  nombre: '',
  disponible: '',
  arriendo: '',
  mantencion: '',
  baja: '', 
}
const initialValues2 = {
  id2: '',
  nombre2: '',
  disponible2: '',
  arriendo2: '',
  mantencion2: '',
  baja2: '',
}

const formSchema = Yup.object().shape({

  nombre: Yup.string().required('Nombre es requerido'),
  disponible: Yup.string().required('Disponible es requerido'),
  arriendo: Yup.string().required('Arriendo es requerido'),
  mantencion: Yup.string().required('Mantencion es requerido'),
  baja: Yup.string().required('Baja es requerido'),
  
})
const formSchema2 = Yup.object().shape({
  
  nombre2: Yup.string().required('Nombre es requerido'),
  disponible2: Yup.string().required('Disponible es requerido'),
  arriendo2: Yup.string().required('Arriendo es requerido'),
  mantencion2: Yup.string().required('Mantencion es requerido'),
  baja2: Yup.string().required('Baja es requerido'),
})

const Estados: FC = () => {
  
  const baseUrl = 'https://crisalex.cl/api/?metodo=estados'
  const [data, setData] = useState([])
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  

  const [selectedData, setselectedData] = useState({
    id: '',
    nombre: '',
    disponible: '',
    arriendo: '',
    mantencion: '',
    baja: '', 
  })
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values: { id: any; nombre: any; disponible: any; arriendo: any; mantencion: any; baja: any;}) => {
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
  const peticionPost = async (values: {id: any; nombre: any; disponible: any; arriendo: any; mantencion: any; baja: any; }) => {
    var f = new FormData()
    f.append('id', values.id)
    f.append('nombre', values.nombre)
    f.append('disponible', values.disponible)
    f.append('arriendo', values.arriendo)
    f.append('mantencion', values.mantencion)
    f.append('baja', values.baja)
    f.append('METHOD', 'POST')

    await axios
      .post(baseUrl, f)
      .then((response) => {
        setData(data.concat(response.data))
        console.log(response.data)
        setTimeout(() => {
          abrirCerrarModalInsertar()
          setLoading(false)
          formik.resetForm()
        }, 1000)
      })
      .catch((error) => {
        console.log(error)
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
    initialValues2.nombre2 = data.nombre
    initialValues2.disponible2 = data.disponible
    initialValues2.arriendo2 = data.arriendo
    initialValues2.mantencion2 = data.mantencion
    initialValues2.baja2 = data.baja
  
    caso === 'Editar' ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const peticionPut = async (values: {id2: any; nombre2: any; disponible2: any; arriendo2: any; mantencion2: any; baja2: any;}) => {
    var f = new FormData()
    f.append('id', values.id2)
    f.append('nombre', values.nombre2)
    f.append('disponible', values.disponible2)
    f.append('arriendo', values.arriendo2)
    f.append('mantencion', values.mantencion2)
    f.append('baja', values.baja2)
    f.append('METHOD', 'PUT')
    await axios
      .post(baseUrl, f, {params: {id: selectedData.id}})
      .then((response) => {
        console.log(response.data)
        var dataNueva = data
        dataNueva.forEach((vairbale: any) => {
          if (vairbale.id === selectedData.id) {
            vairbale.nombre = values.nombre2
            vairbale.disponible = values.disponible2
            vairbale.arriendo = values.arriendo2
            vairbale.mantencion = values.mantencion2
            vairbale.baja = values.baja2
            
          }
        })
        setData([]);
        setData(dataNueva)
        setTimeout(() => {
          abrirCerrarModalEditar()
          setLoading2(false)
          formik2.resetForm()
        }, 1000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: selectedData.id}})
    .then(response=>{
      setData(data.filter((vairbale: any)=>vairbale.id!==selectedData.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
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
            Nuevo
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
          title="Estados"
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
              fontSize: "17px",
            },filtering: true,

            exportMenu: [{
              
              label: 'Exportar PDF',
              exportFunc: (cols, x) => ExportPdf(cols, data, 'Estados')
            },{
              label: 'Exportar CSV',
              exportFunc: (cols, x) => ExportCsv(cols, data, 'Estados')
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
                Nombre
              </label>
              <input
                {...formik.getFieldProps('razonSocial')}
                type='text'
                name='nombre'
                onChange={formik.handleChange}
                value={formik.values.nombre}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.nombre && formik.errors.nombre},
                  {
                    'is-valid': formik.touched.nombre && !formik.errors.nombre,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Disponible
              </label>
              <input
                {...formik.getFieldProps('disponible')}
                type='text'
                name='disponible'
                onChange={formik.handleChange}
                value={formik.values.disponible}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.disponible && formik.errors.disponible},
                  {
                    'is-valid': formik.touched.disponible && !formik.errors.disponible,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Arriendo
              </label>
              <input
                {...formik.getFieldProps('arriendo')}
                type='text'
                name='arriendo'
                onChange={formik.handleChange}
                value={formik.values.arriendo}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.arriendo && formik.errors.arriendo},
                  {
                    'is-valid': formik.touched.arriendo && !formik.errors.arriendo,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Mantencion
              </label>
              <input
                {...formik.getFieldProps('mantencion')}
                type='text'
                name='mantencion'
                onChange={formik.handleChange}
                value={formik.values.mantencion}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.mantencion && formik.errors.mantencion},
                  {
                    'is-valid': formik.touched.mantencion && !formik.errors.mantencion,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Dado de Baja
              </label>
              <input
                {...formik.getFieldProps('baja')}
                type='text'
                name='baja'
                onChange={formik.handleChange}
                value={formik.values.baja}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.baja && formik.errors.baja},
                  {
                    'is-valid': formik.touched.baja && !formik.errors.baja,
                  }
                )}
              />
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
                Nombre
              </label>
              <input
                {...formik2.getFieldProps('nombre2')}
                type='text'
                name='nombre2'
                onChange={formik2.handleChange}
                value={formik2.values.nombre2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.nombre2 && formik2.errors.nombre2},
                  {
                    'is-valid': formik2.touched.nombre2 && !formik2.errors.nombre2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
               Disponible
              </label>
              <input
                {...formik2.getFieldProps('disponible2')}
                type='text'
                name='disponible2'
                onChange={formik2.handleChange}
                value={formik2.values.disponible2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.disponible2 && formik2.errors.disponible2},
                  {
                    'is-valid': formik2.touched.disponible2 && !formik2.errors.disponible2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Arriendo
              </label>
              <input
                {...formik2.getFieldProps('arriendo2')}
                type='text'
                name='arriendo2'
                onChange={formik2.handleChange}
                value={formik2.values.arriendo2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.arriendo2 && formik2.errors.arriendo2},
                  {
                    'is-valid': formik2.touched.arriendo2 && !formik2.errors.arriendo2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Mantencion
              </label>
              <input
                {...formik2.getFieldProps('mantencion2')}
                type='text'
                name='mantencion2'
                onChange={formik2.handleChange}
                value={formik2.values.mantencion2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.mantencion2 && formik2.errors.mantencion2},
                  {
                    'is-valid': formik2.touched.mantencion2 && !formik2.errors.mantencion2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
              Dado de Baja
              </label>
              <input
                {...formik2.getFieldProps('baja2')}
                type='text'
                name='baja2'
                onChange={formik2.handleChange}
                value={formik2.values.baja2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.baja2 && formik2.errors.baja2},
                  {
                    'is-valid': formik2.touched.baja2 && !formik2.errors.baja2,
                  }
                )}
              />
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
      
      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar la fila{' '}
          {selectedData && selectedData.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => peticionDelete()}>
            Sí
          </button>
          <button className='btn btn-secondary' onClick={() => abrirCerrarModalEliminar()}>
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export {Estados}
