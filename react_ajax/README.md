# React Ajax 통신

- 외부에 있는 json 파일을 가져와서 페이지를 구성
- 링크를 클릭했을 때, 그에 해당하는 정보 표시하기.

<br/>

#### 기본 셋팅

- 목표
  - 어플리케이션이 처음 시작될 때 글 목록을 list.json 파일을 Ajax로 호출해서 그 데이터를 읽어 js를 이용하여 list 태그를 생성해 본다.
  - 각 list 링크를 클릭했을 때, 그 링크에 해당하는 json 파일을 Ajax로 호출해서 그 데이터를 근거로 article의 내용을 채워본다.

- 먼저, public 디렉토리 안에 list.json 파일 생성 (이름은 아무거나 상관없음). 또한, 링크를 클릭했을때의 요청을 위한 1,2,3.json 파일도 생성해줌.

  - AJAX 콜을 했을때, public 디렉토리 안에서 콜이 이루어짐.

  - ```react
    // list.js
    [
      {"id":1, "title": "HTML"},
      {"id":2, "title": "CSS"},
      {"id":3, "title": "JS"}
    ]
    
    //1.js
    {
      "id": "1",
      "title":"HTML",
      "desc":"HTML is ..."
    }
    
    //2.js
    {
      "id": "2",
      "title":"CSS",
      "desc":"CSS is ..."
    }
    
    //3.js
    {
      "id": "1",
      "title":"JS",
      "desc":"JS is ..."
    }
    ```

  - ```react
    //App.js
    function App() {
      return (
        <div className="App">
          <h1>WEB</h1>
          <nav>
            <ul>
              <li><a href="1">HTML</a></li>
              <li><a href="2">CSS</a></li>
              <li><a href="3">JS</a></li>
            </ul>
          </nav>
          <article>
            <h2>Welcome</h2>
            Hello, React & Ajax
          </article>
        </div>
      );
    }
    
    export default App;
    
    ```

<br/>

#### Ajax로 컴포넌트 초기화

- 초기화 시킬 컴포넌트를 정의함

  - componentDidMount : 우리 애플리케이션에 탑재되어 딱 살아나는 시점에 호출되도록 하는 컴포넌트. 즉 컴포넌트가 초기화 될 때 사용하는 최적의 메서드.

  - 즉 componentDidMount 안에 정의된 함수가 컴포넌트가 생성될 때 실행됨.

  - 이제는 Ajax로 데이터 불러와서 state 저장하고, 그 state 값을 rendering 해서 보여주는게 가능해 졌다!

  - ```react
    class Nav extends Component {
      state = {
        list: []
      }
    // 컴포넌트가 생성될 때 실행
      componentDidMount () {
        fetch('list.json')
        .then(function(result){
          // 텍스트 -> json 형태로  
          return result.json();
        })
        // 그 값을 다시 사용  
        .then(function(json){
          this.setState({list:json})
        }.bind(this))
      }
      render(){
        var listTag = [];
        for (var i=0; i<this.state.list.length; i++) {
          var li = this.state.list[i];
          listTag.push(<li key={li.id}><a href={li.id}>{li.title}</a></li>)
        }
        return (
          <nav>
            <ul>
              {listTag}
            </ul>
          </nav>
        );
      }
    }
    ```


<br/>

#### Ajax로 컴포넌트의 상태 변경하기

- 링크를 클릭했을때 그것에 해당하는 정보를 읽어서 (파일을 읽어서) 컴포넌트의 상태를 변경!

- ```react
  import React, { Component } from 'react';
  
  class Nav extends Component {
    state = {
      list: []
    }
    componentDidMount () {
      fetch('list.json')
      .then(function(result){
        return result.json();
      })
      .then(function(json){
        this.setState({list:json})
      }.bind(this))
    }
    render(){
      var listTag = [];
      for (var i=0; i<this.state.list.length; i++) {
        var li = this.state.list[i];
        listTag.push(
        <li key={li.id}>
          <a href={li.id} data-id={li.id} onClick={function(e){
            e.preventDefault();
            this.props.onClick(e.target.dataset.id)
          }.bind(this)}>
            {li.title}
          </a>
        </li>)
      }
      return (
        <nav>
          <ul>
            {listTag}
          </ul>
        </nav>
      );
    }
  }
  
  class Article extends Component {
    render(){
      return (
        <article>
          <h2>{this.props.title}</h2>
          {this.props.desc}
        </article>
      );
    }
  }
  
  
  class App extends Component {
    state = {
      article:{title:'Welcome', desc:"Hello, React & Ajax"}
    }
  
    render(){
      return (
        <div className="App">
          <h1>WEB</h1>
          <Nav onClick={function(id){
            fetch(id+'.json')
            .then(function(result){
              return result.json()
            })
            .then(function(json){
              this.setState({article:{
                title: json.title,
                desc: json.desc
              }})
            }.bind(this))
          }.bind(this)}></Nav>
          <Article title={this.state.article.title} desc={this.state.article.desc}></Article>
        </div>
      );
    }
  }
  
  export default App;
  ```

- fetch

  - 대표적인 비동기 함수임!

- fetch 사용 예시

  - ```react
    async function fetchAuthorName(postId) {
      const postResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const post = await postResponse.json();
      const userId = post.userId;
      const userResponse = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const user = await userResponse.json();
      return user.name;
    }
    
    fetchAuthorName(1).then((name) => console.log("name:", name));
    ```



<br/>

#### 프리젠테이션 컨테이너에서 데이터 종속성을 제거하기

- 재사용성을 높히기 위해 컴포넌트의 종속성을 없앨 수 있다.

  - componentDidMount() 함수 내에서 fetch 함수를 사용하면 컴포넌트가 내부적으로 Ajax 호출하는 기능까지 가지기 때문에 상당히 많은 기능을 갖고 있는 컴포넌트가 됨.
  - 근데, 이렇게 기능이 많아지게 되면 다른데서 재활용하기가 힘들어진다. 너무 딱 맞춰지니까?

- 즉, 재활용을 위해 종속되지 않도록 할 수 있다.

- ```react
  import React, { Component } from 'react';
  
  class Nav extends Component {
  
    render(){
      var listTag = [];
      for (var i=0; i<this.props.list.length; i++) {
        var li = this.props.list[i];
        listTag.push(
        <li key={li.id}>
          <a href={li.id} data-id={li.id} onClick={function(e){
            e.preventDefault();
            this.props.onClick(e.target.dataset.id)
          }.bind(this)}>
            {li.title}
          </a>
        </li>)
      }
      return (
        <nav>
          <ul>
            {listTag}
          </ul>
        </nav>
      );
    }
  }
  
  class Article extends Component {
    render(){
      return (
        <article>
          <h2>{this.props.title}</h2>
          {this.props.desc}
        </article>
      );
    }
  }
  
  
  class App extends Component {
    state = {
      article:{title:'Welcome', desc:"Hello, React & Ajax"},
      list: []
  
    }
    componentDidMount () {
      fetch('list.json')
      .then(function(result){
        return result.json();
      })
      .then(function(json){
        this.setState({list:json})
      }.bind(this))
    }
    render(){
      return (
        <div className="App">
          <h1>WEB</h1>
          <Nav list={this.state.list} onClick={function(id){
            fetch(id+'.json')
            .then(function(result){
              return result.json()
            })
            .then(function(json){
              this.setState({article:{
                title: json.title,
                desc: json.desc
              }})
            }.bind(this))
          }.bind(this)}></Nav>
          <Article title={this.state.article.title} desc={this.state.article.desc}></Article>
        </div>
      );
    }
  }
  
  export default App;
  
  ```



<br/>

#### 로딩 중 기능 구현

- Ajax 기능을 통해 서버랑 통신하는 동안 사용자에게는 조금 답답한 시간이 있을 수도 있다.
- 로딩중이다라는 것을 사용자에게 알려주는 기능이 필요할 것임.
- 실습에서는, isLoading이라는 state를 만들고, NowLoading 이라는 컴포넌트를 만들어 이런 로딩 기능을 구현하도록 함.
  - isLoading이라는 state를 사용하여 조건문을 처리함으로써 적절히 활용할 수 있다.

```react
import React, { Component } from 'react';

class Nav extends Component {

  render(){
    var listTag = [];
    for (var i=0; i<this.props.list.length; i++) {
      var li = this.props.list[i];
      listTag.push(
      <li key={li.id}>
        <a href={li.id} data-id={li.id} onClick={function(e){
          e.preventDefault();
          this.props.onClick(e.target.dataset.id)
        }.bind(this)}>
          {li.title}
        </a>
      </li>)
    }
    return (
      <nav>
        <ul>
          {listTag}
        </ul>
      </nav>
    );
  }
}

class Article extends Component {
  render(){
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

class NowLoading extends Component {
  render(){
    return (
      <div>
        Now Loading...
      </div>
    )
  }
}

class App extends Component {
  state = {
    article:{
      item: {title:'Welcome', desc:"Hello, React & Ajax"},
      isLoading: false
    },
    list: {
      items: [],
      isLoading: false
    }

  }
  componentDidMount () {
    var new_list = Object.assign({}, this.state.list, {isLoading:true})
    this.setState({list:new_list})
    fetch('list.json')
    .then(function(result){
      return result.json();
    })
    .then(function(json){
      this.setState({list:{
        items: json,
        isLoading: false
      }})
    }.bind(this))
  }
  render(){
    var NavTag = null;
    if (this.state.list.isLoading) {
      NavTag = <NowLoading></NowLoading>
    } else {
      NavTag = <Nav list={this.state.list.items} onClick={function(id){
        var newArticle = Object.assign({}, this.state.article, {isLoading:true});
        this.setState({article:newArticle})

        fetch(id+'.json')
        .then(function(result){
          return result.json()
        })
        .then(function(json){
          this.setState({article:{
            item:{
              title: json.title,
              desc: json.desc
            },
            isLoading: false,
          }})
        }.bind(this))
      }.bind(this)}></Nav>
    }

    var ArticleTag = null;
    if (this.state.article.isLoading) {
      ArticleTag = <NowLoading></NowLoading>
    } else {
      ArticleTag = <Article title={this.state.article.item.title} desc={this.state.article.item.desc}></Article>
    }

    return (
      <div className="App">
        <h1>WEB</h1>
        {NavTag}
        {ArticleTag}
      </div>
    );
  }
}

export default App;

```

