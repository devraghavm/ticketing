# ticketing microservices example

This application is example e-commerce application that was completely built ground up using Microservices architecture.

Please fork this project into your own repository and make changes in your own repository.

** DO NOT CHECK IN YOUR CHANGES TO THIS REPOSITORY**

## Running in Dev

You need the following software installed on your local machine to run this application locally:

- [Docker](https://docs.docker.com/get-docker/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Skaffold](https://skaffold.dev/docs/install/)
- [Node](https://nodejs.org/en/download/)

_Note: Latest versions of Docker Desktop are shipping with minikube pre-installed you do not have to install minikube unless you are running older version. In any case, Minikube can be installed from [here](https://kubernetes.io/docs/tasks/tools/install-minikube/)._

### Changes to code

**_Note: Run `docker login` command in your local system to login with your docker credentials before your proceed with the below changes._**

1. Make the following changes to the `src/app.js` to folders **auth, orders, payments, tickets**.
   **_Comment:_**

```
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
```

**_Uncomment:_**

```
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
```

2. Make the following change to `api/build-client.js` to folder **client**.
   **_Comment:_**

```
    return axios.create({
      baseURL: 'http://www.gittix-app-prod.xyz/',
      headers: req.headers,
    });
```

**_Uncomment:_**

```
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
```

3. This step is optional, you can do this if you want to create your own docker images and run it.

- In your editor. (Note: Should technically work for any latest editors.)
  - Do find and replace in folder **infra** for the word `devraghavm` to `<your-docker-id>`.
  - Do find and replace in file **skaffold.yaml** for the word `devraghavm` to `<your-docker-id>`.

### Running the application

1. Once all the changes are done, you need to navigate to **auth, client, expiration, orders, payments, tickets** folders each at a time in your terminal and issue the following set of commands.

```
docker build -t <your-docker-id>/<folder-name/service-name> .
docker push <your-docker-id>/<folder-name/service-name>
```

**_Note: Do not forget the `.` in the end of the `docker build` command and make sure you are in the respective folder when you are running these commands. Example: `auth`_**

2. Issue the below command to startup your application.

```
skaffold dev
```

### Testing the application

1. Navigate to url below.

```
http://ticketing.dev
```

_Note: If you are using chrome and you seeing any warning like this page is unsecure, type the `thisisunsafe` on the page that displays the warning and the page should be rendered._

2. When you get to a page where you would like to pay for your ticket. As I am using the stripe's developer account, the real transactions would not be processed. To test this flow, Try entering the below details to the credit card form.

```
Credit Card#: 4242 4242 4242 4242
Expiration Date: Any future month and date (Example: 10/30)
CVV: Any 3 digit number (Example: 456)
```

Hope that should be it.

**Happy learning guys!!!.**
