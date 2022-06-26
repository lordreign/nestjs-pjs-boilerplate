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
5. 진행중..

```

# Typeorm 관련 명령어
```
- yarn migration:generate 파일명 > entity가 존재할때 entity 기반으로 migration 생성
- yarn migration:create 파일명 > migration파일 생성
- yarn migration:run:dev > development환경에 migration run  처리
- yarn migration:revert:dev > development 환경에 migration rever 처리
- yarn seeds:dev seed > development 환경에 seed데이터 삽입 실행
```


# 삭제할 파일
```
src/migrations 하위 파일
src/entity 하위 파일
```