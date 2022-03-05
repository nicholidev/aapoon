const exec = require("child_process").execSync;
let configuration = require("./environment-config.json");
let externalConfiguration;

if (externalConfiguration) {
  configuration = { ...configuration, ...externalConfiguration };
}

//Check if instance name is provided

if (!process.argv[2]) {
  console.error("Please enter instance name to deploy");
  process.exit(1);
}

let tokenString = process.argv[3] ? " --token " + process.argv[3] : "";

//Extaxting Instance name

let appName = process.argv[2];

//Getting config details

if (!configuration[appName]) {
  console.error(
    `No configuration found for ${appName} in environment-config.js , Please update configuration for ${appName} in environment-config.js`
  );

  process.exit(1);
}

console.log(
  `Switching to instance ${appName} with following configuration`,
  configuration[appName]
);

// Run command depending on the OS

// setting up environment variable for front endpoint
exec(
  `cd client  && echo 'NEXT_PUBLIC_PROJECT_ID=${configuration[appName].projectId}\nNEXT_PUBLIC_FUNCTION_URL=${configuration[appName].functionUrl}\nNEXT_PUBLIC_API_KEY=${configuration[appName].apiKey}\nNEXT_PUBLIC_AUTH_DOMAIN=${configuration[appName].authDomain}\nNEXT_PUBLIC_STORAGE_BUCKET=${configuration[appName].storageBucket}\nNEXT_PUBLIC_MESSAGING_ID=${configuration[appName].messagingSenderId}\nNEXT_PUBLIC_APP_ID=${configuration[appName].appId}\nNEXT_PUBLIC_MEASUREMENT_ID=${configuration[appName].measurementId}\nNEXT_PUBLIC_CUSTOMER_PORTAL=${configuration[appName].cportal}' > .env`,
  { stdio: "inherit" }
);

// Selecting firebase instance
exec(
  `firebase functions:config:set stripe.rkey="${configuration[appName].stripeKey}" ${tokenString}`,
  { stdio: "inherit" }
);
exec(`firebase use ${appName}${tokenString}`, { stdio: "inherit" });

// Setting configuration for firebase functions

// exec(
//   `firebase functions:config:set email.password="${configuration[appName].password}" email.user="${configuration[appName].user}" token.key="${configuration[appName].token}" backup.bucket="${configuration[appName].backupBucket}"${tokenString}`,
//   { stdio: "inherit" }
// );

// exec(`firebase functions:config:get${tokenString}`, { stdio: "inherit" });
// exec(
//   `firebase functions:config:get${tokenString} > functions/.runtimeconfig.json`,
//   {
//     stdio: "inherit",
//   }
// );
// exec(`firebase use${tokenString}`, { stdio: "inherit" });
