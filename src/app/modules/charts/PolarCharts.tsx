import axios from 'axios';
import { Chart } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { PolarArea } from 'react-chartjs-2';

Chart.defaults.font.size = 10;

export const PolarCharts = () => {

   

    const [equipo, setEquipo] = useState([])
    const [estado, setEstado] = useState([])



    const baseUrl2 = 'https://crisalex.cl/api/?metodo=salidachartgetEquipos';
  
    
    const peticionGet = async () => {
        let equipo: any = [];
        let estado: any = [];
      await axios
        .get(baseUrl2)
        .then((response) => {
          for(const dataObj of  response.data){
            console.log(dataObj)
            equipo.push(dataObj.equipo)
            estado.push(dataObj.estados)
          }
          setEquipo(equipo)
          setEstado(estado)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const data1 = {
        labels: equipo,
        datasets: [
          {
            label: '# of Votes',
            data: estado,
            backgroundColor: [
              'rgba(125, 255, 80, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 142, 22, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(125, 255, 51, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 142, 22, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
    
      };


      useEffect(() => {
        
        
        peticionGet()
        
        
      }, [])
      

    
  return (
    <div>
        <PolarArea data={data1}
            className="cursor-pointer"
            />
    </div>
  )
}
