# Estágio 1: Build do projeto com Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio 2: Execução do JAR
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/CadastroGrupoNorte-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]