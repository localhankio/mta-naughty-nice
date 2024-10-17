# mta-naughty-nice
Naughty train line of the month, and nice train line of the month.

## local setup
Start in the project root directory for these instructions.
1. install poetry
2. (optional) `poetry config virtualenvs.in-project true`. This creates a virtualenv in your working directory
3. `source .venv/bin/activate`
4. `poetry install` to install dependencies
5. `uvicorn src.app:app --port 8000` to start local web server on port 8000. 
6. You can hit the API in a couple ways
   1. go to `http://localhost:8000/docs` to use the OpenAPI/Swagger docs
   2. directly requesting the API via `curl`, Postman (GUI), or another REST client (like python `requests` library)
3. 

## Deployment steps
1. ensure you have password for droplet, or have ssh key added
2.
    ```shell
    scp /pyproject.toml /poetry.lock src/*
    ```
3. extra set up 
   ```shell
   apt install python3-virtualenv
   apt install pipx
   pipx install poetry
    ```
4. Local steps
   1. `brew services start mongodb-community@8.0`
   2. `brew services stop mongodb-community@8.0`
5. server step: run `./startup_services.sh`
