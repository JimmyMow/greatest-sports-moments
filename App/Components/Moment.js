var React = require('react-native');
var Video = require('./Video');
var api = require('../Utils/api');
var Web_View = require('./Helpers/WebView');
var Swipe = require('./Swipe');

var {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  theatreMode: {
    backgroundColor: '#FFF'
  },
  title: {
    color: '#000',
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    fontWeight: 'bold'
  },
  description: {
    lineHeight: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 75,
    marginTop: -50
  },
  scroll: {
    height: 200
  }
});

class Moment extends React.Component{
   constructor(props) {
      super(props);
   }
   openPage(url){
      this.props.navigator.push({
         title: 'Web View',
         component: Web_View,
         passProps: {url}
      });
   }
   render(){
      return (
         <View>
            <View style={styles.theatreMode}>
               <Video ytid={this.props.moment.ytid} />
            </View>
            <Text style={styles.title}>{this.props.moment.title ? this.props.moment.title : ''}</Text>
            <ScrollView style={styles.scroll}>
              <View>
              <TouchableHighlight
              onPress={this.openPage.bind(this, this.props.moment.wiki)}
              underlayColor='transparent'>
                <Text style={styles.description}>
                   {this.props.moment.description ? this.props.moment.description : ''}
                </Text>
              </TouchableHighlight>
              </View>
            </ScrollView>
         </View>
      );
   }
};

module.exports = Moment;
