FROM openjdk:17-alpine
RUN apk add --no-cache tzdata
ARG JAR_FILE=/build/libs/RoyalCat-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]