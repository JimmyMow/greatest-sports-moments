var React = require('react-native');
var Modal = require('react-native-modalbox');
var { Icon, } = require('react-native-icons');
var Subscribable = require('Subscribable');
var api = require('../Utils/api');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  ScrollView
} = React;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    flex: 1,
    marginTop: -50,
    marginBottom: 50
  },
   modal: {
      flex: 1
   },
   closeContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0
   },
   message: {
    padding: 10,
    fontSize: 16,
    fontWeight: '200',
    lineHeight: 22,
    letterSpacing: 0.2,
    marginTop: 50
   },
   title: {
      fontWeight: 'bold'
   },
   label: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    color: '#343434'
   },
   description: {
      height: 200,
      borderColor: '#FFF',
      borderWidth: 1,
      fontSize: 15,
      padding: 20,
      marginBottom: 10,
      backgroundColor: '#FFF',
      fontWeight: '200',
      color: '#343434'
   },
   wiki: {
      borderColor: '#FFF',
      borderWidth: 1,
      fontSize: 15,
      padding: 20,
      backgroundColor: '#FFF',
      fontWeight: '200',
      color: '#343434'
   },
   scroll: {
      height: 200
   }
});

var EditModal = React.createClass({
   mixins: [Subscribable.Mixin],
   getInitialState: function() {
      return {
        description: this.props.moment.description,
        wiki: this.props.moment.wiki,
        keyboardSpace: 0,
      };
   },
   componentDidMount: function() {
      this.addListenerOn(this.props.events, 'save', this.saveMoment);
   },
   inputFocused: function(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        true
      );
    }, 50);
  },
   scrollResponderKeyboardWillHide: function() {
    console.log('keyboard will hide');
    this.setState({keyboardSpace: 0});
   },
   saveMoment: function() {
      var data = {
        description: this.state.description,
        wiki: this.state.wiki
      };
      api.editMoment(this.props.moment.id, data)
        .then((res) => {
          this.props.update(res);
          this.setState({
            description: res.description,
            wiki: res.wiki
          });
        });
   },
   closeModal: function() {
      this.props.modal.close();
   },
   render: function() {
      return (
         <ScrollView ref='scrollView' style={[styles.container]}>
            <Text style={styles.message}>
              We crawl the web based on the video and do our best to find a description for the moment, but they are not always perfect. Do you have a better description for "<Text style={styles.title}>{this.props.moment.title}</Text>"?
            </Text>
            <Text style={styles.label}>
              Description
            </Text>
            <TextInput
              style={styles.description}
              onChangeText={(text) => this.setState({ description: text})}
              onFocus={this.inputFocused.bind(this, 'descriptionInput')}
              value={this.state.description}
              multiline={true}
              ref='descriptionInput'
            />
            <Text style={styles.label}>
              Source (URL)
            </Text>
            <TextInput
              style={styles.wiki}
              value={this.props.moment.wiki}
              onChangeText={(text) => this.setState({ wiki: text})}
              onFocus={this.inputFocused.bind(this, 'wikiInput')}
              ref='wikiInput'
            />
         </ScrollView>
      );
   }
});

module.exports = EditModal;
