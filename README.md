# React (생활코딩)

## Intro

#### 공부 전략

- 전체를 훑는게 아니고 처음, 중간, 끝만
- 처음 (코딩) -> 중간 (실행) -> 끝(배포)

<br/>

#### 개발환경 세팅

1. npm 설치
   - `nodejs.org`에서 LTS 버전 설치
   - npm 관련 (`seomal.org` 참고: npm을 다루는 기본적인 방법)
2. `npm install -g create-react-app` 명령으로 설치
   - 공식문서에는 `npx create-react-app` 으로 설치하라고 함.
   - npx는 npm과 다르게 실행할 때 마다 설치한다는 뜻임.(사용할 때 마다 최신 버전을 사용할 수 있음)
3. create-react-app을 이용해서 개발환경 구축 (리액트 앱 만들기)
   - 디렉토리 하나 생성하고, 그 안에 들어가서 `create-react-app .`
   - 배쉬로 해도 되고, vscode 열어서 해도됨.
4. `npm run start` or `npm start `로 실행 가능

※ 만약, create-react-app으로 만들었을때, App.js 파일이 함수 형태로 되어 있을 경우 class 형태로 바꿔준다

```react
// react라고 하는 라이브러리에서 Component라고 하는 클래스를 로딩. React는 꼭 필수적으로 넣어줘야하는것.
import React, { Component } from 'react';
import './App.css';

// App이라는 클래스를 만들고, react의 Component라고 하는 클래스를 상속해서 새로운 클래스를 만든다
// 즉 App이라는 컴포넌트를 만들겠다!
class App extends Component {
  // 그 클래스는 render라는 메서드(함수)를 가지고 있다.
  // class 안에 들어있는 함수는 function 키워드 생략 가능
  render() {
    return (
      <div className="App">
        Hello, React!!
      </div>
    );
  }
}
// 외부에서 사용할 수 있도록
export default App;
```



<br/>

#### JavaScript 코딩하는 법

- 디렉토리 설명
  - public : index.html 파일이 있는곳
    - `npm runs start`를 했을 때 파일을 찾는 document 루트임.
    - index.html 파일에서, id="root" 부분 중요. 컴포넌트들은 그 태그 안에 들어가게 됨.
  - src : id = "root" 태그 안에 들어가는 컴포넌트들을 작성하는 디렉토리.
    - 진입 파일(entry file) : index.js
      - document.getElementById('root') 를 기반으로 index.html 파일
      - `import App from './App'` 과 ReactDom.render(<App/>)에서 나오는 App 이름은 동일해야함.

- 반드시 하나의 태그 안쪽에 나머지 태그가 있어야함 (vue의 template 작성하는 것과 동일함.)

<br/>

#### CSS 코딩하는 법

- index.js 파일에 보면 `import './index.css';`라는 부분이 있음
- index.css에 이제 작성하면 자동으로 적용이 될 것임.

<br/>

<br/>

## 배포하는 법

#### 빌드

- 빌드 : `npm run build` 명령 실행하면 build라는 파일이 생성됨!
- build 파일에서 공백과 같이 불필요한 정보들을 싹 없앤 index.html 파일 확인 가능.
- 실제 서비스 할 때는 build 안에 있는 파일들을 사용해야함.
- 웹서버의 document root. 즉 웹서버가 문서를 찾는 최상위 디렉토리에다가 build 디렉토리 안쪽에 있는 파일들을 위치시키면 됨.
- 그럼 실 서버 환경이 완성 된 것.

<br/>

#### 간단히 해보기

- `npm install -g serve` or `npx serve -s build`
  - npm을 통해 설치할 수 있는 간단한 웹 서버
  - npx로 실행하면 한번만 

<br/>

<br/>

## 코딩하는 법

#### 컴포넌트 만들기

- App.js에서 클래스로 컴포넌트 생성한다.

```react
class TOC extends Component {
  render(){
    return (
      <nav>
        <ul>
          <li><a href="1.html">HTML</a></li>
          <li><a href="2.html">CSS</a></li>
          <li><a href="3.html">JavaScript</a></li>
        </ul>
      </nav>
    );
  }
}
```

- 이후 App 컴포넌트(최상위 컴포넌트, 실제 코딩할때는 상위 컴포넌트가 될 것)

```react
class App extends Component {
  render() {
    return (
      <div className="App">
        <Subject></Subject>
        <TOC></TOC>
        <Content></Content>
      </div>
    );
  }
}
export default App;
```

<br/>

#### ★props★ 

- `{this.props.name}`으로 컴포넌트의 속성을 표현할 수 있음

- 위의 코드를 좀 더 깔끔하게 정리하려면 아래처럼 다시 정리할 수 있다.
- 더 효율적이다. 

```react
class Subject extends Component {
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
            {/* title, sub를 값을 바꿔줌으로써, 컴포넌트를 다시 따로 만들지 않아도 됨. 즉 재사용성이 높아짐. */}
        <Subject title="WEB" sub="world wide web!"></Subject>
        <Subject title="React" sub="For UI"></Subject>
        <TOC></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language"></Content>
      </div>
    );
  }
}
```

<br/>

#### Component 파일로 분리하기

- App.js에서 한꺼번에 작성했던 컴포넌트들을 파일로 잘라서 사용하면, 더 깔끔하게 코딩할 수 있다.

| 디렉토리에 js파일 생성                                       | 각 js 파일에서 export                                        | 상위 컴포넌트에서 import                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20210828222729185](React(생활코딩).assets/image-20210828222729185.png) | <img src="React(생활코딩).assets/image-20210828222849049.png" alt="image-20210828222849049" style="zoom:80%;" /> | ![image-20210828222813964](React(생활코딩).assets/image-20210828222813964.png) |

- 주의 할 점
  - 컴포넌트들을 js파일로 생성시, `import React, { Component } from 'react';` 필수.
- 컴포넌트.js 파일 구조

![image-20210828223024897](React(생활코딩).assets/image-20210828223024897.png)



<br/>

#### State

- props : 사용자가 컴포넌트를 사용하는 입장에서 중요한 정보
  - 함수 매개변수처럼 컴포넌트에 전달됨.
- state : props 값에 따라서 컴포넌트 내부의 구현에 필요한 데이터들
  - 함수 내에 선언된 변수처럼 컴포넌트 안에서 관리됨.
- 왜 이렇게 구분할까? 사용하는 쪽과 구현하는 쪽을 철저하게 분리시켜서 양쪽의 편의성을 각자 도모하기 위함.
- 사장과 직원개념으로 비유하면 사장=state, 직원=props로 사장이 일 목록을 만들면 직원은 목록에 있는 것을 골라서 일을 처리할 수 있지만 직원이 새로운 일을 하려면 기획안(이벤트)을 만들어 사장에게 허락을 구하는 것

![image-20210828223441308](React(생활코딩).assets/image-20210828223441308.png)

| state 사용전(props로 했을때)                                 | state 사용후                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20210828224115516](React(생활코딩).assets/image-20210828224115516.png) | ![image-20210828224235539](React(생활코딩).assets/image-20210828224235539.png) |

- 컴포넌트에서 내부적으로 사용할 상태는 state를 사용해서 관리한다.
- 상위 컴포넌트에서 state값을 하위컴포넌트의 props로 전달 가능!

- 그럼 state는 어떻게 정의할까?

```react
class App extends Component 

  constructor(props){
    super(props);
    this.state = {
      subject:{title:'Web', sub:'world wide web!'}
    }
  }

  render() {
    return (
      <div className="App">
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}></Subject>
        <TOC></TOC>
        <Content title="HI" desc="HTML is HyperText Markup Language"></Content>
      </div>
    );
  }
}
export default App;
```

- 컴포넌트가 실행될 때, render라는 함수가 실행되기 이전에 컴포넌트를 초기화 시켜 주고 싶은 코드는 constructor를 짜고, 그 안에다 작성. 개인적인 생각으로 created, mounted같은 라이프사이클이라고 이해하면 될 듯.



<br/>

#### key

- 부모에서는 state라고 하는 내부정보를 사용하고, 자식에게 그 정보를 전달할때는 props로 전달

- 먼저, li태그를 하드코딩하지말고, state를 활용하여 정리해보자

| 정리 전                                                      | 정리 후                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20210828225553124](React(생활코딩).assets/image-20210828225553124.png) | ![image-20210828225636182](React(생활코딩).assets/image-20210828225636182.png)<br />![image-20210828225649879](React(생활코딩).assets/image-20210828225649879.png)<br /><br />![image-20210828225538283](React(생활코딩).assets/image-20210828225538283.png) |

- 주의할 점은, 위와같이 element 여러개를 자동으로 생성하는 경우 key값을 설정해 줘야함 (vue에서 for문 사용해서 태그 생성할때 key값 설정한 것과 같음.)
  - `lists.push(<li key={data[i].id}><a href={"/content/" + data[i].id}>{data[i].title}</a></li>)`

<br/>

#### 이벤트

- 어떤 이벤트를 통해, state값을 바꾸어 props로 내려보내는 값을 바꾸어 동적 페이지를 작성할 수 있다. 
- state가 바뀌면, 그 state를 가지고 있는 컴포넌트의 render 함수가 다시 호출되고, 하위 컴포넌트들의 render도 다시 호출됨. 즉 화면이 다시 그려짐.
- ex) 태그 안에 `onClick={}`을 쓰면 클릭했을때의 이벤트. 대괄호 안에 function 쓰면 그 함수 실행됨.  
  - `<a href="/" onClick={function(){ alert('hi');}}>` => a 태그 클릭하면 경고창 띄움
    - 참고) a태그 내에서, function(e)로 하고 e.preventDefault() 해주면 페이지 이동 발생하지 않음. (기본적인 동작을 막는 방법)

- **State 변경하기**

  - 이벤트 function 내에서 `this.setState({ mode: 'welcome' });` 처럼 쓰면 현재 컴포넌트의 state를 변경할 수 있다. 동적으로 변경할때는 꼭 setState로 변경할 것! `this.state.mode = 'welcome'` <- 이렇게 쓰면 리액트가 바뀐걸 모름.

    - vue랑 다른 부분.

  - but, 그냥 쓰면 this 가 무엇인지 모르기 때문에 에러가 발생한다. 따라서 함수 뒤에 `.bind(this)`를 붙여준다. 바인딩을 통해 this를 묶어주는것이라고 보면 됨. this는 컴포넌트 자신임.

    - ex)  onClick={function(e){

      ​      e.preventDefault()

      ​      this.state.mode = 'welcome';

      ​     }.bind(this)}

    - this가 없을때 this 강제 주입!

- **이벤트 만들기**

  - 상위컴포넌트에서 선언한 하위 컴포넌트 태그 안에, `onChangePage={}`와 같이 이벤트를 만들어서, 클릭이 발생했을때의 동작을 정의할 수 있음.

  - 하위 컴포넌트로는 props로 전달되기 때문에, 하위 컴포넌트 정의문 안에는 `onClick={}`로 처리할 수 있음.

  - 정리하면

  - | 상위 컴포넌트                                                | 하위 컴포넌트                                                |
    | ------------------------------------------------------------ | ------------------------------------------------------------ |
    | ![image-20210829021256189](React(생활코딩).assets/image-20210829021256189.png)<br /> 2. onChangePage 함수가 호출되면, setState로 state를 변경한다! | ![image-20210829021321638](React(생활코딩).assets/image-20210829021321638.png)<br />1. onClick 이벤트가 발생하면, props로 전달된 onChangePage 함수를 호출한다! |

  - 참고 : 클릭했을떄 나오는 event 객체의 target에는 다양한 정보가 있는데, 만약 a태그 안에 `data-id = {data[i].id}` 라는 속성을 넣어주면, `-` 를 기준으로 data라는 접두사때문에 event.target.dataset으로 접근할 수 있고, id라는 접미사 때문에 event.target.dataset.id로 접근할 수 있다.

  - 정리 : 
    - 데이터 전달 : 상위 컴포넌트 > props > 하위 컴포넌트 
    - 하위 컴포넌트 > 이벤트 실행 > 상위 컴포넌트의 state 호출 > state 값 수정
    - props는 수정 불가능 (read-only) 



<br/>

#### Create 구현

- key point : render 함수 내에서 변수 선언할 때, `article = <ReadContent title={_title} desc={_desc}></ReadContent>` 와 같이 컴포넌트를 사용하여 선언할 수도 있다.

- concat : state에 값을 추가하기위해 push를 통해서도 리스트에 추가할 수 있고, concat을 사용해서도 리스트에 값을 추가할 수 있음

  - push : 원본을 바꾼다
  - concat : 원본을 바꾸지 않는다.
  - 기본적으로 state에 값을 추가하기위해서 원본을 변경하지 않게끔 하자.(특히 state가 배열일 경우)
  - 즉, push 쓰지 말고 concat을 쓰자.

- shouldComponentUpdate()

  - 글을 생성, 수정, 삭제를 할 때(바뀔때)를 제외하고는 글의 목록에 해당하는 컴포넌트의 render가 실행되는것이 좋다 안좋다?

  - 당연히 안좋다. 따라서 렌더 함수 위에 shouldComponentUpdate()라는 함수를 정의하여 이런 동작을 막을 수 있다.

  - **render 이전에 실행되며,  true가 리턴되면 render 호출됨. false로 리턴하면 render 호출 안됨.**

  - shouldComponentUpdate()는 2개의 매개변수를 받는다. 바뀌기 전 값과 바뀐 이후 값을 알 수 있다.

    - newProps.~ : 컴포넌트의 props가 바뀌었을때, 그 바뀐 값

      - this.props.~ -> 바뀌기 이전 값

    - newState : state가 바뀌었을 때, 그 바뀐 state 값

    - 만약, push로 값을 변경했다고 했을때, 원본이 바뀌어 버리면 이전과 이후 값이 모두 같다고 읽히기 때문에 아래와 같이 쓸 수 없게 된다.

      ![image-20210829190620612](React(생활코딩).assets/image-20210829190620612.png)

  - 단, 배열의 경우 `Array.from(this.state.contents)` 과 같이 Array.from을 사용하게 되면 복제할 수 있다. 따라서 이 경우에는 복제한 새로운 배열을 만드는 것이기 때문에 push를 써도 문제 없다 (원본 바꾸는게 아님! 복제본과 원본을 비교하면 같지 않은걸로 뜸.)

  - 객체의 경우 `Object.assign({},a)`와 같이 Object.assign를 통해 복제가 가능하다. 이때 첫번째 인자로는 빈 객체를 넣으면 완전 복제. 빈 객체가 아닌 어떤 값이 있는 객체를 넣어주면, 그 객체에 복사하고 싶은 객체를 추가할 수 있음. 두번째 인자로 복사하고싶은 객체를 넣어준다.

  - 너무 머리아프다? 싶으면 immutable을 설치하여 라이브러리로 사용할 수 있다. 얘를 사용하면 무조건 원본을 바꾸지 않고 원본을 복제한 결과를 바꾼 다음 그것을 return해줌. 나중에 더 찾아보자!

    ![image-20210829192152247](React(생활코딩).assets/image-20210829192152247.png)



<br/>

#### Update 구현

- react forms 참고

- 상위컴포넌트에서 하위컴포넌트로 props를 통해 바꾸는 놈의 data를 내려준다.

  - 근데, value로 props를 통해 내려받은 데이터 그대로 쓰게 되면 read-only가 되어버려서 수정이 안됨. (react 자체에서 막음)

  - 따라서 state화를 시켜줘야함.

    ![image-20210829202545960](React(생활코딩).assets/image-20210829202545960.png)

  - 근데 state로만 쓴다고 해서 되냐? 안된다. state 값을 바뀌게 해야지만 read-only가 아닌게 됨.

  - 따라서 `onChange={function(){}}`을 꼭꼭꼭! 써줘야함

    ![image-20210829202537238](React(생활코딩).assets/image-20210829202537238.png)

- update가 끝난 이후에는 

- 중요한점 : react에서 html 태그들을 활용함에 있어 실제 html 동작과 다르게 동작하는 부분이 많다. 따라서 잘 찾아가면서 적용해야한다.

- 중요한점2: 마찬가지로, state에 존재하는 배열을 변경할 때 원본을 변경하지 않고 복제 후 setState로 변경. (실습에서는 Array.from()을 사용했음) -> 원본을 바꾸지 않는 테크닉

- 추가적인 부분 : 만약 onChange 내부에서 쓰는 함수를 밖으로 render 함수 밖에서 따로 선언하여 쓰면 중복을 줄일 수 있다.

  ![image-20210829202747410](React(생활코딩).assets/image-20210829202747410.png)

  ![image-20210829202957499](React(생활코딩).assets/image-20210829202957499.png)

- 추가적인 부분2 : 근데 저기 뒤에 bind 계속 붙이는것도 귀찮다? constructor에서 선언해주면 됨!

  ![image-20210829203210982](React(생활코딩).assets/image-20210829203210982.png)

<br/>

#### Delete 구현

- 배열에서 삭제하기 위해서는 `배열.splice(시작, 몇 개)` 를 사용하면 된다.
- 마찬가지로, 원본을 바로 바꾸지 말고 복제한 후 넣어주는 방식으로 하도록 한다.
- window.confirm()을 통해 삭제할 것인가, 삭제하지 않을것인가에 대한 문구를 띄울 수 있다 (vue와 동일)

![image-20210829211507173](React(생활코딩).assets/image-20210829211507173.png)





<br/>

#### 추가

- immutable
  - 배열과 객체를 immutable하게 다루기 위해 immutable-js 라이브러리를 활용하면 배열, 객체의 대체재로 사용할 수 있음.
  - 모든 연산이 원본을 변경하지 않고, 복제된 원본을 변경한 결과를 리턴하기 때문에 더 견고하게 만들 수 있음
  - 리액트와 단짝!
- router
  - 페이지 전환. url에 따른 적당한 컴포넌트가 실행되게 할 수 있음 (vue할때 많이 해봤지?)
  - React router 설치해야함. npm으로.
- create-react-app
  - npm run eject를 실행하면 감춰진 설정들을 수정할 수 있음. 개발환경 수정 가능
  - 한번 eject하면 돌아갈 수 없음.
- redux
  - react의 컴포넌트가 많아지면 교류가 까다로워짐.
  - 중앙에 데이터 저장소를 만들어, 모든 컴포넌트는 중앙 저장소와 직접 연결됨
  - npm으로 설치해서 사용함.
  - vuex
- react server side rendering
  - 서버쪽에서 웹페이지를 완성한 후에 클라이언트로 완성된 html을 전송하는걸로 어플리케이션을 구동할 수 있음.
  - 초기 구동시간 down
- react native
  - react와 같은 방법으로 native 앱을 만들 수 있음.
  - IOS, 안드로이드



<br/>

#### React Developer Tools

- `https://reactjs.org/tutorial/tutorial.html#developer-tools`
- 설치 후 개발자 도구 열고 상위 탭에 react 클릭하면
- 우리가 만든 앱의 컴포넌트들을 볼 수 있음.