import React from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import LoadingIcon from "assets/img/extra/loading.gif";
import { chartExample1 } from 'variables/charts';
export const LineChart_TrendAnalysis = ({ item, thisDataset }) => {
  return (
    <Card style={{ height: '20em' }}>
      <CardHeader>
        <CardTitle tag='h6'>{item} Trend</CardTitle>
      </CardHeader>
      <CardBody>
        {Object.keys(thisDataset).length !== 0 ? (
          <Line data={thisDataset} options={chartExample1.options} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img style={{ width: '4em', marginTop: '-3em' }} src={LoadingIcon} />
          </div>
        )}
      </CardBody>
    </Card>
  );
};