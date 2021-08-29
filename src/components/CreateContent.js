import React, { Component } from 'react';

class CreateContent extends Component {
  render(){
    console.log('Content render')
    return (
      <article>
        <h2>Create</h2>
        <form action="/create_process" method="post"
          onSubmit={function(e){
            // 원래 form 태그는 submit되면 action으로 페이지 전환이 일어남
            // 그걸 막자!
            e.preventDefault()
            this.props.onSubmit(e.target.title.value, e.target.desc.value)
          }.bind(this)}
        >
          <p>
            <input type="text" name="title" placeholder="title"></input>
          </p>
          <p>
            <textarea name="desc" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default CreateContent;