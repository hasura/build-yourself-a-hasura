FROM ubuntu:22.04

RUN apt-get update &&\
    apt-get install -y curl &&\
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash &&\
    . ~/.nvm/nvm.sh &&\
    export NVM_DIR=/root/.nvm &&\
    nvm install --default 20 &&\
    nvm use node &&\
    npm install --global yarn

# RUN curl -L https://github.com/facebook/watchman/releases/download/v2023.05.01.00/watchman_ubuntu22.04_v2023.05.01.00.deb -o watchman.deb &&\
#     apt-get install -y ./watchman.deb &&\
#     rm watchman.deb

WORKDIR /workdir