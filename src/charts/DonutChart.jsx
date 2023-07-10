import React from 'react';
import { chartExample5 } from 'variables/charts.js';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = props => {
  let { objKey: title, objVal: data, metric, bgColor } = { ...props };
  title = title.replace(/([A-Z])/g, ' $1');
  title = title.charAt(0).toUpperCase() + title.slice(1);
  const options = JSON.parse(JSON.stringify(chartExample5.options));
  options.plugins.title.text = data ? `${data} ${metric}` : 'Loading...';

  const chartData = {
    labels: [title, ''],
    datasets: [
      {
        // label: 'Emails',
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: [bgColor, '#f4f3ef'],
        borderWidth: 0,
        barPercentage: 1.6,
        data: data ? [data, 100 - data] : [0, 100]
      }
    ]
  };
  return (
    <Card style={{ height: '15em' }}>
      <CardHeader style={{ paddingTop: '0.2em' }}>
        <CardTitle style={{ fontSize: '1.5em', color: 'black' }}>Current {title}</CardTitle>
      </CardHeader>
      <CardBody style={{ height: '200px' }}>
        <Doughnut
          data={chartData}
          options={options}
          className='ct-chart ct-perfect-fourth'
          height={300}
          width={456}
        />
      </CardBody>
    </Card>
  );
};

export default DonutChart;