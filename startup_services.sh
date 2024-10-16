#!/usr/bin/env sh

apt install python3-virtualenv -y
apt install nginx gunicorn -y
apt install pipx -y
pipx install poetry -y


# install mongodb https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
sudo apt-get install gnupg curl -y
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt-get update -y
sudo apt-get install -y mongodb-org

# start mongodb
sudo systemctl start mongod
sudo systemctl status mongod
sudo systemctl enable mongod
# sudo systemctl stop mongod  this is for reference only
