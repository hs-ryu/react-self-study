import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props){
    super(props);
    this.state={
      id: this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc,
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value})
  }
  render(){
    console.log(this.props.data)
    console.log('UpdateContent render')
    return (
      <article>
        <h2>Update</h2>
        <form action="/update_process" method="post"
          onSubmit={function(e){
            // 원래 form 태그는 submit되면 action으로 페이지 전환이 일어남
            // 그걸 막자!
            e.preventDefault()
            this.props.onSubmit(this.state.id, this.state.title, this.state.desc)
          }.bind(this)}
        >
          <input type="hidden" name="id" value={this.state.id}></input>
          <p>
            <input 
              type="text" 
              name="title" 
              placeholder="title"
              value={this.state.data.title}
              onChange={this.inputFormHandler}
              ></input>
          </p>
          <p>
            <textarea 
              name="desc" 
              placeholder="description"
              value={this.state.desc}
              onChange={this.inputFormHandler}
              ></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;