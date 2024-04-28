
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, BarElement,LinearScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import LectionRepository from '../../../features/lections/LectionsRepository';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';





ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, BarElement, LinearScale);



export const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    }
  },
};

const barLabels = ['вебинар','программа','преподаватель'];

const donatOptions = {
  maintainAspectRatio: false,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: true,
      position: "bottom"
    },
  }
}

console.log(faker.datatype.number({ min: 0, max: 1000 }));

const ChartView = (props) => {

  const lectionRepository = new LectionRepository();

  const [reviewData, setReviewData] = useState(null);
  const [infoData, setInfoData] = useState(null);
  const [roleData, setRoleData] = useState(null);


  useEffect(()=>{
    if(props.id != null){
      lectionRepository.fetchLectionStatistic(props.id).then(res => {
        setReviewData(
          {
            labels: ['Положительные', 'Отрицательные'],
            datasets: [
              {
                label: '# of Votes',
                data: [res.goodRevue, res.badRevue],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
              },
            ],
          }
        )
        setInfoData(
          {
            labels: ['Информативно', 'Не информативно'],
            datasets: [
              {
                label: '# of Votes',
                data: [res.goodInformative, res.badInformative],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
              },
            ],
          }
        );
        setRoleData(
          {
          labels:barLabels,
          datasets: [
            {
              label: 'Стата',
              data: [res.tutor, res.mentor, res.org],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ],
        }
        )
      });
    }
  },[props]);

    const data = [
      { text: 'Hey', value: 1000 },
      { text: 'lol', value: 200 },
      { text: 'first impression', value: 800 },
      { text: 'very cool', value: 1000000 },
      { text: 'duck', value: 10 },
    ];


    return(
      <div style={{paddingTop:"3%", width:"97%"}}>
        <div style={{display:"inline-flex", justifyContent:"space-between", width:"100%"}}>
           <ChartWrapper title={"Положительные/Отрицательные отзывы"}>
            {reviewData != null ? 
             <Pie 
                data={reviewData} 
                options={donatOptions}
                /> : null
              }
           
           </ChartWrapper>
           <ChartWrapper title={"Релевантен/Нерелевантные"}>
            {infoData != null ?
              <Pie 
                data={infoData} 
                options={donatOptions}
                /> : null
            }
           </ChartWrapper>
        </div>
        <div style={{width:"100%", alignItems:"center", alignContent:"center", display:"flex", flexDirection:"column", marginTop:"4%"}}>
          <Typography
                sx={{ display: 'inline',fontWeight: 'bold'}}
                component="span"
                variant="h6"
                color="text.primary"
                textAlign="center"
              >
              К кому направлен (вебинар, программа, преподаватель)
          </Typography>
          {roleData != null ? <Bar options={barOptions} data={roleData} /> : null}
        </div>
        <WordCloud data={data} />
      </div>
    )

}


const ChartWrapper = (props) => {
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}> 
      <Typography
              sx={{ display: 'inline',fontWeight: 'bold'}}
              component="span"
              variant="h7"
              color="text.primary"
            >
            {props.title}
        </Typography>
        <div  
          style={{width: '200px', height:"300px"}}
        >
          {props.children}
        </div>
    </div>
  )
}

export default ChartView;