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

  { title: "Nombre", field: "nombre" },
  { title: "NºInventario", field: "NInventario" },
  { title: "Descripcion", field: "Descripcion" },
  { title: "Marca", field: "Marca" },
  { title: "Modelo", field: "Modelo" },
  { title: "Estado", field: "Estado" },
  { title: "Categoria", field: "categoria" },
  { title: "PL1", field: "PrecioLista1" },
  { title: "PL2", field: "PrecioLista2" },
  { title: "Valor Dia", field: "ValorDia" },

  
]

const initialValues = {
  id: '',
  nombre: '',
  NInventario: '',
  Descripcion: '',
  Marca: '',
  Modelo: '',
  Estado: '',
  PrecioLista1: '',
  PrecioLista2: '',
  ValorDia: '',
  id_categorias:''
  
}
const initialValues2 = {
  id2: '',
  nombre2: '',
  NInventario2: '',
  Descripcion2: '',
  Marca2: '',
  Modelo2: '',
  Estado2: '',
  PrecioLista12: '',
  PrecioLista22: '',
  ValorDia2: '',
  id_categorias2:''
}

const formSchema = Yup.object().shape({
  
  nombre: Yup.string().required('Nombre requerido'),
  NInventario: Yup.string().required('NInventario es requerido'),
  Descripcion: Yup.string().required('Descripcion es requerido'),
  Marca: Yup.string().required('Marca es requerido'),
  Modelo: Yup.string().required('Modelo es requerido'),
  Estado: Yup.string().required('Estado es requerido'),
  PrecioLista1: Yup.string().required('PrecioLista1 es requerido'),
  PrecioLista2: Yup.string().required('PrecioLista2 es requerido'),
  ValorDia: Yup.string().required('Valor Dia es requerido'),
  id_categorias: Yup.string().required('id_categorias es requerido'),
})
const formSchema2 = Yup.object().shape({
  
  nombre2: Yup.string().required('Nombre requerido'),
  NInventario2: Yup.string().required('NInventario es requerido'),
  Descripcion2: Yup.string().required('Descripcion es requerido'),
  Marca2: Yup.string().required('Marca es requerido'),
  Modelo2: Yup.string().required('Modelo es requerido'),
  Estado2: Yup.string().required('Estado es requerido'),
  PrecioLista12: Yup.string().required('PrecioLista1 es requerido'),
  PrecioLista22: Yup.string().required('PrecioLista2 es requerido'),
  ValorDia2: Yup.string().required('Valor Dia es requerido'),
  id_categorias2: Yup.string().required('id_categorias es requerido'),
})

const Maquinaria: FC = () => {
  
  const baseUrl = 'https://crisalex.cl/api/?metodo=maquinaria'
  const [data, setData] = useState([])
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  

  const [selectedData, setselectedData] = useState({
    id: '',
    nombre: '',
    NInventario: '',
    Descripcion: '',
    Marca: '',
    Modelo: '',
    Estado: '',
    PrecioLista1: '',
    PrecioLista2: '',
    ValorDia: '',
  })
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values: { id: any; nombre: any; NInventario: any; Descripcion: any; Marca: any; Modelo: any;  Estado: any; PrecioLista1: any; PrecioLista2: any; ValorDia: any; id_categorias: any }) => {
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
  const peticionPost = async (values: {id: any; nombre: any; NInventario: any; Descripcion: any; Marca: any; Modelo: any; Estado: any; PrecioLista1: any; PrecioLista2: any; ValorDia: any; id_categorias: any}) => {
    var f = new FormData()
    f.append('id', values.id)
    f.append('nombre', values.nombre)
    f.append('NInventario', values.NInventario)
    f.append('Descripcion', values.Descripcion)
    f.append('Marca', values.Marca)
    f.append('Modelo', values.Modelo)
    f.append('Estado', values.Estado)
    f.append('PrecioLista1', values.PrecioLista1)
    f.append('PrecioLista2', values.PrecioLista2)
    f.append('ValorDia', values.ValorDia)
    f.append('id_categorias', values.id_categorias)
    f.append('METHOD', 'POST')

    switch(values.id_categorias) { 
      case "1": { 
        f.append('categoria', "Aseo")
         //statements; 
         break; 
      } 
      case "2": { 
        f.append('categoria', "Compactación")
         //statements; 
         break; 
      } 
      case "3": { 
        f.append('categoria', "Demolición")
         //statements; 
         break; 
      } 
      case "4": { 
        f.append('categoria', "Generadores")
         //statements; 
         break; 
      } 
      case "5": { 
        f.append('categoria', "Herramientas de Corte")
         //statements; 
         break; 
      } 
      case "6": { 
        f.append('categoria', "Herramientas Eléctricas")
         //statements; 
         break; 
      } 
      case "7": { 
        f.append('categoria', "Hidráulica")
         //statements; 
         break; 
      } 
      case "8": { 
        f.append('categoria', "Hormigón")
         //statements; 
         break; 
      } 
      case "9": { 
        f.append('categoria', "Inalámbricas")
         //statements; 
         break; 
      } 
      case "10": { 
        f.append('categoria', "Neumática")
         //statements; 
         break; 
      } case "11": { 
        f.append('categoria', "Pavimentación")
         //statements; 
         break; 
      } 
      case "12": { 
        f.append('categoria', "Perforación")
         //statements; 
         break; 
      } 
      case "13": { 
        f.append('categoria', "Soldadoras")
         //statements; 
         break; 
      } 
      case "14": { 
        f.append('categoria', "Brocas")
         //statements; 
         break; 
      } 
      case "15": { 
        f.append('categoria', "Varias")
         //statements; 
         break; 
      } 
      
      default: { 
         //statements; 
         break; 
      } 
   }

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
    initialValues2.NInventario2 = data.NInventario
    initialValues2.Descripcion2 = data.Descripcion
    initialValues2.Marca2 = data.Marca
    initialValues2.Modelo2 = data.Modelo
    initialValues2.Estado2 = data.Estado
    initialValues2.PrecioLista12 = data.PrecioLista1
    initialValues2.PrecioLista22 = data.PrecioLista2
    initialValues2.ValorDia2 = data.ValorDia
    initialValues2.id_categorias2 = data.id_categorias
    
    
    
    
    

    caso === 'Editar' ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const peticionPut = async (values: {id2: any; nombre2: any; NInventario2: any; Descripcion2: any; Marca2: any; Modelo2: any; Estado2: any; PrecioLista12: any; PrecioLista22: any; ValorDia2: any; id_categorias2: any;}) => {
    var f = new FormData()
    f.append('id', values.id2)
    f.append('nombre', values.nombre2)
    f.append('NInventario', values.NInventario2)
    f.append('Descripcion', values.Descripcion2)
    f.append('Marca', values.Marca2)
    f.append('Modelo', values.Modelo2)
    f.append('Estado', values.Estado2)
    f.append('PrecioLista1', values.PrecioLista12)
    f.append('PrecioLista2', values.PrecioLista22)
    f.append('ValorDia', values.ValorDia2)
    f.append('id_categorias', values.id_categorias2)
    f.append('METHOD', 'PUT')
    await axios
      .post(baseUrl, f, {params: {id: selectedData.id}})
      .then((response) => {
        console.log(response.data)
        var dataNueva = data
        dataNueva.forEach((vairbale: any) => {
          if (vairbale.id === selectedData.id) {
            vairbale.nombre = values.nombre2
            vairbale.NInventario = values.NInventario2
            vairbale.Descripcion = values.Descripcion2
            vairbale.Marca = values.Marca2
            vairbale.Modelo = values.Modelo2
            vairbale.Estado = values.Estado2
            vairbale.PrecioLista1 = values.PrecioLista12
            vairbale.PrecioLista2 = values.PrecioLista22
            vairbale.ValorDia = values.ValorDia2
            vairbale.id_categorias = values.id_categorias2
            
            console.log(values.id_categorias2)
            switch(values.id_categorias2) { 
              case "1": { 
                vairbale.categoria = "Aseo"
                 //statements; 
                 break; 
              } 
              case "2": { 
                vairbale.categoria = "Compactación"
                 //statements; 
                 break; 
              } 
              case "3": { 
                vairbale.categoria = "Demolición"
                 //statements; 
                 break; 
              } 
              case "4": { 
                vairbale.categoria = "Generadores"
                 //statements; 
                 break; 
              } 
              case "5": { 
                vairbale.categoria = "Herramientas de Corte"
                 //statements; 
                 break; 
              } 
              case "6": { 
                vairbale.categoria = "Herramientas Eléctricas"
                 //statements; 
                 break; 
              } 
              case "7": { 
                vairbale.categoria = "Hidráulica"
                 //statements; 
                 break; 
              } 
              case "8": { 
                vairbale.categoria = "Hormigón"
                 //statements; 
                 break; 
              } 
              case "9": { 
                vairbale.categoria = "Inalámbricas"
                 //statements; 
                 break; 
              } 
              case "10": { 
                vairbale.categoria = "Neumática"
                 //statements; 
                 break; 
              } 
              case "11": { 
                vairbale.categoria = "Pavimentación"
                 //statements; 
                 break; 
              } 
              case "12": { 
                vairbale.categoria = "Perforación"
                 //statements; 
                 break; 
              } 
              case "13": { 
                vairbale.categoria = "Soldadoras"
                 //statements; 
                 break; 
              } 
              case "14": { 
                console.log("ale")
                vairbale.categoria = "Brocas"
                 //statements; 
                 break; 
              } 
              case "15": { 
                vairbale.categoria = "Varias"
                 //statements; 
                 break; 
              } 
              default: { 
                 //statements; 
                 break; 
              } 
           }
           
           
           
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
          title="Equipo y Maquinaria"
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
              exportFunc: (cols, x) => ExportPdf(cols, data, 'Maquinarias')
            },{
              label: 'Exportar CSV',
              exportFunc: (cols, x) => ExportCsv(cols, data, 'Maquinarias')
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
                {...formik.getFieldProps('nombre')}
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
                NºInventario
              </label>
              <input
                {...formik.getFieldProps('NInventario')}
                type='text'
                name='NInventario'
                onChange={formik.handleChange}
                value={formik.values.NInventario}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.NInventario && formik.errors.NInventario},
                  {
                    'is-valid': formik.touched.NInventario && !formik.errors.NInventario,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Descripcion
              </label>
              <input
                {...formik.getFieldProps('Descripcion')}
                type='text'
                name='Descripcion'
                onChange={formik.handleChange}
                value={formik.values.Descripcion}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.Descripcion && formik.errors.Descripcion},
                  {
                    'is-valid': formik.touched.Descripcion && !formik.errors.Descripcion,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Marca
              </label>
              <input
                {...formik.getFieldProps('Marca')}
                type='text'
                name='Marca'
                onChange={formik.handleChange}
                value={formik.values.Marca}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.Marca && formik.errors.Marca},
                  {
                    'is-valid': formik.touched.Marca && !formik.errors.Marca,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Modelo
              </label>
              <input
                {...formik.getFieldProps('Modelo')}
                type='text'
                name='Modelo'
                onChange={formik.handleChange}
                value={formik.values.Modelo}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.Modelo && formik.errors.Modelo},
                  {
                    'is-valid': formik.touched.Modelo && !formik.errors.Modelo,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Categoria
              </label>
              <select aria-label="Select example" 
               {...formik.getFieldProps('id_categorias')}
                
                name='id_categorias'
                onChange={formik.handleChange}
                value={formik.values.id_categorias}
                className={clsx(
                  'form-select form-select-solid',
                  {'is-invalid': formik.touched.id_categorias && formik.errors.id_categorias},
                  {
                    'is-valid': formik.touched.id_categorias && !formik.errors.id_categorias,
                  }
                )}>
                <option>Seleccione una Categoria</option>
                <option value="1">1. Aseo</option>
                <option value="2">2. Compactación</option>
                <option value="3">3. Demolición</option>
                <option value="4">4. Generadores</option>
                <option value="5">5. Herramientas de Corte</option>
                <option value="6">6. Herramientas Eléctricas</option>
                <option value="7">7. Hidráulica</option>
                <option value="8">8. Hormigón</option>
                <option value="9">9. Inalámbricas</option>
                <option value="10">10. Neumática</option>
                <option value="11">11. Pavimentación</option>
                <option value="12">12. Perforación</option>
                <option value="13">13. Soldadoras</option>
                <option value="14">14. Brocas</option>
                <option value="15">15. Varias</option>

              </select>
             
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Estado
              </label>
              <input
                {...formik.getFieldProps('Estado')}
                type='text'
                name='Estado'
                onChange={formik.handleChange}
                value={formik.values.Estado}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.Estado && formik.errors.Estado},
                  {
                    'is-valid': formik.touched.Estado && !formik.errors.Estado,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                PrecioLista1
              </label>
              <input
                {...formik.getFieldProps('PrecioLista1')}
                type='text'
                name='PrecioLista1'
                onChange={formik.handleChange}
                value={formik.values.PrecioLista1}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.PrecioLista1 && formik.errors.PrecioLista1},
                  {
                    'is-valid': formik.touched.PrecioLista1 && !formik.errors.PrecioLista1,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                PrecioLista2
              </label>
              <input
                {...formik.getFieldProps('PrecioLista2')}
                type='text'
                name='PrecioLista2'
                onChange={formik.handleChange}
                value={formik.values.PrecioLista2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.PrecioLista2 && formik.errors.PrecioLista2},
                  {
                    'is-valid': formik.touched.PrecioLista2 && !formik.errors.PrecioLista2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                ValorDia
              </label>
              <input
                {...formik.getFieldProps('ValorDia')}
                type='text'
                name='ValorDia'
                onChange={formik.handleChange}
                value={formik.values.ValorDia}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.ValorDia && formik.errors.ValorDia},
                  {
                    'is-valid': formik.touched.ValorDia && !formik.errors.ValorDia,
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
                NºInventario
              </label>
              <input
                {...formik2.getFieldProps('NInventario2')}
                type='text'
                name='NInventario2'
                onChange={formik2.handleChange}
                value={formik2.values.NInventario2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.NInventario2 && formik2.errors.NInventario2},
                  {
                    'is-valid': formik2.touched.NInventario2 && !formik2.errors.NInventario2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Descripcion
              </label>
              <input
                {...formik2.getFieldProps('Descripcion2')}
                type='text'
                name='Descripcion2'
                onChange={formik2.handleChange}
                value={formik2.values.Descripcion2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.Descripcion2 && formik2.errors.Descripcion2},
                  {
                    'is-valid': formik2.touched.Descripcion2 && !formik2.errors.Descripcion2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Marca
              </label>
              <input
                {...formik2.getFieldProps('Marca2')}
                type='text'
                name='Marca2'
                onChange={formik2.handleChange}
                value={formik2.values.Marca2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.Marca2 && formik2.errors.Marca2},
                  {
                    'is-valid': formik2.touched.Marca2 && !formik2.errors.Marca2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Modelo
              </label>
              <input
                {...formik2.getFieldProps('Modelo2')}
                type='text'
                name='Modelo2'
                onChange={formik2.handleChange}
                value={formik2.values.Modelo2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.Modelo2 && formik2.errors.Modelo2},
                  {
                    'is-valid': formik2.touched.Modelo2 && !formik2.errors.Modelo2,
                  }
                )}
              />
            </div>
            
             <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Categorias
              </label>
              <select aria-label="Select example" 
               {...formik2.getFieldProps('id_categorias2')}
                name='id_categorias2'
                onChange={formik2.handleChange}
                value={formik2.values.id_categorias2}
                className={clsx(
                  'form-select form-select-solid',
                  {'is-invalid': formik2.touched.id_categorias2 && formik2.errors.id_categorias2},
                  {
                    'is-valid': formik2.touched.id_categorias2 && !formik2.errors.id_categorias2,
                  }
                )}>
                <option>Seleccione una Categoria</option>
                <option value="1">1. Aseo</option>
                <option value="2">2. Compactación</option>
                <option value="3">3. Demolición</option>
                <option value="4">4. Generadores</option>
                <option value="5">5. Herramientas de Corte</option>
                <option value="6">6. Herramientas Eléctricas</option>
                <option value="7">7. Hidráulica</option>
                <option value="8">8. Hormigón</option>
                <option value="9">9. Inalámbricas</option>
                <option value="10">10. Neumática</option>
                <option value="11">11. Pavimentación</option>
                <option value="12">12. Perforación</option>
                <option value="13">13. Soldadoras</option>
                <option value="14">14. Brocas</option>
                <option value="15">15. Varias</option>
              </select>
             
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Estado
              </label>
              <input
                {...formik2.getFieldProps('Estado2')}
                type='text'
                name='Estado2'
                onChange={formik2.handleChange}
                value={formik2.values.Estado2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.Estado2 && formik2.errors.Estado2},
                  {
                    'is-valid': formik2.touched.Estado2 && !formik2.errors.Estado2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                PrecioLista1
              </label>
              <input
                {...formik2.getFieldProps('PrecioLista12')}
                type='text'
                name='PrecioLista12'
                onChange={formik2.handleChange}
                value={formik2.values.PrecioLista12}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.PrecioLista12 && formik2.errors.PrecioLista12},
                  {
                    'is-valid': formik2.touched.PrecioLista12 && !formik2.errors.PrecioLista12,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                PrecioLista2
              </label>
              <input
                {...formik2.getFieldProps('PrecioLista22')}
                type='text'
                name='PrecioLista22'
                onChange={formik2.handleChange}
                value={formik2.values.PrecioLista22}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.PrecioLista22 && formik2.errors.PrecioLista22},
                  {
                    'is-valid': formik2.touched.PrecioLista22 && !formik2.errors.PrecioLista22,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                ValorDia
              </label>
              <input
                {...formik2.getFieldProps('ValorDia2')}
                type='text'
                name='ValorDia2'
                onChange={formik2.handleChange}
                value={formik2.values.ValorDia2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.ValorDia2 && formik2.errors.ValorDia2},
                  {
                    'is-valid': formik2.touched.ValorDia2 && !formik2.errors.ValorDia2,
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

export {Maquinaria}
