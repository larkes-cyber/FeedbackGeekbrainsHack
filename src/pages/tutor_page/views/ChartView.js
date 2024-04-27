
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);








const ChartView = () => {

     

    return(
      <div>
        <Bar options={options} data={data} />
        <Bar options={options} data={data} />
        <Bar options={options} data={data} />
        <Bar options={options} data={data} />
        <Bar options={options} data={data} />
      </div>
    )

}

export default ChartView;