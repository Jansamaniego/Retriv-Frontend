import { ResponsiveLine } from '@nivo/line';

const LineGraph = ({
  data,
  leftAxisLegend,
  bottomAxisLegend,
  bottomAxisTickRotation,
  tickValues,
}) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 55, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: bottomAxisTickRotation,
      legend: bottomAxisLegend,
      legendOffset: 45,
      legendPosition: 'middle',
      tickValues: tickValues,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: leftAxisLegend,
      legendOffset: -70,
      legendPosition: 'middle',
    }}
    lineWidth={3}
    theme={{
      fontSize: '1.6rem',
    }}
    curve="monotoneX"
    pointSize={12}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'right',
        direction: 'column',
        justify: false,
        translateX: 0,
        translateY: -240,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default LineGraph;
