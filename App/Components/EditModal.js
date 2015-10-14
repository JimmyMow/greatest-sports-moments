var React = require('react-native');
var Modal = require('react-native-modalbox');
var { Icon, } = require('react-native-icons');
var Subscribable = require('Subscribable');
var api = require('../Utils/api');

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
    flex: 1
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
   form: {
    backgroundColor: '#EEE'
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
   }
});

var EditModal = React.createClass({
   mixins: [Subscribable.Mixin],
   getInitialState: function() {
      return {
        description: this.props.moment.description,
        wiki: this.props.moment.wiki
      };
   },
   componentDidMount: function() {
      this.addListenerOn(this.props.events, 'save', this.saveMoment);
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
         <View style={styles.container}>
            <Text style={styles.message}>
              We crawl the web based on the video and do our best to find a description for the moment, but they are not always perfect. Do you have a better description for "<Text style={styles.title}>{this.props.moment.title}</Text>"?
            </Text>
            <View style={styles.form}>
              <Text style={styles.label}>
                Description
              </Text>
              <TextInput
                style={styles.description}
                onChangeText={(text) => this.setState({ description: text})}
                value={this.state.description}
                multiline={true}
              />
              <Text style={styles.label}>
                Source (URL)
              </Text>
              <TextInput
                style={styles.wiki}
                value={this.props.moment.wiki}
              />
            </View>
         </View>
      );
   }
});

module.exports = EditModal;
