## React Native 설치

> 아래 두가지 방법 중 하나를 선택

<br/>

### 1. Expo CLI

```
npm install -g expo-cli
```

- 프로젝트 실행

```
# expoTest라는 프로젝트 생성
expo init expoTest
# 빈 화면으로 만들래 탭 있는걸로 만들래 -> 빈 화면(젤 위에꺼)
# 이름 그냥 설정 하면 됨.

cd expoTest
npm start

# Tunnel ready 뜨면 정상 작동 한것임. 만약 안뜨면 pc 재부팅
```

#### 시뮬레이터 (가상) 실행

- Run on Android device 클릭하면 에러 메시지 나오는데, 안드로이드 스튜디오 설치해야함.
  - 공식 웹 사이트에서 설치 하면 됨.
  - 설치하고 실행 -> Configure -> SDK manager -> SDK Tools에서 영상 처럼 설치(Apply 누르면 그냥 설치됨)
  - 다시 Configure -> AVD Manager -> Create Virtual Device -> Default 값으로 생성 -> 설치한 값으로 선택
- 다시 Run on Android device 클릭 -> `Open up App.js to start working on your app!` 문구 뜨는지까지 확인



#### device 실행

- android 디바이스 (휴대폰)에서 expo 설치

  - SDK 열고, 플레이스토어에서 expo 검색해서 설치.

  - 큐알 코드 읽혀서 권한 허용
  - 안된다 -> 와이파이 노트북 - 휴대폰 간에 같은걸로 잡혀있는지 확인.





### 3. React Native CLI 로 설치

- 윈도우에서 개발시 블로그 참조. (https://shift.infinite.red/getting-started-with-react-native-development-on-windows-90d85a72ae65), https://hianna.tistory.com/142, https://dev-yakuza.posstree.com/ko/react-native/install-on-windows/ 
- JDK, 노드, 안드로이드 스튜디오 설치.
  - Java SDK 경로로 환경 변수 생성: Windows → 검색 → 시스템 → 고급 시스템 설정 → 환경 변수 → 새로 만들기 : `JAVA_HOME: C:\path\to\JavaSDK`
  - 사용자 정의 Android SDK 설치 위치로 추가 환경 변수도 설정 `ANDROID_HOME: C:\경로\to\AndroidSDK`



08/08

- 안드로이드 스튜디오 설치 완료
- react native cli 설치 미완료



#### 공식 웹사이트

https://reactnative.dev/docs/getting-started

https://reactnative.dev/

