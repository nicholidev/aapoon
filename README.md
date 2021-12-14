# lyflair

1. Clone the project locally
   ```
   git clone git@github.com:TarasMazepa/lyflair.git
   cd lyflair
   ```
2. Install firebase tools globally
   ```
   npm install -g firebase-tools
   ```
3. Install dependacies in root directory
   ```
   npm install
   ```
4. Move to the client directory in the project and command to install all the dependencies
   ```
   cd client
   npm install
   ```
5. Switch to root folder and run following command to setup enviroment variables
   ```
   npm run init [firebase-instance-name]
   ```
   Here `firebase-instance-name` is the name of you firebase instance alias specified in `.firebaserc`
6. Run the following command to run the project locally
   ```
   npm run start:dev
   ```
7. Run the following command to run firebase functions project
   ```
   npm run serve
   ```

## Deployment

8. Move to the client directory and build the project using this command
   ```
   npm run build:prod
   ```
9. Move back to the root directory and run the following command to deploy
   ```
   firebase deploy
   ```

## Firestore schema migration

10. In order to run migration script you have to do gcloud setup first.

    You can install gcloud sdk from
    https://cloud.google.com/sdk/docs/downloads-interactive

    After that you can login to your project

    ```
    gcloud auth application-default login

    ```

11. To trigger migration you can run following command, note migration attempts to runs as a part of the every deploy

    ```
    npm run migrate

    ```

## Data backup

12. Create a new backup bucket in gcloud storage

https://console.cloud.google.com/storage/browser

13. Assign the Cloud Datastore Import Export Admin role. Replace PROJECT_ID, and run the following command:

```
gcloud projects add-iam-policy-binding [PROJECT_ID] \
    --member serviceAccount:[PROJECT_ID]@appspot.gserviceaccount.com \
    --role roles/datastore.importExportAdmin
```

14. Assign the Storage Admin role on your bucket. Replace PROJECT_ID and BUCKET_NAME, and run the following command:

```gsutil iam ch serviceAccount:PROJECT_ID@appspot.gserviceaccount.com:admin \
   gs://BUCKET_NAME
```

15. Put bucket name in enviroment-config.json under backupBucket key.

16. Run following command to init config
    ```
    npm run init
    ```
17. deploy functions

    ```
    firebase deploy
    ```
