# Bugfinder

![grafik](https://user-images.githubusercontent.com/39833217/192544825-4e0a2c61-00ad-4d6c-8141-3a42901bcc4d.png)

This is a game where you have to find bugs. You have to find click on the position in the code that causes the bug and get chat-like feedback.

This repository contains the frontend for the [Bugfinder minigame](https://gamifyit-docs.readthedocs.io/en/latest/user-manuals/minigames/bugfinder.html).

## Development
> Beginning of additions (that work)
### Getting started

Clone the repository  
```sh
git clone https://github.com/Gamify-IT/bugfinder.git
```

Install the dependencies  
```sh
npm install
```

### Compile and Hot-Reload for Development
To run the project locally with your IDE feature and have all necessary dependencies running,
start the dependencies via docker:
```sh
docker compose -f docker-compose-dev.yaml up
```
Then start the frontend with:
```sh
npm run serve
```
You can now access the game at [localhost](http://localhost).

### Build your local changes as a docker container
To build and run your local changes as a docker container use:
```sh
docker compose up --build
```
You can remove the container with:

```sh
docker compose down
```

> End of additions

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
