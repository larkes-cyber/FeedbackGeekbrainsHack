
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, BarElement,LinearScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';



ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, BarElement, LinearScale);

const pieData = {
  labels: ['Положительные', 'Отрицательные'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19],
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
};


export const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    }
  },
};

const barLabels = ['вебинар','программа','преподаватель'];


const barData = {
  labels:barLabels,
  datasets: [
    {
      label: 'Стата',
      data: [12, 45, 23],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

console.log(faker.datatype.number({ min: 0, max: 1000 }));

const ChartView = () => {

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

    return(
      <div style={{paddingTop:"3%"}}>
        <div style={{display:"inline-flex", justifyContent:"space-between", width:"100%"}}>
           <ChartWrapper title={"Положительные/Отрицательные отзывы"}>
            <Pie 
                data={pieData} 
                options={donatOptions}
                />
           </ChartWrapper>
           <ChartWrapper title={" Релевантен/Не релевантен"}>
            <Pie 
                data={pieData} 
                options={donatOptions}
                />
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
         <Bar options={barOptions} data={barData} />
        </div>
      </div>
    )

}


const ChartWrapper = (props) => {
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}> 
      <Typography
              sx={{ display: 'inline',fontWeight: 'bold'}}
              component="span"
              variant="h6"
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