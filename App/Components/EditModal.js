var React = require('react-native');
var Modal = require('react-native-modalbox');
var { Icon, } = require('react-native-icons');

var {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput
} = React;

var styles = StyleSheet.create({
   modal: {
      flex: 1
   },
   closeContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0
   },
   close: {
      height: 30,
      width: 30
   },
   message: {
    padding: 10,
    fontSize: 18
   },
   title: {
      fontWeight: 'bold'
   },
   label: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10
   },
   description: {
      height: 200,
      borderColor: '#FFF',
      borderWidth: 1,
      fontSize: 15,
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#FFF',
      fontWeight: '200'
   },
   wiki: {
      borderColor: '#FFF',
      borderWidth: 1,
      fontSize: 15,
      padding: 10,
      backgroundColor: '#FFF',
      fontWeight: '200'
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
   render() {
      return (
         <View>
            <TouchableHighlight
            onPress={this.closeModal.bind(this)}
            underlayColor='transparent'
            >
               <Icon
                name='fontawesome|close'
                size={30}
                color='#000'
                style={styles.close}
              />
            </TouchableHighlight>
            <Text style={styles.message}>
            GSM crawls the web based on the video and tries its best to find a description for the moment, but they are not always perfect. Do you have a better description for "<Text style={styles.title}>{this.props.moment.title}</Text>"?
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
