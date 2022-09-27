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
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

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


  { title: "Usuario", field: "nombreUsuario" },
  { title: "Email", field: "email" },
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
    nombreUsuario: '',
    email: '',
    contrasena: '',
    activo: ''
 
  
}
const initialValues2 = {
  id2: '',
  nombreUsuario2: '',
  email2: '',
  contrasena2: '',
  activo2: ''
}

const formSchema = Yup.object().shape({
  
  nombreUsuario: Yup.string().required('Nombre Usuario es requerido'),
  email: Yup.string().required('Email es requerido'),
  contrasena: Yup.string().required('contrasena es requerido'),
  activo: Yup.string().required('Activo es requerido'),
  
})
const formSchema2 = Yup.object().shape({
  
  nombreUsuario2: Yup.string().required('Nombre Usuario es requerido'),
  email2: Yup.string().required('Email es requerido'),
  contrasena2: Yup.string().required('contrasena es requerido'),
  activo2: Yup.string().required('Activo es requerido'),
})

const Usuarios: FC = () => {
  
  const baseUrl = 'https://crisalex.cl/api/?metodo=usuarios'
  const [data, setData] = useState([])
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  

  const [selectedData, setselectedData] = useState({
    id: '',
    nombreUsuario: '',
    email: '',
    contrasena: '',
    activo: ''
  })
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values: { id: any; nombreUsuario: any; email: any; contrasena: any; activo: any }) => {
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
  const peticionPost = async (values: {id: any; nombreUsuario: any; email: any; contrasena: any; activo: any}) => {
    var f = new FormData()
    f.append('id', values.id)
    f.append('nombreUsuario', values.nombreUsuario)
    f.append('email', values.email)
    f.append('contrasena', values.contrasena)
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
    initialValues2.nombreUsuario2 = data.nombreUsuario
    initialValues2.email2 = data.email
    initialValues2.contrasena2 = data.contrasena
    initialValues2.activo2 = data.activo


    caso === 'Editar' ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const peticionPut = async (values: {id2: any; nombreUsuario2: any; email2: any; contrasena2: any; activo2: any}) => {
    var f = new FormData()
    f.append('id', values.id2)
    f.append('nombreUsuario', values.nombreUsuario2)
    f.append('email', values.email2)
    f.append('contrasena', values.contrasena2)
    f.append('activo', values.activo2)
    f.append('METHOD', 'PUT')
    await axios
      .post(baseUrl, f, {params: {id: selectedData.id}})
      .then((response) => {
        console.log(response.data)
        var dataNueva = data
        dataNueva.forEach((vairbale: any) => {
          if (vairbale.id === selectedData.id) {
            vairbale.nombreUsuario = values.nombreUsuario2
            vairbale.email = values.email2
            vairbale.contrasena = values.contrasena2
            vairbale.activo = values.activo2
           
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
          title="Usuarios"
          actions ={[
           
          ]}
          options={{
            actionsColumnIndex: -1,
            headerStyle: {
              fontSize: "12px",
            },filtering: true,

            exportMenu: [{
              label: 'Exportar PDF',
              exportFunc: (cols, x) => ExportPdf(cols, data, 'Usuarios')
            },{
              label: 'Exportar CSV',
              exportFunc: (cols, x) => ExportCsv(cols, data, 'Usuarios')
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

     
    </div>
  )
}

export {Usuarios}
