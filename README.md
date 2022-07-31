# bugfinder

This is a game where you have to find bugs. You have to find click on the position in the code that causes the bug and get chat-like feedback.

## Development

### Getting started

Clone the repository  
```sh
git clone https://github.com/Gamify-IT/bugfinder.git
```

Install the dependencies  
```sh
npm install
```

#### Run with Docker-compose

Start all dependencies with our docker-compose files.
Check the [manual for docker-compose](https://github.com/Gamify-IT/docs/blob/main/dev-manuals/docker-compose/docker-compose.md).

### Compile and Hot-Reload for Development

```sh
npm run serve
```

### Test

Run the tests:
```sh
npm run test:unit
```

To also get the test coverage:
```sh
npm run test:unit -- --coverage
```

### Build

Build the Docker-Container
```sh
docker build -t bugfinder-dev .
```
And run it at port 8000 with
```sh
docker run -d -p 8000:80 --name bugfinder-dev bugfinder-dev
```

To monitor, stop and remove the container you can use the following commands:
```sh
docker ps -a -f name=bugfinder-dev
```
```sh
docker stop bugfinder-dev
```
```sh
docker rm bugfinder-dev
```

## User manual

Run the docker container with the following command at port 8000:
```sh
docker run -d -p 8000:80 --name bugfinder ghcr.io/gamify-it/bugfinder:latest
```
Now you can access it at [http://localhost:8000](http://localhost:8000).  
To access it externally replace localhost with your IP.  

To monitor the container you can use the following command:
```sh
docker ps -a -f name=bugfinder
```
To stop the container you can use the following command:
```sh
docker stop bugfinder
```
To remove the container you can use the following command:
```sh
docker rm bugfinder
```

### Screenshot

![Screenshot](https://user-images.githubusercontent.com/44726248/175772024-e21bb386-5ae8-4608-8219-ca807cbfe350.png)
