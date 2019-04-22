basedir=$PWD

# build client code and move to server dir
cd ./client
npm run build
cp ./dist/* ../server/public

# build server container
cd $basedir
docker build -t shirtshop ./server
