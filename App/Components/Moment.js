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
    padding: 10,
    backgroundColor: '#000'
  },
  title: {
    color: '#FFF',
    fontSize: 18
  },
  description: {
    lineHeight: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 150
  },
  scroll: {
    height: 300
  }
});

class Moment extends React.Component{
   constructor(props) {
      super(props);
      this.state = {
         videoLoading: true
      };
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
               <Text style={styles.title}>{this.props.moment.title ? this.props.moment.title : ''}</Text>
               <Text>{this.state.videoLoading ? "Loading video..." : ""}</Text>
               <Video ytid={this.props.moment.ytid} />
            </View>
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
