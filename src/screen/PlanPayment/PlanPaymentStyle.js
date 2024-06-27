import {Colors} from 'global/index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {},
  parentView: {
    backgroundColor: '#bbe024',
    marginHorizontal: 50,
    marginVertical: 20,
    borderRadius: 20,
    justifyContent: 'center',
    height: 115,
  },
  visaCardStyles: {
    height: 30,
    resizeMode: 'contain',
  },
  childView: {
    // backgroundColor: Colors.LITEGREEN,
    height: 100,
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: -30,
    marginRight: -30,
  },
  iconStyle: {
    backgroundColor: Colors.WHITE,
    borderRadius: 100,
    padding: 5,
  },
  memberPlanView: {
    marginLeft: 20,
  },
  planTypeView: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  planTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginBottom: 10,
  },
  priceStyle: {
    color: Colors.WHITE,
    fontSize: 22,
    fontWeight: 'bold',
  },
  secondView: {
    padding: 20,
  },
  paymentOptionView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.ORANGE,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
  },
  radioButtonOuterCircle: {
    height: 25,
    width: 25,
    borderWidth: 0.5,
    borderRadius: 100,
    borderColor: Colors.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInnerCircle: {
    height: 15,
    width: 15,
    borderRadius: 100,
    backgroundColor: Colors.ORANGE,
  },
  titleStyle: {
    marginTop: 20,
  },
  creditCardText: {
    marginLeft: 30,
  },
  paymentDetail: {
    marginTop: 5,
    backgroundColor: Colors.WHITE,
    borderWidth: 0.5,
    borderColor: Colors.GREY,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  TextInputViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: Colors.GREY,
    paddingHorizontal: 10,
  },
  expiryDateandCvcView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryTextStyle: {},
  TextInput: {
    borderWidth: 0.5,
    borderRadius: 5,
    marginRight: 10,
    width: '30%',
    borderColor: Colors.GREY,
    height: 40,
  },
  termCondtionView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  termConditionText: {
    textAlign: 'center',
    fontSize: 12,
    padding: 10,
  },
});
