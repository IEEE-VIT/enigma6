git checkout --orphan test-build
npm run build
git rm --cached -r . -f
git add build/*
git add nginx/*
git add Dockerfile
git add .travis.yml
git commit -m "Pushing build"
git push origin test-build -f
git checkout master -f
git branch -D test-build