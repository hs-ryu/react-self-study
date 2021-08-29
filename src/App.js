import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import Subject from './components/Subject';
import Controll from './components/Controll';
import UpdateContent from './components/UpdateContent'
import './App.css';


// App이라는 클래스를 만들고, react의 Component라고 하는 클래스를 상속해서 새로운 클래스를 만든다
// 즉 App이라는 컴포넌트를 만들겠다!
class App extends Component {
  
  // 컴포넌트가 실행될 때, render라는 함수가 실행되기 이전에 컴포넌트를 초기화 시켜 주고 싶은 코드는 constructor를 짜고, 그 안에다 작성
  // created, mounted같은 라이프사이클이라고 이해하면 될 듯.
  constructor(props){
    super(props);
    this.max_content_id = 3;
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
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data
      }
      i = i+1;
    }
  }
  getContent() {
    var _title,_desc,_article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent()
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        // setState를 통해 새로운 컨텐트 값을 추가해주면 됨!.
        this.max_content_id = this.max_content_id + 1;
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        // var _contents = this.state.contents.concat(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // )
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc})
        this.setState({
          contents: newContents,
          mode: 'read',
          selected_content_id: this.max_content_id
        });
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent()
      _article = <UpdateContent 
        data={_content}
        onSubmit={
        function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length) {
            if (_contents[i].id === _id) {
              _contents[i] = {id:_id, title: _title, desc: _desc}
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents: _contents,
            mode: 'read'
        });
      }.bind(this)}></UpdateContent>
    }
    return _article
  }

  // 그 클래스는 render라는 메서드를 가지고 있다.
  render() {
    console.log('App render')
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
        <Controll
          onChangeMode={function(_mode){
            if (_mode === 'delete') {
              if (window.confirm('really?')) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i += 1
                }
                this.setState({
                  contents: _contents,
                  mode: 'welcome'
                });
                alert('deleted');
              }
            } else {
              this.setState({mode: _mode});
            }

          }.bind(this)}
        >
        </Controll>
        {this.getContent()}
      </div>
    );
  }
}
export default App;