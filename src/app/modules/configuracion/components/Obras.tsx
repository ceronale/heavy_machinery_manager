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
import { ExportCsv,ExportPdf } from '@material-table/exporters'

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

  { title: "Cliente", field: "cliente" },
  { title: "Obra", field: "nombre" },

]

const initialValues = {
  id: '',
  nombre: '',
  id_cliente:''
  
}
const initialValues2 = {
  id2: '',
  nombre2: '',
  id_cliente2:''
}

const formSchema = Yup.object().shape({
  id_cliente: Yup.string().required('cliente es requerido'),
  nombre: Yup.string().required('Obra es requerido'),

})
const formSchema2 = Yup.object().shape({
  
  id_cliente2: Yup.string().required('cliente es requerido'),
  nombre2: Yup.string().required('Obra es requerido'),
})

const swlSuccess = (text: any) => {
  Swal.fire(
    'Obra '+ text,
    'La obra ha sido '+ text +' exitosamente',
    'success'
  )
}
const swlErr = () => {
  Swal.fire(
    'Error',
    'Algo sali?? mal',
    'error'
  )
}

const Obras: FC = () => {
  
  const baseUrl = 'https://crisalex.cl/api/?metodo=obra'
  const [data, setData] = useState([])
  const [clienteModal, setClienteModal] = useState([])
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  

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
    formik2.resetForm()
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
        peticionGet()
        setTimeout(() => {
          abrirCerrarModalInsertar()
          setLoading(false)
          formik.resetForm()
          swlSuccess('creada')
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
    console.log(values)
    await axios
      .post(baseUrl, f, {params: {id: selectedData.id}})
      .then((response) => {
        var dataNueva = data
        dataNueva.forEach((vairbale: any) => {

          if (vairbale.id === selectedData.id) {
            vairbale.nombre = values.nombre2
            vairbale.id_cliente = values.id_cliente2
          }
        })
        setData([]);
        setData(dataNueva)
        setTimeout(() => {
          abrirCerrarModalEditar()
          setLoading2(false)
          peticionGet()
          formik2.resetForm()
          swlSuccess('actualizada')
        }, 1000)
      })
      .catch((error) => {
        swlErr()
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
      swlSuccess('eliminada')
    }).catch(error=>{
      console.log(error);
      swlErr()
    })
  }

  useEffect(() => {
    peticionGet()
    peticionGetSelectModal()
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
           Agregar Obra
         </a>
       </div>
     </div>
     
      
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
        </div>
        {/* end::Table container */}
      </div>
      <MaterialTable
          icons={ tableIcons }
          columns={columns}
          data={data}
          title="Obras"
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
              exportFunc: (cols, x) => ExportPdf(cols, data, 'Obras')
            },{
              label: 'Exportar CSV',
              exportFunc: (cols, x) => ExportCsv(cols, data, 'Obras')
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
              <label htmlFor='exampleFormControlInput1' >
                Cliente
              </label>
              <select
                  aria-label='Select example'
                  {...formik.getFieldProps('id_cliente')}
                  name='id_cliente'
                  onChange={formik.handleChange}
                  value={formik.values.id_cliente}
                  className={clsx(
                    'form-select form-select-solid',
                    {'is-invalid': formik.touched.id_cliente && formik.errors.id_cliente},
                    {
                      'is-valid': formik.touched.id_cliente && !formik.errors.id_cliente,
                    }
                  )}
                >
                
              <option>Selecciona una Cliente</option>    
              {clienteModal.map(d =>
              <option key={d['id']} value={d['id']}>{d['Receptor_razon']}</option>
              )};
              </select>
            </div>
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Obra
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
              <label htmlFor='exampleFormControlInput1' >
                Cliente
              </label>
              <select
                  aria-label='Select example'
                  {...formik2.getFieldProps('id_cliente2')}
                  name='id_cliente2'
                  onChange={formik2.handleChange}
                  value={formik2.values.id_cliente2}
                  className={clsx(
                    'form-select form-select-solid',
                    {'is-invalid': formik2.touched.id_cliente2 && formik2.errors.id_cliente2},
                    {
                      'is-valid': formik2.touched.id_cliente2 && !formik2.errors.id_cliente2,
                    }
                  )}
                >
                
              <option>Selecciona un Cliente</option>    
              {clienteModal.map(d =>
              <option key={d['id']} value={d['id']}>{d['Receptor_razon']}</option>
              )};
              </select>
            </div>
            
            <div className='mb-10'>
              <label htmlFor='exampleFormControlInput1' className='required form-label'>
                Obra
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
          ??Est??s seguro que deseas eliminar la obra
                <br />
          {selectedData && selectedData.nombre}?
          </h4>
        </ModalBody>
        <ModalFooter className='d-flex justify-content-center'>
          <button className='btn mx-5 btn-danger w-25' onClick={() => peticionDelete()}>
            S??
          </button>
          <button className='btn mx-5 btn-secondary w-25' onClick={() => abrirCerrarModalEliminar()}>
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export {Obras}
