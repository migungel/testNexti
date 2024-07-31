FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src

COPY *.sln .
COPY YourProjectName/*.csproj ./YourProjectName/
RUN dotnet restore

COPY . .
WORKDIR /src/YourProjectName
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "YourProjectName.dll"]

EXPOSE 5000
