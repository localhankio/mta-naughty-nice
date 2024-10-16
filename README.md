# mta-commute-karma

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
