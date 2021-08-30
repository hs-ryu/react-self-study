import React, { Component } from 'react';

class Controll extends Component {
  // class 안에 들어있는 함수는 function 생략 가능
  render() {
    return (
      // 컴포넌트는 하나의 최상위 태그로 시작해야함.
      <ul>
        <li><a href="/create" onClick={function(e){
          e.preventDefault();
          this.props.onChangeMode('create')
        }.bind(this)}>create</a></li>
        <li><a href="/update" onClick={function(e){
          e.preventDefault();
          this.props.onChangeMode('update')
        }.bind(this)}>update</a></li>
        <li><input type="button" value="delete" onClick={function(e){
          this.props.onChangeMode('delete')
        }.bind(this)}></input></li>
      </ul>
    );
  }
}

export default Controll;