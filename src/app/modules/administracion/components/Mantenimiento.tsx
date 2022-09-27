import {FC, useState, useEffect, forwardRef} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import axios from 'axios'
import {Modal, ModalBody, ModalFooter} from 'reactstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import MaterialTable, {Icons} from '@material-table/core'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import HourglassFull from '@material-ui/icons/HourglassFull'
import {shallowEqual, useSelector, connect, useDispatch, ConnectedProps} from 'react-redux'
import {RootState} from '../../../../setup'

import {ExportCsv, ExportPdf} from '@material-table/exporters'
import Select from 'react-select'

import Swal from 'sweetalert2'

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
  ViewColumn: forwardRef<SVGSVGElement>((props, ref) => <ViewColumn {...props} ref={ref} />),
}

/* Variables Iniciales de los modal insertar */
const columns = [
  {title: 'ID', field: 'id'},
  {title: 'Equipo', field: 'Nombre'},
  {title: 'Marca', field: 'Marca'},
  {title: 'Modelo', field: 'Modelo'},
  {title: 'Categoria', field: 'Categoria'},
  {title: 'NºInventario', field: 'NInventario'},
  {title: 'Estado', field: 'Estado'},
  {title: 'Cliente', field: 'Cliente'},
  {title: 'Obra', field: 'Obra'},
  {title: 'Valor Dia', field: 'valordia'},
  {title: 'Fecha  Inicio', field: 'desde'},
  {title: 'NºGuia Inicio', field: 'Folio'},
  {title: 'Fecha Termino', field: 'fecha2'},
  {title: 'NºGuia Termino', field: 'numeroGuia2'},
]

const initialValues2 = {
  id: '',
  texto: '',
  fecha_mantencion: '',
  estado: '',
}

const formSchema2 = Yup.object().shape({
  texto: Yup.string(),
  fecha_mantencion: Yup.string(),
  estado: Yup.string(),
 
})

const swlSuccess = ( estado: any ) => {
  Swal.fire(
    'Operación exitiosa',
    'Equipo en Mantencion',
    'success'
  )
}
const swlErr = () => {
  Swal.fire(
    'Error',
    'El equipo no fue devuelto',
    'error'
  )
}


const Mantenimiento: FC = () => {
  const baseUrl = 'https://crisalex.cl/api/?metodo=mantenimiento'
  const baseUrl2 = 'https://crisalex.cl/api/?metodo=retornob'
  const [repuestoModal, setRepuestoModal] = useState([])
  const [repuestoSelected, setRepuestoSelected] = useState([])

  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [dataSeleccionada, setdataSeleccionada] = useState([])
  const [idSelected, setIdSelected] = useState(String)
  const [idSelectedInventario, setIdSelectedInventario] = useState(String)
  const [estadosodal, setEstadosodal] = useState([])
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [modalCambiarEstado, setModalCambiarEstado] = useState(false)
  const accessToken = useSelector<RootState>(({auth}) => auth.accessToken, shallowEqual)

  const [loading2, setLoading2] = useState(false)

  const formik2 = useFormik({
    initialValues: initialValues2,
    validationSchema: formSchema2,
    onSubmit: (values) => {
      setLoading2(true)
      peticionPost(values, idSelected)
      peticionUpdateEstado(idSelectedInventario,values.estado)
      setTimeout(() => {
        peticionGet()
        peticionGet2()
        abrirCerrarModalEditar()
        setLoading2(false)
        formik2.resetForm()
      }, 1500)
    },
  })

  /*
  const formik3 = useFormik({
    initialValues: initialValues3,
    validationSchema: formSchema3,
    onSubmit: (values) => {
      setLoading2(true)
      

      setTimeout(() => {
        peticionGet()
        peticionGet2()
        abrirCerrarModalCambiarEstado()
        setLoading2(false)
        formik3.resetForm()
      }, 1500)
    },
  })
*/

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar)
    formik2.resetForm()
  }

  const abrirCerrarModalCambiarEstado = () => {
    setModalCambiarEstado(!modalCambiarEstado)
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar)
  }

  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const peticionGet2 = async () => {
    await axios
      .get(baseUrl2)
      .then((response) => {
        setData2(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const peticionPost = async (values: {id: any; texto: any; fecha_mantencion: any}, id: any) => {
    var f = new FormData()
    var data : any =accessToken
    f.append('id_arriendo', id)
    f.append('texto', values.texto)
    f.append('fecha_mantencion', values.fecha_mantencion)
    f.append('id_usuario', data.id)
    f.append('METHOD', 'POST')
   
 
    await axios
      .post('https://crisalex.cl/api/?metodo=retornoc', f)
      .then((response) => {
        var nula = response.data
   
        repuestoSelected.forEach((v: any) => {
          peticionPostRepuestoMantencion(response.data.id, v.id)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const peticionPostRepuestoMantencion = async (id_mantencion: string, id_repuesto: string) => {
    var f = new FormData()

    f.append('id_mantencion', id_mantencion)
    f.append('id_repuesto', id_repuesto)
    f.append('METHOD', 'POST')
    
    await axios
      .post('https://crisalex.cl/api/?metodo=repuestomantecion', f)
      .then((response) => {
        var nula = response.data
        
  
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const seleccionarFramework = (rowData: any) => {
    setdataSeleccionada(rowData)
    abrirCerrarModalEliminar()
  }

  const seleccionarFramework2 = (rowData: any) => {
    setIdSelected(rowData.id)
    setIdSelectedInventario(rowData.id_inventario)
    abrirCerrarModalEditar()
  }

  const mantencion = () => {
    dataSeleccionada.forEach((vairbale: any) => {
      peticionUpdateEstado(vairbale.id_inventario, '4')
    })
    abrirCerrarModalEliminar()
    peticionGet()
    peticionGet2()
  }
  const peticionUpdateEstado = async (id: any, estado: any) => {
    var f = new FormData()
    var baseUrl = 'https://crisalex.cl/api/?metodo=updateestadoinventario'
    f.append('id', id)
    f.append('id_estado', estado)
    f.append('METHOD', 'PUT')
    await axios
      .post(baseUrl, f, {params: {id: id}})
      .then((response) => {
        peticionGet()
        peticionGet2()
        setTimeout(() => {
          swlSuccess(estado)
          formik2.resetForm()
        }, 1000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const peticionGetSelectModal = async (variable: string) => {
    var url = 'https://crisalex.cl/api/?metodo=' + variable
    await axios
      .get(url)
      .then((response) => {
        if (variable == 'repuestosmodal') {
          setRepuestoModal(response.data)
        }
        if (variable == 'estados') {
          setEstadosodal(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onDropdownChange = (value: any) => {

    setRepuestoSelected(value)
  }

  useEffect(() => {
    peticionGet()
    peticionGet2()
    peticionGetSelectModal('repuestosmodal')
    peticionGetSelectModal('estados')
  }, [])

  return (
    <div>
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <MaterialTable
              icons={tableIcons}
              columns={columns}
              data={data2}
              title='Equipos Retornados'
              actions={[
                {
                  icon: ChevronRight,
                  tooltip: 'Retornar',
                  onClick: (event, rowData) => seleccionarFramework(rowData),
                },
              ]}
              options={{
                selection: true,
                actionsColumnIndex: -1,
                headerStyle: {
                  fontSize: '12px',
                },
                filtering: true,
                exportMenu: [
                  {
                    label: 'Exportar PDF',
                    exportFunc: (cols, x) => ExportPdf(cols, data, 'Arriendos'),
                  },
                  {
                    label: 'Exportar CSV',
                    exportFunc: (cols, x) => ExportCsv(cols, data, 'Arriendos'),
                  },
                ],
              }}
              localization={{
                header: {
                  actions: 'Acciones',
                },
                toolbar: {
                  searchPlaceholder: 'Buscar',
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <MaterialTable
              icons={tableIcons}
              columns={columns}
              data={data}
              title='Equipos en Mantenimiento'
              actions={[
                {
                  icon: AddBox,
                  tooltip: 'Pasar a mantención',
                  onClick: (event, rowData) => seleccionarFramework2(rowData),
                },
              ]}
              options={{
                headerStyle: {
                  fontSize: '12px',
                },
                filtering: true,

                exportMenu: [
                  {
                    label: 'Exportar PDF',
                    exportFunc: (cols, x) => ExportPdf(cols, data, 'Mantenimiento'),
                  },
                  {
                    label: 'Exportar CSV',
                    exportFunc: (cols, x) => ExportCsv(cols, data, 'Mantenimiento'),
                  },
                ],
              }}
              localization={{
                header: {
                  actions: 'Acciones',
                },
                toolbar: {
                  searchPlaceholder: 'Buscar',
                },
              }}
            />
          </div>
        </div>

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
              <h1 className='mb-3'>Pasar a mantencion</h1>

              <div className='text-muted fw-bold fs-5'>
                Ingresar los campos para poner en mantencion el equipo
              </div>
            </div>
            <form onSubmit={formik2.handleSubmit}>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Observaciones
                </label>

                <input
                  {...formik2.getFieldProps('texto')}
                  type='text'
                  name='texto'
                  onChange={formik2.handleChange}
                  value={formik2.values.texto}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {'is-invalid': formik2.touched.texto && formik2.errors.texto},
                    {
                      'is-valid': formik2.touched.texto && !formik2.errors.texto,
                    }
                  )}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Fecha de Matencion
                </label>

                <input
                  {...formik2.getFieldProps('fecha_mantencion')}
                  type='date'
                  name='fecha_mantencion'
                  onChange={formik2.handleChange}
                  value={formik2.values.fecha_mantencion}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {
                      'is-invalid':
                        formik2.touched.fecha_mantencion && formik2.errors.fecha_mantencion,
                    },
                    {
                      'is-valid':
                        formik2.touched.fecha_mantencion && !formik2.errors.fecha_mantencion,
                    }
                  )}
                />
              </div>

              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Repuestos
                </label>
                <Select
                  isMulti
                  options={repuestoModal}
                  onChange={onDropdownChange}
                  closeMenuOnSelect={false}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Estado
                </label>
                <select
                  aria-label='Select example'
                  {...formik2.getFieldProps('estado')}
                  name='estado'
                  value={formik2.values.estado}
                  className={clsx(
                    'form-select form-select-solid',
                    {'is-invalid': formik2.touched.estado && formik2.errors.estado},
                    {
                      'is-valid': formik2.touched.estado && !formik2.errors.estado,
                    }
                  )}
                >
                  <option>Seleccionar un estado</option>
                  {estadosodal.map((d) => (
                    <option key={d['id']} value={d['id']}>
                      {d['nombre']}
                    </option>
                  ))}
                  ;
                </select>
              </div>
              <button
                type='submit'
                id='kt_sign_in_submit'
                className='btn btn-lg btn-primary w-100 mb-5'
              >
                {!loading2 && <span className='indicator-label'>Disponible</span>}
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
      </div>

      <Modal isOpen={modalEliminar} className="p-5 my-10">
        <ModalBody className='d-flex justify-content-center'>¿Estás seguro que desea poner en mantenimiento el equipo?</ModalBody>
        <ModalFooter className='d-flex justify-content-center'>
          <button className='btn mx-5 btn-danger w-25' onClick={() => mantencion()}>
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

export {Mantenimiento}
