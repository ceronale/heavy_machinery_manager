import {FC, useState, useEffect, forwardRef} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import axios from 'axios'
import {
  Modal,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Button,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from 'reactstrap'
import {useFormik, Field, Form, Formik} from 'formik'
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
import PictureAsPdf from '@material-ui/icons/PictureAsPdf'

import {ExportCsv, ExportPdf} from '@material-table/exporters'

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
  {title: 'PL1', field: 'PrecioLista1'},
  {title: 'PL2', field: 'PrecioLista2'},
  {title: 'Valordia', field: 'valordia'},
  {title: 'Fecha  Inicio', field: 'desde'},
  {title: 'NºGuia Inicio', field: 'Folio'},
]
const columns2 = [
  {title: 'Equipo', field: 'Nombre'},
  {title: 'Marca', field: 'Marca'},
  {title: 'Modelo', field: 'Modelo'},
  {title: 'Categoria', field: 'Categoria'},
  {title: 'NºInventario', field: 'NInventario'},
  {title: 'Estado', field: 'Estado'},
  {title: 'PL1', field: 'PrecioLista1'},
  {title: 'PL2', field: 'PrecioLista2'},
  {title: 'Fecha  Inicio', field: 'fecha'},
  {title: 'NºGuia Inicio', field: 'Folio'},
]

const columns3 = [
  {title: 'Equipo', field: 'Nombre'},
  {title: 'Marca', field: 'Marca'},
  {title: 'Modelo', field: 'Modelo'},
  {title: 'Estado', field: 'Estado'},
]

const columns4 = [
  {title: 'Cliente', field: 'cliente'},
  {title: 'Obra', field: 'obra'},
  {title: 'Fecha', field: 'fecha'},
]

const initialValues2 = {
  id2: '',
  cliente2: '',
  obra2: '',
  valordia2: '',
  fecha2: '',
  Folio2: '',
  observaciones2: '',
  PrecioLista22: '',
  PrecioLista12: '',
}

const formSchema2 = Yup.object().shape({
  cliente2: Yup.string(),
  observaciones2: Yup.string(),
  obra2: Yup.string(),
  valordia2: Yup.string(),
  fecha2: Yup.string(),
  Folio2: Yup.string(),
  fecha22: Yup.string(),
  numeroguia22: Yup.string(),
  desde2: Yup.string(),
  hasta2: Yup.string(),
  dias2: Yup.string(),
  total2: Yup.string(),
})

const Salida: FC = () => {
  const baseUrl = 'https://crisalex.cl/api/?metodo=salida'
  const baseUrl2 = 'https://crisalex.cl/api/?metodo=salidanodisponibles'
  const [clientesModal, setClientesModal] = useState([])
  const [obraModal, setObraModal] = useState([])
  const [idInventario, setidInventario] = useState(String)
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [dataModalHistorial, setDataModalHistorial] = useState([])
  const [dataSeleccionada, setdataSeleccionada] = useState([])
  const [modalTabla, setModalTabla] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalHistorialArriendo, setModalHistorialArriendo] = useState(false)
  const [modalPdf, setModalPdf] = useState(false)

  const [iframe, setiframe] = useState(String)
  const [dataArriendo, setdataArriendo] = useState({
    id: '',
    cliente: '',
    obra: '',
    PrecioLista1: '',
    PrecioLista2: '',
    valordia: '',
    fecha: '',
    Folio: '',
    fecha2: '',
    numeroGuia2: '',
    desde: '',
    hasta: '',
    dias: '',
    total: '',
  })
  const [selectedData, setselectedData] = useState({
    id: '',
    cliente: '',
    obra: '',
    PrecioLista1: '',
    PrecioLista2: '',
    valordia: '',
    fecha: '',
    Folio: '',
    fecha2: '',
    numeroGuia2: '',
    desde: '',
    hasta: '',
    dias: '',
    total: '',
  })

  //Mensajes SweetAlert2
  const swlSuccess = () => {
    Swal.fire('Equipo Arrendado', 'El equipo se arrendó correctamente', 'success')
  }
  const swlErrDisponible = () => {
    Swal.fire('Error', 'Uno o mas de los equipos ha arrendar no se encuentran disponibles', 'error')
  }

  const [loading2, setLoading2] = useState(false)
  const formik2 = useFormik({
    initialValues: initialValues2,
    validationSchema: formSchema2,
    onSubmit: (values) => {
      setLoading2(true)
      var aux = true
      dataSeleccionada.forEach((vairbale: any) => {
  

        if (vairbale.Estado == 'Disponible') {
        } else {
          aux = false
        }
      })
      if (aux) {
        peticionDepacho(values)
        dataSeleccionada.forEach((vairbale: any) => {
          peticionPut(values, vairbale.id, vairbale.valordia)
          peticionUpdateEstado(vairbale.id_inventario)
        })

        
        setTimeout(() => {
          swlSuccess()
          setLoading2(false)
          abrirCerrarModalTabla()
          formik2.resetForm()
        }, 1000)

      } else {
        swlErrDisponible()
        setLoading2(false)
        formik2.resetForm()
      }
      peticionGet()
      peticionGet2()
     
    },
  })

  const abrirCerrarModalTabla = () => {
    setModalTabla(!modalTabla)
  }
  const abrirCerrarModalPdf = () => {
    setModalPdf(!modalPdf)
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar)
    formik2.resetForm()
  }
  const abrirHistorialArriendo = () => {
    setModalHistorialArriendo(!modalHistorialArriendo)
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

  const peticionGetModalHistorial = async () => {
    await axios
      .get('https://crisalex.cl/api/?metodo=historialarriendo')
      .then((response) => {
        setDataModalHistorial(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const modalArrendar = (data: any) => {
    initialValues2.PrecioLista12 = data.PrecioLista1
    initialValues2.PrecioLista22 = data.PrecioLista2
    setidInventario(data.id_inventario)
    setdataSeleccionada(data)

    console.log(data)
    abrirCerrarModalTabla()
  }

  const openPdf = (data: any) => {
    setiframe(data.guia_despacho)
    abrirCerrarModalPdf()
  }

  const seleccionarFramework = (data: any, caso: string) => {
    /*
    initialValues2.PrecioLista12 = data.PrecioLista1
    initialValues2.PrecioLista22 = data.PrecioLista2
    setidInventario(data.id_inventario)
    console.log(data.id_inventario)

    setdataArriendo(data)
    setselectedData(data)
    initialValues2.id2 = data.id

    if ((data.cliente = clientesModal)) {
      initialValues2.cliente2 = ''
    }
    if ((data.valordia = null)) {
      initialValues2.valordia2 = ''
    }

    initialValues2.fecha2 = data.fecha
    if ((data.fecha = null)) {
      initialValues2.fecha2 = ''
    }
    initialValues2.numeroGuia2 = data.numeroGuia
    if ((data.numeroGuia = null)) {
      initialValues2.numeroGuia2 = ''
    }
    initialValues2.fecha22 = data.fecha2
    if ((data.fecha2 = null)) {
      initialValues2.fecha22 = ''
    }
    initialValues2.numeroGuia22 = data.numeroGuia2
    if ((data.numeroGuia2 = null)) {
      initialValues2.numeroGuia22 = ''
    }
    initialValues2.desde2 = data.desde
    if ((data.desde = null)) {
      initialValues2.desde2 = ''
    }
    initialValues2.hasta2 = data.hasta
    if ((data.hasta = null)) {
      initialValues2.hasta2 = ''
    }
    initialValues2.dias2 = data.dias
    if ((data.dias = null)) {
      initialValues2.dias2 = ''
    }
    initialValues2.total2 = data.total
    if ((data.total = null)) {
      initialValues2.total2 = ''
    }

    caso === 'Editar' ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
     */
  }

  const peticionPut = async (
    values: {
      id2: any
      cliente2: any
      obra2: any
      valordia2: any
      observaciones2: any
      fecha2: any
      Folio2: any
    },
    id: any,
    valordia: any
  ) => {
    var f = new FormData()

    f.append('id', values.id2)
    f.append('id_cliente', values.cliente2)
    f.append('id_obra', values.obra2)
    f.append('Folio', values.Folio2)
    f.append('desde', values.fecha2)
    f.append('Observaciones', values.observaciones2)
    f.append('valordia', valordia)
    f.append('METHOD', 'PUT')

    await axios
      .post('https://crisalex.cl/api/?metodo=arriendo', f, {params: {id: id}})
      .then((response) => {
        var v = response.data
        if (typeof v === 'string') {
          Swal.fire('Error', 'Ha ocurrido un error', 'error')
          throw new Error('Ha ocurrido un error' + response.data)
        }
      })
      .catch((error) => {
        Swal.fire('Error', 'Ha ocurrido un error', 'error')
        console.log(error)
      })
  }

  const peticionPutValorDia = async (id: any, valordia: any) => {
    var f = new FormData()

    f.append('id', id)
    f.append('valordia', valordia)
    f.append('METHOD', 'PUT')

    await axios
      .post('https://crisalex.cl/api/?metodo=valordia', f, {params: {id: id}})
      .then((response) => {
        var nula = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const setValorDia = async (idValor: any, valor: any) => {
    dataSeleccionada.forEach((vairbale: any) => {
      if (vairbale.id == idValor) {
        vairbale.valordia = valor
      }
    })
  }
  const peticionUpdateEstado = async (idi: any) => {
    var f = new FormData()
    var baseUrl = 'https://crisalex.cl/api/?metodo=updateestadoinventario'
    f.append('id', idi)
    f.append('id_estado', '2')
    f.append('METHOD', 'PUT')
    await axios
      .post(baseUrl, f, {params: {id: idi}})
      .then((response) => {
        var nula = response.data
        formik2.resetForm()
 
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const peticionPostHistorial = async (cliente:string,obra:string,pdf:string) => {
    var f = new FormData()
    var today = new Date(),
 
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    f.append('cliente', cliente)
    f.append('obra', obra)
    f.append('guia_despacho', pdf)
    f.append('fecha',  date)
    f.append('METHOD', 'POST')
    await axios
      .post("https://crisalex.cl/api/?metodo=historialmantencion", f)
      .then((response) => {
        var x = response.data
    
        peticionGetModalHistorial()
 
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

  useEffect(() => {
    peticionGet()
    peticionGet2()
    peticionGetSelectModal('clientes')
    peticionGetModalHistorial()
  }, [])

  const updateArriendos = async (
    values: {
      id2?: any
      cliente2: any
      obra2: any
      fecha2: any
      Folio2: any
      fecha22: any
      numeroGuia22: any
      desde2: any
      hasta2: any
      dias2: any
      total2: any
    },
    f: FormData,
    s: string
  ) => {
    await axios
      .post(baseUrl, f, {params: {id: s}})
      .then((response) => {
        var dataNueva = data
        var nula = response.data
        dataNueva.forEach((vairbale: any) => {
          if (vairbale.id === selectedData.id) {
            vairbale.cliente = values.cliente2
            vairbale.obra = values.obra2
            vairbale.fecha = values.fecha2
            vairbale.Folio = values.Folio2
            vairbale.fecha2 = values.fecha22
            vairbale.numeroGuia2 = values.numeroGuia22
            vairbale.desde = values.desde2
            vairbale.hasta = values.hasta2
            vairbale.dias = values.dias2
            vairbale.total = values.total2
          }
        })

        setData([])
        setData(dataNueva)

      })
      .catch((error) => {
        console.log(error)
      })
  }

  const peticionGetSelectModalObra = async (variable: string, id: string) => {
    var url = 'https://crisalex.cl/api/?metodo=' + variable + '&id=' + id
    await axios
      .get(url)
      .then((response) => {
        setObraModal(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const obraSelect = (id: any) => {
    formik2.values.cliente2 = id
    //setvariableMarca(marca);
    peticionGetSelectModalObra('clienteobra', id)
  }

  const peticionDepacho = async (variablesModal: any) => {
    var f = new FormData()
    var baseUrl = 'http://localhost/facto/tester.php?'
    var glosa = ''
    var cantidad = ''
    var monto_unitario = ''
    var exento_afecto = ''
    var unidad = ''
    var cont = 0
    var total = 0
    var totalafecto=0
    var totaliva = 0

    dataSeleccionada.forEach((vairbale: any) => {
      cont++
      glosa = vairbale.Nombre + ' / ' + vairbale.Marca + ' / ' + vairbale.Modelo
      cantidad = '1'
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
        unidad;
        totalafecto =totalafecto + Math.round(parseInt(vairbale.valordia) * 1)
        total=(total + Math.round(
          parseInt(vairbale.valordia) * 1 +
            (parseInt(vairbale.valordia) * 1 * 19) / 100
        ))
        totaliva= totaliva + Math.round((parseInt(vairbale.valordia) * 1 * 19) / 100)
    })

    var obra = ''
    var nombreContacto = ''
    var receptor_rut = ''
    var receptor_email = ''
    var receptor_razon = ''
    var receptor_direccion = ''
    var receptor_comuna = ''
    var receptor_ciudad = ''
    var receptor_telefono = ''
    var receptor_giro = ''
    console.log("hola");

    clientesModal.forEach((vairbale: any) => {
     
      if (vairbale.id === variablesModal.cliente2) {
        console.log(vairbale);
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

    obraModal.forEach((vairbale: any) => {
      if (vairbale.id === variablesModal.obra2) {
        obra = vairbale.nombre
      }
    })

    var observaciones =
    'GUIA DE ARRIENDO - Obra: ' +
      obra +
      ' Direccion:  ' +
      receptor_direccion +
      ' Contacto: ' +
      nombreContacto +
      ' Fono: ' +
      receptor_telefono +
      ' Mas observaciones: ' +
      variablesModal.observaciones2

    await axios
      .post(baseUrl, f, {
        params: {
          tipo_dte: '52',
          fecha_emision: variablesModal.fecha2,
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
          total_final:total,
          contador:cont,
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })

      .then((response) => {
        var x: any = response.data
        console.log("qqqqqqqqqqqqqqq")
        peticionPostHistorial(receptor_razon,obra,x.enlaces.dte_pdf)

 
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-body py-3'>
          <a onClick={() => abrirHistorialArriendo()} className='btn btn-sm btn-light-primary'>
            <KTSVG path='/media/icons/duotune/files/fil016.svg' className='svg-icon-3' />
            Ver historial de arriendos
          </a>
          <div className='table-responsive'>
            <MaterialTable
              icons={tableIcons}
              columns={columns2}
              data={data2}
              title='Equipos disponibles'
              actions={[
                {
                  icon: Edit,
                  tooltip: 'Editar',
                  onClick: (event, rowData) => modalArrendar(rowData),
                },
              ]}
              options={{
                selection: true,
                actionsColumnIndex: -1,
                headerStyle: {
                  fontSize: '15px',
                },
                filtering: true,

                exportMenu: [
                  {
                    label: 'Exportar PDF',
                    exportFunc: (cols, x) => ExportPdf(cols, data2, 'Arriendos'),
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
              title='Equipos Arrendados'
              actions={[
                {
                  icon: ViewColumn,
                  tooltip: 'Tabla',
                  onClick: (event, rowData) => seleccionarFramework(rowData, 'Tabla'),
                },
              ]}
              options={{
                selection: true,
                actionsColumnIndex: -1,
                headerStyle: {
                  fontSize: '15px',
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

        <Modal size='xl' isOpen={modalTabla} scrollable>
          <div className='modal-header  pb-1 border-1 justify-content-end'>
            <div
              className='btn btn-sm btn-icon btn-active-color-primary'
              onClick={() => abrirCerrarModalTabla()}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>

          <div className='d-flex justify-content-center scroll-y row gy-5 gx-xl-8'>
            <div className='col-xl-8'>
              <div>
                <Card>
                  <CardBody>
                    <MaterialTable
                      icons={tableIcons}
                      columns={columns3}
                      data={dataSeleccionada}
                      options={{
                        headerStyle: {
                          fontSize: '17px',
                        },
                        detailPanelType: 'single',
                      }}
                      detailPanel={({rowData}) => {
                        return (
                          <div
                            className='d-flex flex-column p-5'
                            style={{
                              marginTop: 15,
                              textAlign: 'center',
                              height: 150,
                              fontSize: 20,
                            }}
                          >
                            Seleccionar el valor Dia
                            <br></br>
                            <ButtonGroup>
                              <Button
                                className='m-5 rounded'
                                color='primary'
                                onClick={() => setValorDia(rowData.id, rowData.PrecioLista1)}
                              >
                                {rowData.PrecioLista1}
                              </Button>
                              <Button
                                className='m-5 rounded'
                                color='primary'
                                onClick={() => setValorDia(rowData.id, rowData.PrecioLista2)}
                              >
                                {rowData.PrecioLista2}
                              </Button>
                            </ButtonGroup>
                            <br></br>
                          </div>
                        )
                      }}
                      title='Equipos Arrendados'
                    />
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className='col-xxl-4'>
              <div className={`card mb-5 mb-xl-8`}>
                <Card>
                  <CardBody>
                    <form className='w-75 mx-auto' onSubmit={formik2.handleSubmit}>
                      <div className='mb-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Cliente
                        </label>
                        <select
                          aria-label='Select example'
                          {...formik2.getFieldProps('cliente2')}
                          name='cliente2'
                          onChange={(e) => {
                            obraSelect(e.currentTarget.value)
                          }}
                          value={formik2.values.cliente2}
                          className={clsx(
                            'form-select form-select-solid',
                            {'is-invalid': formik2.touched.cliente2 && formik2.errors.cliente2},
                            {
                              'is-valid': formik2.touched.cliente2 && !formik2.errors.cliente2,
                            }
                          )}
                        >
                          <option>Seleccionar un Cliente</option>
                          {clientesModal.map((d) => (
                            <option key={d['id']} value={d['id']}>
                              {d['Receptor_razon']}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>
                      <div className='mb-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Obra
                        </label>
                        <select
                          aria-label='Select example'
                          {...formik2.getFieldProps('obra2')}
                          name='obra2'
                          onChange={formik2.handleChange}
                          value={formik2.values.obra2}
                          className={clsx(
                            'form-select form-select-solid',
                            {'is-invalid': formik2.touched.obra2 && formik2.errors.obra2},
                            {'is-valid': formik2.touched.obra2 && !formik2.errors.obra2}
                          )}
                        >
                          <option>Seleccionar una Obra</option>
                          {obraModal?.map((d) => (
                            <option key={d['id']} value={d['id']}>
                              {d['nombre']}
                            </option>
                          ))}
                          ;
                        </select>
                      </div>

                      <div className='mb-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Numero de guia
                        </label>
                        <input
                          {...formik2.getFieldProps('Folio2')}
                          type='text'
                          name='Folio2'
                          onChange={formik2.handleChange}
                          value={formik2.values.Folio2}
                          className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {'is-invalid': formik2.touched.Folio2 && formik2.errors.Folio2},
                            {
                              'is-valid': formik2.touched.Folio2 && !formik2.errors.Folio2,
                            }
                          )}
                        />
                      </div>

                      <div className='mb-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Fecha
                        </label>
                        <input
                          {...formik2.getFieldProps('fecha2')}
                          type='date'
                          name='fecha2'
                          onChange={formik2.handleChange}
                          value={formik2.values.fecha2}
                          className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {'is-invalid': formik2.touched.fecha2 && formik2.errors.fecha2},
                            {
                              'is-valid': formik2.touched.fecha2 && !formik2.errors.fecha2,
                            }
                          )}
                        />
                      </div>
                      <div className='mb-10'>
                        <label htmlFor='exampleFormControlInput1' className='required form-label'>
                          Observaciones
                        </label>
                        <input
                          {...formik2.getFieldProps('observaciones2')}
                          type='text'
                          name='observaciones2'
                          onChange={formik2.handleChange}
                          value={formik2.values.observaciones2}
                          className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {
                              'is-invalid':
                                formik2.touched.observaciones2 && formik2.errors.observaciones2,
                            },
                            {
                              'is-valid':
                                formik2.touched.observaciones2 && !formik2.errors.observaciones2,
                            }
                          )}
                        />
                      </div>
                      <button
                        type='submit'
                        id='kt_sign_in_submit'
                        className='btn btn-lg btn-primary w-100 mb-5'
                      >
                        {!loading2 && <span className='indicator-label'>Arrendar</span>}
                        {loading2 && (
                          <span className='indicator-progress' style={{display: 'block'}}>
                            Cargando...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                          </span>
                        )}
                      </button>
                    </form>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <Modal isOpen={modalHistorialArriendo} size='xl'>
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
          Historial Arriendo
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
          Guia de despacho
        </ModalHeader>
        <ModalBody>
          <iframe width='750' height='850' src={iframe} title='Guia de despacho'></iframe>
        </ModalBody>
      </Modal>
    </div>
  )
}

export {Salida}
