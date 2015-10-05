var React = require('react-native');
var Video = require('./Video');
var api = require('../Utils/api');
var Web_View = require('./Helpers/WebView');
var Moment = require('./Moment');
var Swipe = require('./Swipe');
var Button = require('apsl-react-native-button');

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
    marginTop: 65,
    backgroundColor: '#FFF'
  },
  nav: {
    backgroundColor: '#FFF',
    opacity: 0.5,
    height: 50,
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    justifyContent: 'space-between',
    left: 0,
    right: 0
  },
  nextContainer: {
    height: 50,
    backgroundColor: 'green',
    width: 50,
    borderRadius: 25
  },
  next: {
    color: 'red',
    lineHeight: 50,
    opacity: 1
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
        <Swipe />
        <Moment moment={this.state.moment} navigator={this.props.navigator} />
        <View style={styles.nav}>
          <TouchableHighlight
            onPress={this.nextMoment.bind(this)}
            underlayColor='transparent'>
            <View style={styles.nextContainer}>

            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

module.exports = Main;
