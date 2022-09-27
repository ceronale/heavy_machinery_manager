import axios from 'axios';
import { Chart } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

Chart.defaults.font.size = 10;

export const DoughnutCharts = () => {

   

    const [cliente, setCliente] = useState([])
    const [arriendo, setArriendo] = useState([])



    const baseUrl2 = 'https://crisalex.cl/api/?metodo=salidachartgetArriendos';
  
    
    const peticionGet = async () => {
        let clie: any = [];
        let arr: any = [];
      await axios
        .get(baseUrl2)
        .then((response) => {
          for(const dataObj of  response.data){
            console.log(dataObj.cliente)
            clie.push(dataObj.cliente)
            arr.push(dataObj.arriendo)
          }
          setCliente(clie)
          setArriendo(arr)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const data1 = {
        labels: cliente,
        datasets: [
          {
            label: '# of Votes',
            data: arriendo,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
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
        <Doughnut data={data1}
            className="cursor-pointer"
            />
    </div>
  )
}
