# **리액트 동작 원리** 

앞에서 설명해 드렸는데 한번만 다시 복습을 해볼께요.

**리액트는 변경사항이 한가지의 방향으로만 흘러갑니다.**

**데이터가 변경이 되면 → UI가 업데이트 된다** 

위 문장을 조금만 더 풀어서 작성해 보면:

**데이터(State)가 변경이 되면 → 리액트가  render() 함수를 호출해서 UI가 업데이트 된다** 



위 문장을 이제 조금더 자세히 들어가 보도록 할께요, 시작해 볼까요? 🙌



## 예제 프로그램

![img](https://files.cdn.thinkific.com/file_uploads/292401/images/5a9/ffa/0f3/Screen_Shot_2020-11-22_at_6.43.42_am.png)여러분들이 쉽게 따라 올 수 있도록 작은 미니 컴포넌트로 예를 들어서 설명해 볼께요.

함께 살펴볼 App 컴포넌트는 단순히 버튼을 클릭하면 숫자를 하나씩 증가 시켜주는 컴포넌트예요.

![img](https://files.cdn.thinkific.com/file_uploads/292401/images/d54/e59/474/Screen_Shot_2020-11-22_at_6.43.28_am.png)



코드 상으로 보면 **클래스 컴포넌트**이고, **this.state**에는 숫자를 담을 수 있는 **count**가 들어있는 오브젝트가 있어요. 그리고 **button**이 클릭되면 **onClick** 콜백이 실행될 것이고, 거기에서 우리가 State를 업데이트 시켜 주면 되죠.



어떻게 하는것이 제일 이상적일까요?



## State를 바로 수정하는 경우 💩

![img](https://files.cdn.thinkific.com/file_uploads/292401/images/e30/249/fb4/Screen_Shot_2020-11-22_at_6.47.50_am.png)



위와 같이 **this.state.count++** 바로 this.state가 가리키고 있는 오브젝트의 count를 증가 시켜 주면 어떨까요?![img](https://files.cdn.thinkific.com/file_uploads/292401/images/d1d/e8f/845/Kapture_2020-11-22_at_06.09.14.gif)



네, 보시는것처럼 업데이트가 안되죠? 🤣

**리액트에서 제대로 상태를 업데이트 하기 위해서는 리액트에서 제공하는 setState 함수를 호출해야 해요.**

##  

## 리액트 제대로 업데이트 하기 🚀

## ![img](https://files.cdn.thinkific.com/file_uploads/292401/images/b1a/f87/c23/Kapture_2020-11-22_at_06.32.02.gif)

상태가 변할때마다(State의 데이터가 업데이트 될떄마다) 우리가 원하는대로, 의도한대로 컴포넌트를 업데이트 하기 위해서는, **리액트에서 제공하는 setState 함수를 호출해야 해요.**



## ![img](https://files.cdn.thinkific.com/file_uploads/292401/images/d74/e71/efb/Screen_Shot_2020-11-22_at_6.21.37_am.png)

위의 코드를 보시면 setState 함수를 이용해서 새로운 상태 오브젝트(업데이트 하고자 하는 상태 데이터)를 인자로 전달해 주는것을 볼 수 있죠? **리액트가 업데이트가 되어야 한다고 알아 차리게 하기 위해서는 이렇게 setState 함수를 호출해 주어야 해요.**

그렇게 해야 리액트가, 아! 상태가 업데이트 되었군, 그럼 이제 UI를 업데이트 하기 위해서 render 함수를 호출해줘야지! 라고 알아 차리게 되죠.



**리액트가 내부적으로 어떻게 하는지 조금만 더 설명해 드리면:**

setState 함수가 호출이 되면 이제 리액트는 **현재 컴포넌트가 가지고 있는 상태**와 (this.state), **업****데이트 해야 하는 새로운 상태** (setState 함수의 인자로 전달된 새로운 오브젝트) 두가지를 비교해서 **업데이트가 필요한 경우** 해당 컴포넌트의 render 함수를 호출해주죠.



**컴포넌트를 업데이트 할때 현재 컴포넌트의 상태와 새로운 상태를 비교하는 방식은:**

**PureComponent**인 경우에는 두가지를 얉게 비교 해서 (제일 상위 reference만 비교해요, shallow comparisons 기억 나시죠?), 달라진게 있다면 컴포넌트를 업데이트 하죠

일반 **Component** 경에는 따로 라이프 싸이클 메소드중 하나인 shouldComponentUpdate를 구현하지 않았다면 setState가 호출 될때마다 무조건 render 함수가 호출됩니다.



**💡 setState는 비동기 API예요.**  

webAPIs 중 하나인 setTimeout, setInterval과 같은 비동기 함수처럼, setState도 비동기 함수예요.

그말은 setState를 호출한다고 해서 무조건 바로 render 함수가 호출되는 것이 아니라, 

리액트에 업데이트 요청을 하기만 하고 다시 뒤에 이어지는 코드가 실행되어져요. 

(이런 이벤트 관련, 브라우저 동작 원리는 브라우저 101에서 자세히 다루었어요)

비동기로 동작하기 때문에 리액트가 동시 다발적으로 요청된 여러가지의 setState를 더 효율적으로 처리 할 수 있죠. 또 이런 특성때문에 뒤에 이어지는 내용이 중요하답니다.



# 정말 중요 🚨

**그리고, state를 업데이트 할때 이전 state 값에서 무언가가 계산이 되어지는 경우라면** (우리의 예제 코드)

컴포넌트 내의 state 값에 의존해서 계산한 값을 **setState(updated)**로 설정하기 보다는, **setState(prevState => newState)** 이렇게 이전 state 값을 받아서 그걸로 업데이트 되는 state값을 만드는 arrow 함수를 전달할 수 있는 함수 호출을 하시는게 좋아요.



네, 리액트에서 제공하는 setState는 함수는 두가지 종류가 있어요

- setState(newState)  // 새로운 state **오브젝트를 인자**로 바로 받는 함수
- setState(prevState => { return newState; }) // 이전 state를 받아서 그걸로 계산해서 새로운 state를 리턴하는 **함수를 인자로 받는 함수**



그래서 코드를 이렇게 작성하면 최고겠죠? 

![img](https://files.cdn.thinkific.com/file_uploads/292401/images/12f/8b2/596/Screen_Shot_2021-02-10_at_7.59.51_PM.png)



더 공부해 보고 싶으시다면 여기 이 페이지를 한번 보시면 좋을 것 같아요 :)

https://reactjs.org/docs/state-and-lifecycle.html

![img](https://files.cdn.thinkific.com/file_uploads/292401/images/79f/b75/b89/Screen_Shot_2020-12-01_at_6.24.13_pm.png)



## State를 수정하면 안되는 이유? 💩



**리액트에서는 상태를 직접적으로 절대! 그 어떤 경우에도 절대! 수정하면 좋지 않아요.**

사실 어떤 프로그래밍에서도 오브젝트를 직접적으로 변경하는것은 좋지 않죠. 예상치 못한 오류가 발생하는 것을 피하기 위해서는 이미 만들어진 오브젝트는 항상 불변성을 (Immutability) 유지 하는것이 좋아요. 

제가 좋지 않다고 말한 것은 합법적으로(?) State 오브젝트를 수정하지 못하도록 방지 하거나, 또 수정한다고 해서 바로 심각한 오류가 눈으로 보이는것이 아니기 때문이예요.



안되는 이유 하나를 예제로 보여드릴께요. 자, 아래 코드와 작성하는 경우는 어떨까요?

![img](https://files.cdn.thinkific.com/file_uploads/292401/images/6fb/191/c7e/Screen_Shot_2020-11-22_at_6.35.19_am.png)

this.state가 가리키고 있는 오브젝트의 count를 바로 직접적으로 수정하고, **수정된 this.state 자체를 setState의 인자로 전달**해 주었어요. 

![img](https://files.cdn.thinkific.com/file_uploads/292401/images/cbb/18a/163/Kapture_2020-11-22_at_06.32.02.gif)

실행해 보면 나름 잘 동작하는것을 볼 수 있어요 :) 

🙋‍♀️🤦🏻‍♂️ 이렇게나 잘되는데, 아니 왜 도대체 state를 바로 수정하지 말라고 하는거죠? 왜 매번 귀찮게 새로운 오브젝트를 만들어야 하나요? 그렇게 하기 위해서 작성해야 하는 코드의 양도 많아 지고 정말 귀찮은데 🧐



**자, 이렇게 State를 직접적으로 수정하는게 좋지 않은 이유중**



#### 첫번째. setState는 비동기적으로 동작한다

앞에서 설명해 드린 대로 리액트의 setState 함수 호출은 비동기적으로 처리 됩니다.

그래서 State를 직접 수정하면서 여러번 상태를 업데이트 하는 경우 **이전 업데이트 내용이 다음 업데이트 내용으로 덮어 쓰여질 수 있고,**

비동기 특성으로 인해 예상치 못한 곳에서, 예상치 못한 순간에 🐛 버그가 발생 할 수 있는 위험이 있어요.



#### 두번째, PureComponent에서 정상적으로 동작 하지 않는다


위의 코드에서 Component를 PureComponent로 변경해 보면 어떨까요?**![img](https://files.cdn.thinkific.com/file_uploads/292401/images/706/35d/5c7/Kapture_2020-11-22_at_06.09.14.gif)**더이상 업데이트가 되지 않는걸 볼 수 있죠 :) 

앞에서 설명해 드린 것처럼 PureComponent는 **현재 컴포넌트가 가지고 있는 상태**와 (this.state), **업****데****이트 해야 하는 새로운 상태** (setState 함수의 인자로 전달된 새로운 오브젝트)의 **레퍼런스를 비교해서** **업데이트가 필요한 경우** 해당 컴포넌트의 render 함수를 호출해주죠.

지금 경우는 this.stae 오브젝트를 직접적으로 수정해서 setState함수에 동일한 오브젝트를 전달하니깐, 비교 해야 하는 대상의 레퍼런스가 동일하므로 리액트는 업데이트 할 필요가 없다고 판단해서 render 함수를 호출해 주지 않아요.



이처럼, **리액트 상태 State를 직접적으로 수정하는것은 예상치 못한 문제가 발생 할 수 있기 때문에, 꼭 불변성을 유지 하는것이 좋아요.**



# **결론**

여기까지 기본 강의를 진행하면서 수강생 분들이 헷갈려 하셨던 부분들만 모아서 정리해 보았어요.



리액트 그냥 State, Props 쓰는법 쉽게 간단하게 가르쳐 드리고 배우시면 쉬운거 같아서 금방 배웠다! 하는 느낌이 있을 수 있지만 나중에 직접 프로젝트를 하다보면 예상하지 못한 버그 🐛 가 발생해서 고생하는 경우가 많아요.

리액트에서 발생하는 대부분의 이슈가 바로 이 오브젝트 불변성에 대한 이해가 없어서, 잘못 써서 발생하니깐, 이번 기회에 조금더 정리를 하시면 좋을 것 같아요 🙌