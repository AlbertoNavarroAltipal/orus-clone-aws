import { Amplify } from "aws-amplify";
import { generateClient } from "@aws-amplify/api";

Amplify.configure({
  API: {
    GraphQL: {
      endpoint:
        "https://stzckega5fe2niod2pwjgmzp5a.appsync-api.us-east-1.amazonaws.com/graphql",
      region: "us-east-1",
      defaultAuthMode: "apiKey",
      apiKey: "da2-5hehusj7p5bj7de4u4po7xlc44",
    },
  },
});

// Crear cliente con la configuración
const client = generateClient();

// Verificación de configuración
console.log("AWS Amplify configurado:", Amplify.getConfig());

export default client;
