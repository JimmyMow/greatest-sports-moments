var React = require('react-native');
var YouTube = require('react-native-youtube');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} = React;

class Video extends React.Component{
   constructor(props) {
      super(props);
      this.state = {
         isReady: false,
         status: null,
         quality: null,
         error: null,
         isPlaying: false
       }
   }
   render() {
      return (
         <View>
           <YouTube
             videoId={this.props.ytid}
             play={this.state.isPlaying}
             hidden={false}
             playsInline={true}
             onReady={(e)=>{this.setState({isReady: true})}}
             onChangeState={(e)=>{this.setState({status: e.state})}}
             onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
             onError={(e)=>{this.setState({error: e.error})}}
             style={{alignSelf: 'stretch', height: 300, backgroundColor: 'black', marginVertical: 10}}
           />
         </View>
      )
   }
};

var styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

Video.propTypes = {
  ytid: React.PropTypes.string.isRequired
}

module.exports = Video;
