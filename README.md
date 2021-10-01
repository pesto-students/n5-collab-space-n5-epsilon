# ColabSpace
Hi welcome to CollabSpace, Happy you found us 

CollabSpace is a poratable Project Management system bootstrap on create-next-app
With collabspace we have accomplist flexibility in Team size, project type

Tech Stack 
----------

- NextJs
- ReactJs 
- Redux
- Immer 
- Scss 

Deployment
-----------
CollabSpace can be setup by following commands 

**Clone git repository**
```sh
git clone https://github.com/pesto-students/n5-collab-space-n5-epsilon.git
```
**Change directory**
```sh
cd ./n5-collab-space-n5-epsilon
```
**Install Dependency**
```sh
    npm install
    OR
    yarn add
```

**Development Build**
```sh
    npm run dev
    OR
    yarn dev
```
**Production Build**
```sh
    npm run build
    npm start
    OR
    yarn run build
    yarn start
```

We are shipping with demo account filled in as SignIn page with Mongo Database Configuration. To Modify Mongo Credential Update **MONGODB_URI** env variable 

Docker image
-----
Use given command to setup dockerise version of collabspace 
```sh
docker build . -t <ImageName>
```
```sh
docker run -p 3000:3000 --name <ContainerName> <ImageName>
```
