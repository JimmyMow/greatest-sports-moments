var React = require('react-native');
var Modal = require('react-native-modalbox');
var { Icon, } = require('react-native-icons');

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

class EditModal extends React.Component{
   constructor(props) {
      super(props);
      this.state = {
         isOpen: false
      };
   }
   closeModal() {
      console.log("here");
      this.props.modal.close();
   }
   onClose() {
    console.log('Modal just closed');
   }
   render() {
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
                value={this.props.moment.description}
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
}

module.exports = EditModal;
