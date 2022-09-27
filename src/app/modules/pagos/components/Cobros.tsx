import {FC, useState, useEffect, forwardRef} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import axios from 'axios'
import {Modal,Card, CardBody, ModalBody, ModalFooter,ButtonGroup, Button} from 'reactstrap'
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
import { ExportCsv,ExportPdf } from '@material-table/exporters'

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

  {title: 'Equipo', field: 'Nombre'},
  {title: 'Marca', field: 'Marca'},
  {title: 'Modelo', field: 'Modelo'},
  {title: 'NºInventario', field: 'NInventario'},
  {title: 'Cliente', field: 'Cliente'},
  {title: 'Obra', field: 'Obra'},
  {title: 'Fecha  Inicio', field: 'fecha'},
  {title: 'NºGuia Inicio', field: 'numeroGuia'},
  {title: 'Fecha Termino', field: 'fecha2'},
  {title: 'NºGuia Termino', field: 'numeroGuia2'},
  {title: 'Desde', field: 'desde'},
  {title: 'Hasta', field: 'hasta'},
  {title: 'Valor día', field: 'valordia'},
  {title: 'Días', field: 'Cant_dias'},
  {title: 'Total', field: 'total'},

]

const column2 = [

  {title: 'Equipo', field: 'Nombre'}

]

const initialValues = {
  id: '',
  nombre: '',
  id_cliente:'',

  
}
const initialValues2 = {
  id2: '',
  nombre2: '',
  id_cliente2:'',
}

const formSchema = Yup.object().shape({
  
  nombre: Yup.string().required('Obra es requerido'),

})
const formSchema2 = Yup.object().shape({
  
  nombre2: Yup.string().required('Obra es requerido'),
})

const Cobros: FC = () => {
  
  const baseUrl = 'https://crisalex.cl/api/?metodo=cobros'
  const [data, setData] = useState([])
  const [clienteModal, setClienteModal] = useState([])
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  const [total, setTotal] = useState({});

  const [dataSeleccionada, setdataSeleccionada] = useState([])

  const [modalTabla, setModalTabla] = useState(false)  

  const [selectedData, setselectedData] = useState({
    id: '',
    nombre: '',
    id_cliente:'',
  })
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values: { id: any; nombre: any; id_cliente: any}) => {
      setLoading(true)
      peticionPost(values)
      
    },
  })

  const modalArrendar = (data: any) => {
    console.log(data)
    abrirCerrarModalTabla()
  }

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
  const abrirCerrarModalTabla = () => {
    setModalTabla(!modalTabla)
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar)
  }
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar)
  }
  const peticionPost = async (values: {id: any; nombre: any; id_cliente: any;}) => {
    var f = new FormData()
    console.log(values)
    f.append('id', values.id)
    f.append('nombre', values.nombre)
    f.append('id_cliente',values.id_cliente)
    f.append('METHOD', 'POST')

    await axios
      .post(baseUrl, f)
      .then((response) => {
        setData(data.concat(response.data))
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
       console.log(response.data)
        setData(response.data)
    
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const peticionGetSelectModal = async () => {
    var url='https://crisalex.cl/api/?metodo=cliente'  
    await axios
      .get(url)
      .then((response) => {
          setClienteModal(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const seleccionarFramework = (data: any, caso: string) => {
    setselectedData(data)
    initialValues2.id2 = data.id
    initialValues2.nombre2 = data.nombre
    initialValues2.id_cliente2 = data.id_cliente
    


    caso === 'Editar' ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const peticionPut = async (values: {id2: any; nombre2: any; id_cliente2: any;}) => {
    var f = new FormData()
    f.append('id', values.id2)
    f.append('nombre', values.nombre2)
    f.append('id_cliente',values.id_cliente2)
    f.append('METHOD', 'PUT')
    await axios
      .post(baseUrl, f, {params: {id: selectedData.id}})
      .then((response) => {
        var dataNueva = data
        var obra = response.data
        dataNueva.forEach((vairbale: any) => {
          if (vairbale.id === selectedData.id) {
            vairbale.nombre = values.nombre2
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
    peticionGetSelectModal()
  }, [])

  return (

    <div className={`card mb-5 mb-xl-8`}>
      {/* begin::Header */}

     
      <MaterialTable
          icons={ tableIcons }
          columns={columns}
          data={data}
          title="Generador de Cobros"
          actions ={[
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
              fontSize: "17px",
            },filtering: true,

            exportMenu: [{
              label: 'Exportar PDF',
              exportFunc: (cols, x) => ExportPdf(cols, data, 'Cobros')
            },{
              label: 'Exportar CSV',
              exportFunc: (cols, x) => ExportCsv(cols, data, 'Cobros')
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
              
            </div>
            <div className='col-xxl-4'>
              
            </div>
          </div>
        </Modal>
    </div>
    
  )
}

export {Cobros}
