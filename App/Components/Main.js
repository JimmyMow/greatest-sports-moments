var React = require('react-native');
var Video = require('./Video');
var api = require('../Utils/api');
var Web_View = require('./Helpers/WebView');
var Moment = require('./Moment');
var Swipe = require('./Swipe');
var Button = require('apsl-react-native-button');
var SliderButton = require("react-native-slider-button");

var {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 55,
    backgroundColor: '#FFF'
  },
  nav: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: 50,
    position: 'absolute',
    flexDirection: 'column',
    bottom: 0,
    justifyContent: 'space-between',
    left: 0,
    right: 0,
    paddingTop: 5,
    paddingBottom: 5
  }
});

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      moments: [],
      moment: {}
    };
  }
  componentWillMount() {
    api.getMoments()
      .then((res) => {
         console.log("res: ", res);
         this.setState({
            moments: res,
            moment: res[0]
         });

      });
  }
  nextMoment(){
    api.getMoment()
      .then((res) => {
        this.state.moments.push(res[0]);
        this.state.moments.shift();
        var moment = this.state.moments[0];
        this.setState({
          moment: moment
        });
      });
  }
  render(){
    return (
      <View style={styles.mainContainer}>
        <Moment moment={this.state.moment} navigator={this.props.navigator} />
        <View style={styles.nav}>
          <SliderButton
            text={"Slide For Next Moment >>>"}
            textAnimated={true}
            stylesheet={SliderButtonStyle}
            minimumValue={0} maximumValue={100} value={0}
            minimumTrackTintColor={"rgba(0,0,0,1)"}
            maximumTrackTintColor={"rgba(0,0,0,0)"}
            onTrigger={this.nextMoment.bind(this)}/>
        </View>
      </View>
    );
  }
};

var SliderButtonStyle = StyleSheet.create({
  text:
  {
    fontSize: 14,
    color: "#000"
  },
  slider:
  {
    flex: 1,
    marginLeft: 26,
    marginRight: 26,
  },
  sliderBorder:
  {
    borderWidth: 0,
    borderRadius: 20,
    borderColor: "#FFFFFF"
  }
});

module.exports = Main;
