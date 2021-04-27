FROM openjdk:15-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
WORKDIR ~/app
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} app.jar
USER root:root
RUN chown -R spring:spring .
USER spring:spring
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
