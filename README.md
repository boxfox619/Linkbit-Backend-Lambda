# Linkbit-Backend-Lambda [![Build Status](https://travis-ci.org/boxfox619/Linkbit-Backend-Lambda.svg?branch=master)](https://travis-ci.org/boxfox619/Linkbit-Backend-Lambda) [![Coverage Status](https://coveralls.io/repos/github/boxfox619/Linkbit-Backend-Lambda/badge.svg?branch=feature/coverage)](https://coveralls.io/github/boxfox619/Linkbit-Backend-Lambda?branch=feature/coverage)
Cryptocurrency Linking Service - Linkbit  
암호화폐 간편 송금 솔루션 Linkbit 백엔드

### Environment
- node version : 10.15.3
- Typescript
- AWS-Lambda
- Serverless.js

### Project structure
```
├─domain        // Clean Architecture - Domain Layer : Usecase 정의 
├─handler       // aws-lambda handler 정의
├─models        // model, Database Table 정의
├─service       // Clean Architecture - Data Layer : Usecase 구현
└─util          // 유틸리티 모듈
```

### Link address 컨셉
#### 문제상황
- 복잡하고 외울 수 없는 암호화폐 지갑 주소 
- 여러 코인의 지갑마다 주소가 존재 => 이를 위해 각각의 주소를 관리하고 송금시 알려주어야 함.

#### link address 해결 방안
지갑 주소를 간단하게 만들어주며
코인마다 존재하는 지갑주소를 하나의 주소로 통합해주는 link address 컨셉

#### 한계
- 일부 코인들의 경우 추적을 불가능 하도록 주기적으로 지갑 주소가 변경됨
- 현재 블록체인의 속도와 비용으로 주소 관리, 조회를 정상적으로 하기엔 어려움이 있다고 판단됨

### Address Owner 검증 전략
주소 생성 과정 : Private Key -> Public Key -> Account Address  
Public Key로 encrypt한 token을 client가 private key로 decrypt하여 해당 account address의 소유주임을 인증함  
