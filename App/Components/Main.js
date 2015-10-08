var React = require('react-native');
var Video = require('./Video');
var api = require('../Utils/api');
var Web_View = require('./Helpers/WebView');
var Moment = require('./Moment');
var Swipe = require('./Swipe');
var Button = require('apsl-react-native-button');
var Spinner = require('react-native-spinkit');
var { Icon, } = require('react-native-icons');
var EditModal = require('./EditModal');
var Modal = require('react-native-modalbox');


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
    backgroundColor: 'transparent',
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
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
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
  editButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginTop: -53,
    marginLeft: 5,
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
    color: 'rgba(255, 255, 255, 1)'
  },
  edit: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 1)'
  },
  modal: {
    flex: 1,
    backgroundColor: '#EEE'
  }
});

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      moments: [],
      moment: {},
      isLoading: true,
      isEditing: false
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
  editMoment(){
    this.refs.modal.open();
  }
  closeModal(){
    this.refs.modal.close();
  }
  render(){
    return (
      <View style={styles.mainContainer}>
        <Modal isOpen={false} style={styles.modal} ref={'modal'}>
            <EditModal moment={this.state.moment} modal={this.refs.modal} />
         </Modal>
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

          <TouchableHighlight
          onPress={this.editMoment.bind(this)}
          underlayColor='transparent'>
            <View style={styles.editButton}>
              <Icon
                name='fontawesome|pencil-square-o'
                size={30}
                color='#FFF'
                style={styles.edit}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

module.exports = Main;
