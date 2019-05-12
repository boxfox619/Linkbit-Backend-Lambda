# Linkbit-Backend-Lambda [![Build Status](https://travis-ci.org/boxfox619/Linkbit-Backend-Lambda.svg?branch=master)](https://travis-ci.org/boxfox619/Linkbit-Backend-Lambda)
Cryptocurrency Linking Service - Linkbit


### Link address 컨셉
##### 문제상황
- 복잡하고 외울 수 없는 암호화폐 지갑 주소 
- 여러 코인의 지갑마다 주소가 존재 => 이를 위해 각각의 주소를 관리하고 송금시 알려주어야 함.

##### link address 해결 방안
지갑 주소를 간단하게 만들어주며
코인마다 존재하는 지갑주소를 하나의 주소로 통합해주는 link address 컨셉

### 한계
- 일부 코인들의 경우 추적을 불가능 하도록 주기적으로 지갑 주소가 변경됨
- 현재 블록체인의 속도와 비용으로 주소 관리, 조회를 정상적으로 하기엔 어려움이 있다고 판단됨
