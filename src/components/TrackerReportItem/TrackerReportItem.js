//react components
import React from 'react';
import {View, Text} from 'react-native';
//styles
import {styles} from './TrackerReportItemStyle';
//svg
import TimeSvg from '../../assets/svg/time.svg';

const TrackerReportItem = ({Data, titleName, TimeType, time, AMORPM}) => {
  //UI
  return (
    <View style={styles.bottomSection}>
      <View style={styles.bottomSectionHeaderView}>
        <Text style={styles.titleText}>{titleName}</Text>
      </View>
      {Data?.length > 0 ? (
        <>
          {titleName == 'Snack' ? (
            <View style={styles.bodyView}>
              {Data.map((item, index) => {
                return (
                  <>
                    <View style={styles.listTextView}>
                      <Text style={styles.listText}>
                        {`${item.foodName}  ${
                          item.Quantity ? item.Quantity : 0
                        } ounces`}
                      </Text>
                    </View>
                    {item?.start_time?.hh && item?.start_time?.mm ? (
                      <View style={styles.iconTimeSection}>
                        <View style={styles.iconTimeSectionView}>
                          <TimeSvg />
                          <Text
                            style={
                              styles.startTimeText
                            }>{`${TimeType} : ${item?.start_time?.hh}:${item?.start_time?.mm}`}</Text>
                        </View>
                        <View style={styles.AMPMView}>
                          <Text style={styles.AMPMText}>
                            {item?.start_time?.ext}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </>
                );
              })}
            </View>
          ) : (
            <View style={styles.bodyView}>
              {Data.map((item, index) => (
                <View style={styles.listTextView}>
                  <Text style={styles.listText}>
                    {`${item.foodName}  ${item.Quantity} ounces`}
                  </Text>
                </View>
              ))}
              <View style={styles.iconTimeSection}>
                <View style={styles.iconTimeSectionView}>
                  <TimeSvg />
                  <Text
                    style={
                      styles.startTimeText
                    }>{`${TimeType} : ${time}`}</Text>
                </View>
                <View style={styles.AMPMView}>
                  <Text style={styles.AMPMText}>{AMORPM}</Text>
                </View>
              </View>
            </View>
          )}
        </>
      ) : null}
    </View>
  );
};

export default React.memo(TrackerReportItem);
