import {StyleSheet, Dimensions} from 'react-native';
import {Colors, Constant, Fonts} from '../../global';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    alignItems: 'center',
    // justifyContent: "center",
  },
  upperView: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  myPlanText: {
    fontFamily: Fonts.REGULAR,
  },
  EliteMembershipStatus: {
    backgroundColor: Colors.LEMONGREEN,
    borderWidth: 1,
    borderColor: Colors.LITEGREEN,
    borderRadius: 100,
    padding: 10,
    opacity: 0.9,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myCurrentPlan: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 20,
    opacity: 0.7,
    backgroundColor: Colors.LEMONGREEN,
    borderWidth: 1,
    borderColor: Colors.LITEGREEN,
  },
  flexRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eliteMemberActivate: {
    backgroundColor: Colors.ORANGE,
    borderRadius: 100,
    padding: 5,
    paddingHorizontal: 10,
  },
  eliteMemberActivateText: {
    fontFamily: Fonts.SEMI_BOLD,
    color: Colors.WHITE,
    fontSize: 12,
  },
  iconTextView: {
    flexDirection: 'row',
  },
  textView: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  planNameText: {
    fontFamily: Fonts.SEMI_BOLD,
  },
  planPriceText: {
    marginTop: 5,
    fontFamily: Fonts.BOLD,
    fontSize: 18,
    color: Colors.LITEGREEN,
  },
  ViewPlanText: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: Colors.LITEGREEN,
  },
  iconView: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: Colors.WHITE,
  },
  parentView: {
    backgroundColor: Colors.LITEGREEN + 'ee',
    borderRadius: 20,
    padding: 20,
    marginVertical: 5,
    alignItems: 'center',
    width: Constant.windowWidth - 40,
  },
  planTitle: {
    color: Colors.WHITE,
    fontSize: 18,
    margin: 10,
  },
  childView: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    paddingBottom: 50,
    borderRadius: 20,
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dollarText: {
    color: Colors.GREY,
    marginTop: -10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  lineStyle: {
    marginBottom: 10,
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 0.5,
    flexWrap: 'wrap',
  },
  descView: {
    width: '100%',
  },
  planDisc: {
    fontFamily: Fonts.SEMI_BOLD,
    color: Colors.GREY,
  },
  planIncludeViewStyle: {
    flexDirection: 'row',
  },
  planIncludeTextStyle: {
    fontSize: 16,
    color: Colors.GREY,
    marginBottom: 10,
    marginLeft: 10,
  },
  planView: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  planTextStyle: {
    marginLeft: 10,
  },
  radioButtonOuterCircle: {
    height: 20,
    width: 20,
    borderRadius: 100,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.LITEGREEN,
  },
  radioButtonInnerCircle: {
    height: 13,
    width: 13,
    borderRadius: 100,
    backgroundColor: Colors.LITEGREEN,
  },
  buttonView: {
    marginTop: 20,
    width: '60%',
    elevation: 4,
    borderWidth: 0.5,
    borderColor: Colors.LITEGREEN,
    backgroundColor: Colors.WHITE,
    borderRadius: 50,
  },
  buttonText: {
    padding: 5,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
    color: Colors.LITEGREEN,
  },
  loaderView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BLACK + '88',
    height: Constant.windowHeight,
    width: Constant.windowWidth,
  },
});
