# NESTJS-PJS-BOILERPLATE
```
Nestjs boilerplate(Uncompleted)

개인적으로 사용할 boilerplate 구성함
1. nestjs
2. typeorm / mysql
  - migration 완료
  - seeds 완료
3. swagger(/docs)
4. winston log 적용
  - console, file(development일때는 안남김)
  - service log 적용
5. 프로젝트 구조(개인취향) 정리
6. 페이징 처리 구조화
7. request interceptor 적용
8. response > 구조화 및 직렬화 처리(@ResponseSerialize(UserDto))
9. dto custom validation 적용
  - TODO: 비밀번호 정규식처리 추가 예정
```

# Typeorm 관련 명령어
```
- yarn migration:generate 파일명 > entity가 존재할때 entity 기반으로 migration 생성
- yarn migration:create 파일명 > migration파일 생성
- yarn migration:run:dev > development환경에 migration run  처리
- yarn migration:revert:dev > development 환경에 migration rever 처리
- yarn seeds:dev seed > development 환경에 seed데이터 삽입 실행
```
