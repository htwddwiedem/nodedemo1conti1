echo ".env" > .gitignore
echo "node_modules" >> .gitignore
git init -b main
git add .
git commit -m "Node.js-Demo"
git remote add origin https://github.com/htwddwiedem/nodedemo1conti1.git
git push -u origin main
