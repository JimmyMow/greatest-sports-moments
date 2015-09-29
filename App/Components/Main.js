var React = require('react-native');
var Video = require('./Video');
var api = require('../Utils/api');

var {
  Text,
  View,
  StyleSheet,
  ScrollView
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 65,
    backgroundColor: '#FFF'
  },
  theatreMode: {
    padding: 10,
    backgroundColor: '#000'
  },
  title: {
    color: '#FFF',
    fontSize: 18
  }
});

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ytid: null,
      title: null,
      description: null,
      videoLoading: true
    };
  }
  componentWillMount() {
    api.getMoment()
      .then((res) => {
        this.setState({
          ytid: res.moment.ytid,
          videoLoading: false
        });
        api.getSnippet(res.moment.ytid)
          .then((res) => {
            var title = res.items[0].snippet.title;
            this.setState({
              title: title
            });
            api.searchGoogle(title)
              .then((res) => {
                console.log(res);
                window.document.getElementsByTagName('html')[0].innerHTML = res._bodyInit;
              });

                // var parser = new DOMParser();
                // var htmlDoc = parser.parseFromString(res._bodyText, "text/html");
                // console.log(htmlDoc);
                // console.log(htmlDoc.getElementsByTagName('a'));
          });
      });
  }
  render(){
    return (
      <View style={styles.mainContainer}>
        <View style={styles.theatreMode}>
          <Text style={styles.title}>{this.state.title ? this.state.title : ''}</Text>
          <Text>{this.state.videoLoading ? "Loading video..." : ""}</Text>
          <Video ytid={this.state.ytid}/>
        </View>
        <ScrollView>
        <Text>
          {this.state.description ? this.state.description : ''}
        </Text>
        </ScrollView>
      </View>
    );
  }
};

module.exports = Main;
