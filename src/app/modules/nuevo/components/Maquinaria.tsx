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
  ViewColumn: forwardRef<SVGSVGElement>((props, ref) => <ViewColumn {...props} ref={ref} />)
};

/* Variables Iniciales de los modal insertar */
const  columns=[

  { title: "Nombre", field: "Nombre" },
  { title: "Marca", field: "Marca" },
  { title: "Modelo", field: "Modelo" },
  { title: "Categoria", field: "Categoria" },
  { title: "Precio Compra", field: "precio_compra" },
  { title: "Fecha Compra", field: "fecha_compra" },
  { title: "NºFact. Compra", field: "fact_compra" },
  { title: "Proveedor", field: "Proveedor" },
  { title: "NºInventario", field: "NInventario" },
  { title: "PL1", field: "PrecioLista1" },
  { title: "PL2", field: "PrecioLista2" },
  { title: "Estado", field: "Estado" },


  
]


const initialValues = {
  id: '',
  nombre: '',
  id_modelo: '',
  id_categorias:'',
  precio_compra:'',
  fecha_compra:'',
  fact_compra:'',
  id_proveedores: '',
  NInventario: '',
  PrecioLista1: '',
  PrecioLista2: ''

  
}
const initialValues2 = {
  id2: '',
  nombre2: '',
  id_modelo2: '',
  id_categorias2:'',
  precio_compra2:'',
  fecha_compra2:'',
  fact_compra2:'',
  id_proveedores2: '',
  NInventario2: '',
  PrecioLista12: '',
  PrecioLista22: '',

}


const swlSuccess = (text: any) => {
  Swal.fire(
    'Equipo '+ text,
    'El equipo ha sido '+ text +' exitosamente',
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
  
  nombre: Yup.string().required('Nombre requerido'),
  id_modelo: Yup.string(),
  id_categorias: Yup.string().required('id_categorias es requerido'),
  precio_compra: Yup.string().required('Precio de compra es requerido'),
  fecha_compra: Yup.string().required('Fecha de compra es requerido'),
  fact_compra: Yup.string().required('Numero Factura es requerido'),
  id_proveedores: Yup.string().required('Proveedores es requerido'),
  NInventario: Yup.string().required('NInventario es requerido'),
  PrecioLista1: Yup.string().required('PrecioLista1 es requerido'),
  PrecioLista2: Yup.string().required('PrecioLista2 es requerido'),


})
const formSchema2 = Yup.object().shape({
  
  nombre2: Yup.string().required('Nombre requerido'),
  id_modelo2: Yup.string(),
  id_categorias2: Yup.string().required('id_categorias es requerido'),
  precio_compra2: Yup.string().required('Precio de compra es requerido'),
  fecha_compra2: Yup.string().required('Fecha de compra es requerido'),
  fact_compra2: Yup.string().required('Numero Factura es requerido'),
  id_proveedores2: Yup.string().required('Proveedores es requerido'),
  NInventario2: Yup.string().required('NInventario es requerido'),
  PrecioLista12: Yup.string().required('PrecioLista1 es requerido'),
  PrecioLista22: Yup.string().required('PrecioLista2 es requerido'),

})

const Maquinaria: FC = () => {
  const baseUrl = 'https://crisalex.cl/api/?metodo=maquinaria'

  const [data, setData] = useState<any[]>([]);
  const [categoriaModal, setCategoriaModal] = useState([])
  const [modeloModal, setModeloModal] = useState([])
  const [proveedorModal, setProveedorModal] = useState([])
  const [marcaModal, setMarcaModal] = useState([])
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [variableMarca, setvariableMarca] = useState()
 

 

  const [selectedData, setselectedData] = useState({
    id: '',
    nombre: '',
    id_modelo: '',
    id_categorias:'',
    precio_compra:'',
    fecha_compra:'',
    fact_compra:'',
    id_proveedores: '',
    NInventario: '',
    PrecioLista1: '',
    PrecioLista2: '',
 

  })
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values: {id: any; nombre: any; id_modelo: any; id_categorias: any; precio_compra: any; fecha_compra: any; fact_compra: any; id_proveedores: any; NInventario: any; PrecioLista1: any; PrecioLista2: any;}) => {
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
  const peticionPost = async (values: {id: any; nombre: any; id_modelo: any; id_categorias: any; precio_compra: any; fecha_compra: any; fact_compra: any;  id_proveedores: any; NInventario: any; PrecioLista1: any; PrecioLista2: any;}) => {
    var f = new FormData()
    f.append('id', values.id)
    f.append('nombre', values.nombre)
    f.append('id_modelo', values.id_modelo)
    f.append('id_categorias', values.id_categorias)
    f.append('precio_compra', values.precio_compra)
    f.append('fecha_compra', values.fecha_compra)
    f.append('fact_compra', values.fact_compra)
    f.append('id_proveedores', values.id_proveedores)
    f.append('NInventario', values.NInventario)
    f.append('PrecioLista1', values.PrecioLista1)
    f.append('PrecioLista2', values.PrecioLista2)
    f.append('id_estado', "1")
    f.append('METHOD', 'POST')

    var categoriavariable;
    categoriaModal.forEach((d: any) => {
      if(d['id']==values.id_categorias){
        categoriavariable=d['nombre']
      }  
    }) 

    var modelovariable;
    modeloModal.forEach((d: any) => {
      if(d['id']==values.id_modelo){
        modelovariable=d['nombre']
      }  
    }) 

    var proveedorvariable;
    proveedorModal.forEach((d: any) => {
      if(d['id']==values.id_proveedores){
        proveedorvariable=d['razonSocial']
      }  
    }) 
    
    var marcavariable;
    marcaModal.forEach((d: any) => {
      if(d['id']==variableMarca){
        marcavariable=d['nombre']
      }  
    }) 

    const table2 = {
      id: values.id ,
      Nombre: values.nombre,
      Modelo: modelovariable,
      Proveedor: proveedorvariable,
      NInventario:  values.NInventario,
      PrecioLista1: values.PrecioLista1,
      PrecioLista2: values.PrecioLista2,
      Marca:marcavariable,
      Estado: "Disponible",
      Categoria:categoriavariable
    }

    await axios
      .post(baseUrl, f)
      .then((response) => {
        setData(data.concat(table2))
        console.log(response.data);
        setTimeout(() => {
          abrirCerrarModalInsertar()
          setLoading(false)
          swlSuccess('creado')
          peticionGet()

          formik.resetForm()
        }, 1000)
      })
      .catch((error) => {
        swlErr()
        console.log(error)
      })
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

  const peticionGetSelectModal = async (variable: string) => {
    var url='https://crisalex.cl/api/?metodo='+variable;  
    await axios
      .get(url)
      .then((response) => {
        if(variable=="categoria"){
          setCategoriaModal(response.data)

        }
        if(variable=="modelo"){
          setModeloModal(response.data)

        }
        if(variable=="proveedor"){
          setProveedorModal(response.data)

        }
        if(variable=="marcas"){
          setMarcaModal(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const seleccionarFramework = (data: any, caso: string) => {
    setselectedData(data)
    initialValues2.id2 = data.id
    initialValues2.nombre2 = data.nombre
    initialValues2.id_modelo2 = data.id_modelo
    initialValues2.id_categorias2 = data.id_categorias
    initialValues2.precio_compra2 = data.precio_compra
    initialValues2.fecha_compra2 = data.fecha_compra
    initialValues2.fact_compra2 = data.fact_compra
    initialValues2.id_proveedores2 = data.id_proveedores
    initialValues2.NInventario2 = data.NInventario
    initialValues2.PrecioLista12 = data.PrecioLista1
    initialValues2.PrecioLista22 = data.PrecioLista2

    caso === 'Editar' ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const peticionPut = async (values: {id2: any; nombre2: any; id_modelo2: any; id_categorias2: any; precio_compra2: any; fecha_compra2: any; fact_compra2: any; id_proveedores2: any; NInventario2: any; PrecioLista12: any; PrecioLista22: any;}) => {
    var f = new FormData()
    f.append('id', values.id2)
    f.append('nombre', values.nombre2)
    console.log(values.nombre2)
    f.append('id_modelo', values.id_modelo2)
    console.log(values.id_modelo2)
    f.append('id_categorias', values.id_categorias2)
    console.log(values.id_categorias2)
    f.append('precio_compra', values.precio_compra2)
    console.log(values.precio_compra2)
    f.append('fecha_compra', values.fecha_compra2)
    console.log(values.fecha_compra2)
    f.append('fact_compra', values.fact_compra2)
    console.log(values.fact_compra2)
    f.append('id_proveedores', values.id_proveedores2)
    f.append('NInventario', values.NInventario2)
    f.append('PrecioLista1', values.PrecioLista12)
    f.append('PrecioLista2', values.PrecioLista22)
    
    f.append('METHOD', 'PUT')
    console.log(values)
    await axios
      .post(baseUrl, f, {params: {id: selectedData.id}}).then((response) => {
        console.log(baseUrl, f, {params: {id: selectedData.id}});
        var dataNueva = data
        dataNueva.forEach((vairbale: any) => {
          if (vairbale.id === selectedData.id) {
            vairbale.Nombre = values.nombre2
            console.log(values.nombre2);
            vairbale.id_modelo = values.id_modelo2
            vairbale.id_categorias = values.id_categorias2
            vairbale.precio_compra = values.precio_compra2
            vairbale.fecha_compra = values.fecha_compra2
            vairbale.fact_compra = values.fact_compra2
            
            proveedorModal.forEach((d: any) => {
              if(d['id']==values.id_proveedores2){
                vairbale.Proveedor =d['razonSocial']
              }  
            })
            
            marcaModal.forEach((d: any) => {
              if(d['id']==variableMarca){
                vairbale.Marca=d['nombre']
              }  
            }) 
           
            categoriaModal.forEach((d: any) => {
              if(d['id']==values.id_categorias2){
                vairbale.Categoria=d['nombre']
              }  
            }) 
         
            modeloModal.forEach((d: any) => {
              if(d['id']==values.id_modelo2){
                vairbale.Modelo=d['nombre']
              }  
            }) 
            console.log(response.data);
            vairbale.NInventario = values.NInventario2
            vairbale.PrecioLista1 = values.PrecioLista12
            vairbale.PrecioLista2 = values.PrecioLista22
          }
        })
        setData([]);
        setData(dataNueva)
        setTimeout(() => {
          abrirCerrarModalEditar()
          setLoading2(false)
          swlSuccess('actualizado')
          peticionGet()
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
      console.log(response.data);
      setData(data.filter((vairbale: any)=>vairbale.id!==selectedData.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }


  useEffect(() => {
    peticionGet()
    peticionGetSelectModal("categoria")
    peticionGetSelectModal("proveedor")
    peticionGetSelectModal("marcas")
  }, [])

  const peticionGetSelectModalModelo = async (variable: string, id: string) => {
    var url='https://crisalex.cl/api/?metodo='+variable+"&id="+id;  
    await axios
      .get(url)
      .then((response) => {
        setModeloModal(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const modeloSelect=(marca: any) => {
    setvariableMarca(marca);
  
    peticionGetSelectModalModelo("modelomarca",marca)
  }

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
            Agregar Equipo
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
            <h1 className='mb-3'>Crear Equipo</h1>

            <div className='text-muted fw-bold fs-5'>Ingresar los campos para generar el equipo</div>
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
              <label htmlFor='exampleFormControlInput1' >
                Marca
              </label>
              <select aria-label="Select example" className= 'form-select form-select-solid' 
                
                onChange={(e) => {modeloSelect(e.currentTarget.value)}}
                >
              <option>Selecciona una Marca</option>    
              {marcaModal.map(d =>
              <option key={d['id']} value={d['id']}>{d['nombre']}</option>
              )};
              </select>
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Modelo
              </label>
              <select aria-label="Select example" 
               {...formik.getFieldProps('id_modelo')}
                
                name='id_modelo'
                onChange={formik.handleChange}
                value={formik.values.id_modelo}
                className={clsx(
                  'form-select form-select-solid',
                  {'is-invalid': formik.touched.id_modelo && formik.errors.id_modelo},
                  {
                    'is-valid': formik.touched.id_modelo && !formik.errors.id_modelo,
                  }
                )}>
              <option>Selecciona un Modelo</option>    
              {modeloModal.map(d =>
              <option key={d['id']} value={d['id']}>{d['nombre']}</option>
              )};

              </select>
             
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
              <option>Selecciona una Categoria</option>
              {categoriaModal.map(d =>
              <option key={d['id']} value={d['id']}>{d['nombre']}</option>
              )};

              </select>
             
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Precio Compra
              </label>
              <input
                {...formik.getFieldProps('precio_compra')}
                type='text'
                name='precio_compra'
                onChange={formik.handleChange}
                value={formik.values.precio_compra}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.precio_compra && formik.errors.precio_compra},
                  {
                    'is-valid': formik.touched.precio_compra && !formik.errors.precio_compra,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                fecha Compra
              </label>
              <input
                {...formik.getFieldProps('fecha_compra')}
                type='date'
                name='fecha_compra'
                onChange={formik.handleChange}
                value={formik.values.fecha_compra}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.fecha_compra && formik.errors.fecha_compra},
                  {
                    'is-valid': formik.touched.fecha_compra && !formik.errors.fecha_compra,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Nº Factura de Compra
              </label>
              <input
                {...formik.getFieldProps('fact_compra')}
                type='text'
                name='fact_compra'
                onChange={formik.handleChange}
                value={formik.values.fact_compra}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.fact_compra && formik.errors.fact_compra},
                  {
                    'is-valid': formik.touched.fact_compra && !formik.errors.fact_compra,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Proveedor
              </label>
              <select aria-label="Select example" 
               {...formik.getFieldProps('id_proveedores')}
                
                name='id_proveedores'
                onChange={formik.handleChange}
                value={formik.values.id_proveedores}
                className={clsx(
                  'form-select form-select-solid',
                  {'is-invalid': formik.touched.id_proveedores && formik.errors.id_proveedores},
                  {
                    'is-valid': formik.touched.id_proveedores && !formik.errors.id_proveedores,
                  }
                )}>
              <option>Selecciona un Proveedor</option>
              {proveedorModal.map(d =>
              <option key={d['id']} value={d['id']}>{d['razonSocial']}</option>
              )};

              </select>
             
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
                value={formik2.values.nombre2 || ''}
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
              <label htmlFor='exampleFormControlInput1' >
                Marca
              </label>
              <select aria-label="Select example" 
                      className= 'form-select form-select-solid' 
                      onChange={(e) => {modeloSelect(e.currentTarget.value)}}
                >
              <option>Selecciona una Marca</option>    
              {marcaModal.map(d =>
              <option key={d['id']} value={d['id']}>{d['nombre']}</option>
              )};
              </select>
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Modelo
              </label>
              <select aria-label="Select example" 
               {...formik2.getFieldProps('id_modelo2')}
                
                name='id_modelo2'
                onChange={formik2.handleChange}
                value={formik2.values.id_modelo2}
                className={clsx(
                  'form-select form-select-solid',
                  {'is-invalid': formik2.touched.id_modelo2 && formik2.errors.id_modelo2},
                  {
                    'is-valid': formik2.touched.id_modelo2 && !formik2.errors.id_modelo2,
                  }
                )}>
              <option>Selecciona un Modelo</option>
              {modeloModal.map(d =>
              <option key={d['id']} value={d['id']}>{d['nombre']}</option>
              )};

              </select>
             
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Categoria
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
              <option value="">Selecciona un Categoría</option>
              {categoriaModal.map(d =>
              <option key={d['id']} value={d['id']}>{d['nombre']}</option>
              )};

              </select>
             
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Precio Compra
              </label>
              <input
                {...formik2.getFieldProps('precio_compra2')}
                type='text'
                name='precio_compra2'
                onChange={formik2.handleChange}
                value={formik2.values.precio_compra2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.precio_compra2 && formik2.errors.precio_compra2},
                  {
                    'is-valid': formik2.touched.precio_compra2 && !formik2.errors.precio_compra2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                fecha Compra
              </label>
              <input
                {...formik2.getFieldProps('fecha_compra2')}
                type='date'
                name='fecha_compra2'
                onChange={formik2.handleChange}
                value={formik2.values.fecha_compra2 || ''}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.fecha_compra2 && formik2.errors.fecha_compra2},
                  {
                    'is-valid': formik2.touched.fecha_compra2 && !formik2.errors.fecha_compra2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Nº Factura de Compra
              </label>
              <input
                {...formik2.getFieldProps('fact_compra2')}
                type='text'
                name='fact_compra2'
                onChange={formik2.handleChange}
                value={formik2.values.fact_compra2}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik2.touched.fact_compra2 && formik2.errors.fact_compra2},
                  {
                    'is-valid': formik2.touched.fact_compra2 && !formik2.errors.fact_compra2,
                  }
                )}
              />
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Proveedor
              </label>
              <select aria-label="Select example" 
               {...formik2.getFieldProps('id_proveedores2')}
                
                name='id_proveedores2'
                onChange={formik2.handleChange}
                value={formik2.values.id_proveedores2}
                className={clsx(
                  'form-select form-select-solid',
                  {'is-invalid': formik2.touched.id_proveedores2 && formik2.errors.id_proveedores2},
                  {
                    'is-valid': formik2.touched.id_proveedores2 && !formik2.errors.id_proveedores2,
                  }
                )}>
                <option value="">Seleccione proveedor</option>
                  {proveedorModal.map(d =>
                <option key={d['id']} value={d['id']}>{d['razonSocial']}</option>
              )};

              </select>
             
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
