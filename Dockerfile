FROM openjdk:15-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
WORKDIR ~/app
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
VOLUME ./images-uploaded
ENTRYPOINT ["java","-jar","/app.jar"]
