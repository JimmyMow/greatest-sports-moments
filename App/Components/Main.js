var React = require('react-native');
var Video = require('./Video');
var api = require('../Utils/api');
var Web_View = require('./Helpers/WebView');
var Moment = require('./Moment');
var Swipe = require('./Swipe');
var Button = require('apsl-react-native-button');
var SliderButton = require("react-native-slider-button");
var Spinner = require('react-native-spinkit');
var { Icon, } = require('react-native-icons');

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
    backgroundColor: '#FFF',
    height: 50,
    position: 'absolute',
    flexDirection: 'column',
    bottom: 0,
    justifyContent: 'space-between',
    left: 0,
    right: 0,
    paddingTop: 7,
  },
  nextButton: {
    backgroundColor: '#000',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignSelf: 'flex-end',
    marginTop: -10,
    marginRight: 5,
    paddingBottom: 5,
    paddingTop: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  next: {
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
});

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      moments: [],
      moment: {},
      index: 0,
      type: 'Arc',
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 100,
      color: "#000",
      isVisible: true,
      isLoading: true
    };
  }
  componentWillMount() {
    api.getMoments()
      .then((res) => {
         this.setState({
            moments: res,
            moment: res[0]
         });

      });
  }
  nextMoment(){
    this.state.moments.shift();
    var moment = this.state.moments[0];
    this.setState({
      moment: moment
    });
    api.getMoment()
      .then((res) => {
        this.state.moments.push(res[0]);
      });
  }
  render(){
    return (
      <View style={styles.mainContainer}>
        <Moment moment={this.state.moment} navigator={this.props.navigator} />
        <View style={styles.nav}>
          <TouchableHighlight
          onPress={this.nextMoment.bind(this)}
          underlayColor='transparent'>
            <View style={styles.nextButton}>
              <Icon
                name='fontawesome|share'
                size={30}
                color='#FFF'
                style={styles.next}
              />
            </View>
          </TouchableHighlight>
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
