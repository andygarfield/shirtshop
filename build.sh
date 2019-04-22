basedir=$PWD

# clone Turing repo and copy product images
git clone https://github.com/zandoan/turing-fullstack.git
cp -r ./turing-fullstack/Images/product_images ./server/public

# build client code and move to server dir
cd ./client
npm run build
cp ./dist/* ../server/public

# build server container
cd $basedir
docker build -t shirtshop ./server
