import React, { Component } from 'react';

class Subject extends Component {
  // class 안에 들어있는 함수는 function 생략 가능
  render() {
    return (
      // 컴포넌트는 하나의 최상위 태그로 시작해야함.
      <header>
        <h1>
          <a href="/" 
        onClick={function(e){
          e.preventDefault();
          this.props.onChangePage();
        }.bind(this)}>
          {this.props.title}
          </a>
        </h1>
        {this.props.sub}
      </header>
    );
  }
}

export default Subject;