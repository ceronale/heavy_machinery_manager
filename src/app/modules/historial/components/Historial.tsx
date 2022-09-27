import {FC, useState, useEffect, forwardRef} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import axios from 'axios'
import {Modal} from 'reactstrap'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import Build from '@material-ui/icons/Build'

import MaterialTable, {Icons} from '@material-table/core'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import {ExportCsv, ExportPdf} from '@material-table/exporters'

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
  Build: forwardRef<SVGSVGElement>((props, ref) => <Build {...props} ref={ref} />),
}

/* Variables Iniciales de los modal insertar */
const columns = [
  {title: 'Id', field: 'id'},
  {title: 'Equipo', field: 'Nombre'},
  {title: 'Marca', field: 'Marca'},
  {title: 'Modelo', field: 'Modelo'},
  {title: 'Categoria', field: 'Categoria'},
  {title: 'NºInventario', field: 'NInventario'},
  {title: 'Usuario Mantencion', field: 'Usuario'},
  {title: 'Fecha Mantencion', field: 'Fecha'},
  {title: 'Observacion', field: 'Observacion'},
]

const columns2 = [
  {title: 'Repuesto', field: 'Repuesto'},
  {title: 'Observacion', field: 'Observacion'},
  {title: 'Fecha', field: 'Fecha'},
  {title: 'Valor', field: 'Valor'},
]

const Historial: FC = () => {
  const baseUrl = 'https://crisalex.cl/api/?metodo=historialmantencion'
  const [data, setData] = useState([])
  const [repuestosData, setRepuestosData] = useState([])
  const [modalTabla, setModalTabla] = useState(false)
  const [valorTotal, setValorTotal] = useState(String)

  const modalRepuesto = (id: String) => {
    peticionGetRepuestosMantencion(id)
    abrirCerrarModalTabla()
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

  const abrirCerrarModalTabla = () => {
    setModalTabla(!modalTabla)
  }

  const peticionGetRepuestosMantencion = async (id: String) => {
    var data
    await axios
      .get('https://crisalex.cl/api/?metodo=mantencionrepuestos&id=' + id)
      .then((response) => {
        setRepuestosData(response.data)
            
        
        var v = 0
        response.data.forEach((vairbale: any) => {
          
          v = v + parseInt(vairbale.Valor)
        })
        setValorTotal(v.toString())
      })
      .catch((error) => {
        console.log(error)
      })
    return data
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
        ></div>
      </div>

      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={data}
        title='Historial de Mantenimiento'
        actions={[
          {
            icon: Build,
            tooltip: 'Ver repuestos',
            onClick: (event, rowData) => modalRepuesto(rowData.id),
          },
        ]}
        options={{
          headerStyle: {
            fontSize: '17px',
          },
          filtering: true,
          exportMenu: [
            {
              label: 'Exportar PDF',
              exportFunc: (cols, x) => ExportPdf(cols, data, 'Historial'),
            },
            {
              label: 'Exportar CSV',
              exportFunc: (cols, x) => ExportCsv(cols, data, 'Historial'),
            },
          ],
        }}
        localization={{
          header: {
            actions: 'Ver repuestos',
          },
          toolbar: {
            searchPlaceholder: 'Buscar',
          },
        }}
      />

      <Modal size='xl' isOpen={modalTabla} scrollable>
        <div className='modal-header  pb-1 border-1 justify-content-end'>
          <div
            className='btn btn-sm btn-icon btn-active-color-primary'
            onClick={() => abrirCerrarModalTabla()}
          >
            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
          </div>
        </div>
        <div className='text-center mb-13'>
            <h1 className='mb-3'>Valor Total</h1>

            <div className='text-muted fw-bold fs-5'> ${valorTotal}</div>
          </div>
        <div className=' scroll-y row gy-5 gx-xl-8'>
          <MaterialTable
            icons={tableIcons}
            columns={columns2}
            data={repuestosData}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                fontSize: '17px',
              },
              detailPanelType: 'single',
            }}
            title='Equipos Arrendados'
          />


        </div>
      </Modal>
    </div>
  )
}

export {Historial}
