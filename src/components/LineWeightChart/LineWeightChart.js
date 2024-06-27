import React from 'react';
import {View, Text} from 'react-native';
//third parties
import {LineChart} from 'react-native-chart-kit';
import {Colors, Fonts} from '../../global';
import {windowWidth} from '../../global/Constant';

const LineWeightChart = ({Data}) => {
  //variables
  const myColor = (opacity = 1) => `rgba(146, 177, 21, ${opacity})`;
  //UI
  return (
    <View>
      {Data?.labels?.length > 0 && Data?.datasets?.length > 0 ? (
        <LineChart
          data={{
            labels: Data.labels,
            datasets: [
              {
                data: Data.datasets,
                color: myColor, // optional
              },
            ],
          }}
          // formatYLabel={() => yLabelIterator.next().value}
          width={windowWidth - 50} // from react-native
          height={300}
          yAxisSuffix={'lb'}
          verticalLabelRotation={-90}
          chartConfig={{
            backgroundColor: Colors.WHITE,
            backgroundGradientFrom: Colors.WHITE,
            backgroundGradientTo: Colors.WHITE,
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForVerticalLabels: {
              fontSize: 10,
              dx: -15,
            },
          }}
          bezier
        />
      ) : (
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 20,
            fontFamily: Fonts.SEMI_BOLD,
          }}>
          No tracking data created yet
        </Text>
      )}
    </View>
  );
};

export default React.memo(LineWeightChart);
