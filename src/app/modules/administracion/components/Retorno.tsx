import {FC, useState, useEffect, forwardRef} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import axios from 'axios'
import {Modal, ModalBody, ModalFooter,ModalHeader} from 'reactstrap'
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
import {MTableBodyRow} from '@material-table/core'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import {ExportCsv, ExportPdf} from '@material-table/exporters'
import PictureAsPdf from '@material-ui/icons/PictureAsPdf'
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
  PictureAsPdf: forwardRef<SVGSVGElement>((props, ref) => <PictureAsPdf {...props} ref={ref} />),
}

/* Variables Iniciales de los modal insertar */
const columns = [
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
  {title: 'NºGuia Termino', field: 'numeroGuia2'},
  {title: 'Fecha Termino', field: 'fecha2'},
]
const columns4 = [
  {title: 'Cliente', field: 'cliente'},
  {title: 'Obra', field: 'obra'},
  {title: 'Fecha', field: 'fecha'},
]

const initialValues2 = {
  id2: '',
  cliente2: '',
  valordia2: '',
  PrecioLista12: '',
  PrecioLista22: '',
  fecha2: '',
  Folio2: '',
  fecha22: '',
  numeroGuia22: '',
}

const formSchema2 = Yup.object().shape({
  cliente2: Yup.string(),
  valordia2: Yup.string(),
  fecha2: Yup.string(),
  Folio2: Yup.string(),
  fecha22: Yup.string(),
  numeroguia22: Yup.string(),
})

const Retorno: FC = () => {
  const baseUrl = 'https://crisalex.cl/api/?metodo=retornob'
  const baseUrl2 = 'https://crisalex.cl/api/?metodo=retornoa'
  const [clientesModal, setClientesModal] = useState([])
  const [idInventario, setidInventario] = useState(String)
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [obraModal, setObraModal] = useState([])
  const [dataModalHistorial, setDataModalHistorial] = useState([])
  const [modalHistorial, setModalHistorial] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEditar1, setModalEditar1] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [dataSeleccionada, setdataSeleccionada] = useState([])
  const [iframe, setiframe] = useState(String)
  const [modalPdf, setModalPdf] = useState(false)
  

  const [selectedData, setselectedData] = useState({
    id: '',
    cliente: '',
    PrecioLista1: '',
    PrecioLista2: '',
    valordia: '',
    fecha: '',
    Folio: '',
    fecha22: '',
    numeroGuia22: ''

  })

  const [loading2, setLoading2] = useState(false)
  const formik2 = useFormik({
    initialValues: initialValues2,
    validationSchema: formSchema2,
    onSubmit: (values) => {
      setLoading2(true)
      peticionDepacho()
      dataSeleccionada.forEach((vairbale: any) => {
        peticionPut(values,vairbale.id)
        peticionUpdateEstado(vairbale.id_inventario)
      })  
    },
  })
  const abrirCerrarModalEditar1 = () => {
    setModalEditar1(!modalEditar1)
    formik2.resetForm()
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar)
    formik2.resetForm()
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

  const seleccionarFramework = (data: any, caso: string) => {
    setselectedData(data)
    setdataSeleccionada(data)
    console.log(data)
    data.forEach((vairbale: any) => {
      if(data.Folio2==null){
        initialValues2.numeroGuia22 = ""
      }else{
        initialValues2.numeroGuia22 = data.Folio2
      }
      if(data.fecha2==null){
        initialValues2.fecha22 = ""
      }else{
        initialValues2.fecha22 = data.fecha2
      }
    })
    setidInventario(data.id_inventario)
   // initialValues2.fecha22 = data.fecha2

    
    abrirCerrarModalEditar1()
  }


  const peticionPut = async (values: {
    id2: any
    fecha22: any
    numeroGuia22: any
  },id: any) => {
    var f = new FormData()
    f.append('id', id)
    f.append('fecha2', values.fecha22)
    f.append('Folio2', values.numeroGuia22)
    f.append('METHOD', 'PUT')
    await axios
    .post(baseUrl, f, {params: {id: id}})
    .then((response) => {
      var nula = response.data
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const peticionUpdateEstado = async (id:any) => {
    var f = new FormData()
    var baseUrl = 'https://crisalex.cl/api/?metodo=updateestadoinventario'
    f.append('id', id)
    f.append('id_estado',"3")
    f.append('METHOD', 'PUT')
    await axios
    .post(baseUrl, f, {params: {id:id}})
    .then((response) => {
      var nula = response.data
      
      peticionGet()
      peticionGet2()
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
        if (variable == 'clientes') {
          setClientesModal(response.data)
        }
        if (variable == 'obra') {
          setObraModal(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const peticionDepacho = async () => {
    var isdifferent = true
    var aux = 0
    var b = ''
    dataSeleccionada.forEach((vairbale: any) => {
      aux++

      if (aux == 1) {
        b = vairbale.id_cliente
      }
      if (vairbale.id_cliente != b) {
        isdifferent = false
      }
    })

    if (isdifferent) {
      var f = new FormData()
      var baseUrl = 'http://localhost/facto/tester.php?'
      var glosa = ''
      var cantidad = ''
      var monto_unitario = ''
      var exento_afecto = ''
      var unidad = ''
      var cont = 0
      var total = 0
      var totalafecto = 0
      var totaliva = 0
      var idCliente = ''
      var obra = ''

      dataSeleccionada.forEach((vairbale: any) => {
        cont++
        idCliente = vairbale.id_cliente
        obra = vairbale.Obra
        glosa = vairbale.Nombre + ' / ' + vairbale.Marca + ' / ' + vairbale.Modelo
        cantidad = vairbale.NInventario
        monto_unitario = vairbale.valordia
        exento_afecto = '1'
        unidad = '1'
        baseUrl =
          baseUrl +
          '&glosa' +
          cont +
          '=' +
          glosa +
          '&cantidad' +
          cont +
          '=' +
          cantidad +
          '&monto_unitario' +
          cont +
          '=' +
          monto_unitario +
          '&exento_afecto' +
          cont +
          '=' +
          exento_afecto +
          '&unidad' +
          cont +
          '=' +
          unidad
        totalafecto =
          totalafecto + Math.round(parseInt(vairbale.valordia) * parseInt(vairbale.NInventario))
        total =
          total +
          Math.round(
            parseInt(vairbale.valordia) * parseInt(vairbale.NInventario) +
              (parseInt(vairbale.valordia) * parseInt(vairbale.NInventario) * 19) / 100
          )
        totaliva =
          totaliva +
          Math.round((parseInt(vairbale.valordia) * parseInt(vairbale.NInventario) * 19) / 100)
      })

      var nombreContacto = ''
      var receptor_rut = ''
      var receptor_email = ''
      var receptor_razon = ''
      var receptor_direccion = ''
      var receptor_comuna = ''
      var receptor_ciudad = ''
      var receptor_telefono = ''
      var receptor_giro = ''

      clientesModal.forEach((vairbale: any) => {
        if (vairbale.id === idCliente) {
          receptor_rut = vairbale.Receptor_rut
          receptor_email = vairbale.email
          receptor_razon = vairbale.Receptor_razon
          receptor_direccion = vairbale.Receptor_direccion
          receptor_comuna = vairbale.Receptor_comuna
          receptor_ciudad = vairbale.Receptor_ciudad
          receptor_telefono = vairbale.Receptor_telefono
          receptor_giro = vairbale.Receptor_giro
          nombreContacto = vairbale.nombreContacto
        }
      })
      var today = new Date()
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

      var observaciones =
        'GUIA DE RETORNO - Obra: ' +
        obra +
        ' Direccion:  ' +
        receptor_direccion +
        ' Contacto: ' +
        nombreContacto +
        ' Fono: ' +
        receptor_telefono

      await axios
        .post(baseUrl, f, {
          params: {
            tipo_dte: '52',
            fecha_emision: date,
            receptor_rut: receptor_rut,
            receptor_email: receptor_email,
            receptor_razon: receptor_razon,
            receptor_direccion: receptor_direccion,
            receptor_comuna: receptor_comuna,
            receptor_ciudad: receptor_ciudad,
            receptor_telefono: receptor_telefono,
            receptor_giro: receptor_giro,
            observaciones: observaciones,
            tipo_guia: '6',
            tipo_traslado: '1',
            total_exento: total,
            total_afecto: totalafecto,
            condiciones_pago: '0',
            total_iva: totaliva,
            total_final: total,
            contador: cont,
          },
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        })
        .then((response) => {
          var x: any = response.data

          if (typeof x === 'string') {
            Swal.fire('Error', 'Ha ocurrido un error', 'error')
            setLoading2(false)
            throw new Error('Ha ocurrido un error' + response.data)
          } else {
            Swal.fire('Equipo Arrendado', 'Se genero la guia correctamente', 'success')
            abrirCerrarModalEditar1()
            formik2.resetForm()
            peticionPostHistorial(receptor_razon, obra, x.enlaces.dte_pdf)
            setLoading2(false)
          }
        })
        .catch((error) => {
          console.log(error)
          setLoading2(false)
        })
    } else {
      abrirCerrarModalEditar1()
      Swal.fire('Error', 'Los datos selecionados no corresponden al mismo cliente', 'error')
      setLoading2(false)
    }
  }
  
  

  const peticionPostHistorial = async (cliente:string,obra:string,pdf:string) => {
    var f = new FormData()
    var today = new Date(),
 
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    f.append('cliente', cliente)
    f.append('obra', obra)
    f.append('guia_retorno', pdf)
    f.append('fecha',  date)
    f.append('METHOD', 'POST')
    await axios
      .post("https://crisalex.cl/api/?metodo=historialretorno", f)
      .then((response) => {
        var x = response.data
    
        peticionGetModalHistorial()
 
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const peticionGetModalHistorial = async () => {
    await axios
      .get('https://crisalex.cl/api/?metodo=historialretorno')
      .then((response) => {
        setDataModalHistorial(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const abrirHistorialArriendo = () => {
    setModalHistorial(!modalHistorial)
  }

  const abrirCerrarModalPdf = () => {
    setModalPdf(!modalPdf)
  }
  
  const openPdf = (data: any) => {
    setiframe(data.guia_retorno)
    abrirCerrarModalPdf()
  }

  useEffect(() => {
    peticionGet()
    peticionGet2()
    peticionGetSelectModal('clientes')
    peticionGetModalHistorial()
  }, [])

  return (
    <div>
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-body py-3'>
        <a onClick={() => abrirHistorialArriendo()} className='btn btn-sm btn-light-primary'>
            <KTSVG path='/media/icons/duotune/files/fil016.svg' className='svg-icon-3' />
            Ver historial de retorno
          </a>
          <div className='table-responsive'>
            <MaterialTable
              icons={tableIcons}
              columns={columns}
              data={data2}
              title='Equipos Arrendados'
              actions={[
                {
                  icon: Edit,
                  tooltip: 'Retornar',
                  onClick: (event, rowData) => seleccionarFramework(rowData, 'Editar'),
                }
              ]}
              options={{
                selection: true,
                actionsColumnIndex: -1,
                headerStyle: {
                  fontSize: '17px',
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
              title='Equipos Retornados'
             
              options={{
               
                actionsColumnIndex: -1,
                headerStyle: {
                  fontSize: '17px',
                },
                filtering: true,

                exportMenu: [
                  {
                    label: 'Exportar PDF',
                    exportFunc: (cols, x) => ExportPdf(cols, data, 'Retorno'),
                  },
                  {
                    label: 'Exportar CSV',
                    exportFunc: (cols, x) => ExportCsv(cols, data, 'Retorno'),
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
        <Modal isOpen={modalEditar1} scrollable>
          <div className='modal-header pb-0 border-0 justify-content-end'>
            <div
              className='btn btn-sm btn-icon btn-active-color-primary'
              onClick={() => abrirCerrarModalEditar1()}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>
          <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-13'>
              <h1 className='mb-3'>Retornar Equipos</h1>

              <div className='text-muted fw-bold fs-5'>Ingresar los campos para Retornar</div>
            </div>
            <form onSubmit={formik2.handleSubmit}>
            <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Numero Guia Termino
                </label>
                <input
                  {...formik2.getFieldProps('numeroGuia22')}
                  type='text'
                  name='numeroGuia22'
                  onChange={formik2.handleChange}
                  value={formik2.values.numeroGuia22}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {'is-invalid': formik2.touched.numeroGuia22 && formik2.errors.numeroGuia22},
                    {
                      'is-valid': formik2.touched.numeroGuia22 && !formik2.errors.numeroGuia22,
                    }
                  )}
                />
              </div>
              <div className='mb-10'>
                <label htmlFor='exampleFormControlInput1' className='required form-label'>
                  Fecha Termino
                </label>
                <input
                  {...formik2.getFieldProps('fecha22')}
                  type='date'
                  name='fecha22'
                  onChange={formik2.handleChange}
                  value={formik2.values.fecha22}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {'is-invalid': formik2.touched.fecha22 && formik2.errors.fecha22},
                    {
                      'is-valid': formik2.touched.fecha22 && !formik2.errors.fecha22,
                    }
                  )}
                />
              </div>
              <button
                type='submit'
                id='kt_sign_in_submit'
                className='btn btn-lg btn-primary w-100 mb-5'
              >
                {!loading2 && <span className='indicator-label'>Retornar</span>}
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
        <Modal isOpen={modalHistorial} size='xl'>
        <ModalHeader
          close={
            <div
              className='btn btn-sm btn-icon btn-active-color-primary'
              onClick={() => abrirHistorialArriendo()}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          }
          toggle={function noRefCheck() {}}
        >
          Historial Retorno
        </ModalHeader>

        <ModalBody>
          <MaterialTable
            icons={tableIcons}
            columns={columns4}
            data={dataModalHistorial}
            title='Equipos disponibles'
            actions={[
              {
                icon: PictureAsPdf,
                tooltip: 'Ver Guia de despacho',
                onClick: (event, rowData) => openPdf(rowData),
              },
            ]}
            options={{
              headerStyle: {
                fontSize: '15px',
              },
              filtering: true,

              exportMenu: [
                {
                  label: 'Exportar PDF',
                  exportFunc: (cols, x) => ExportPdf(cols, dataModalHistorial, 'Historial'),
                },
                {
                  label: 'Exportar CSV',
                  exportFunc: (cols, x) => ExportCsv(cols, dataModalHistorial, 'Historial'),
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
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
      <Modal isOpen={modalPdf} size='lg'>
        <ModalHeader
          close={
            <div
              className='btn btn-sm btn-icon btn-active-color-primary'
              onClick={() => abrirCerrarModalPdf()}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          }
        >
          Guia de retorno
        </ModalHeader>
        <ModalBody>
          <iframe width='750' height='850' src={iframe} title='Guia de despacho'></iframe>
        </ModalBody>
      </Modal>
      </div>


    </div>
  )
}

export {Retorno}
