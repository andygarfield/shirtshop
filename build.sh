basedir=$PWD

# clone Turing repo and copy product images
git clone https://github.com/zandoan/turing-fullstack.git
cp -R ./turing-fullstack/Images/product_images ./client/public

# build client code and move to server dir
cd ./client
npm install
npm run build
cp -R ./dist/* ../server/public

# build server container
cd $basedir/server
docker build -t shirtshop .
