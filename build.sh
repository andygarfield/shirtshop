basedir=$PWD

# clone Turing repo and copy product images
git clone https://github.com/zandoan/turing-fullstack.git
cp -rd ./turing-fullstack/Images/product_images ./server/public

# build client code and move to server dir
cd ./client
npm install
npm run build
cp -rd ./dist/* ../server/public

# build server container
cd $basedir/server
npm install
docker build -t shirtshop .
