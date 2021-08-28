import React, { Component } from 'react';
import TOC from './components/TOC';
import Content from './components/Content';
import Subject from './components/Subject';
import './App.css';


// App이라는 클래스를 만들고, react의 Component라고 하는 클래스를 상속해서 새로운 클래스를 만든다
// 즉 App이라는 컴포넌트를 만들겠다!
class App extends Component {
  
  // 컴포넌트가 실행될 때, render라는 함수가 실행되기 이전에 컴포넌트를 초기화 시켜 주고 싶은 코드는 constructor를 짜고, 그 안에다 작성
  // created, mounted같은 라이프사이클이라고 이해하면 될 듯.
  constructor(props){
    super(props);
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      welcome:{title:'welcome', desc:"hello, react"},

      subject:{title:'Web', sub:'world wide web!'},
      contents:[
        {id:1, title:"html", desc:"HTML is Hypertext"},  
        {id:2, title:"CSS", desc:"CSS is design"}, 
        {id:3, title:"JavaScript", desc:"JavaScript is for interactive"}  
      ]
    }
  }
  // 그 클래스는 render라는 메서드를 가지고 있다.
  render() {
    console.log('App render')
    var _title,_desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = this.state.contents[i].title
          _desc = this.state.contents[i].desc
          break
        }
        i = i+1;
      }
    }
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({
              mode:'welcome',
            })
          }.bind(this)}
        >
        </Subject>
        <TOC data={this.state.contents}
        onChangePage={function(id){
          this.setState({
          mode:'read',
          selected_content_id: Number(id)
        })
        }.bind(this)}
        ></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}
export default App;