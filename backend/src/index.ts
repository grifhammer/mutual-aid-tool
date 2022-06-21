import * as hapi from "@hapi/hapi";

import devConfig from "./config/example.index";
// import prodConfig from "./config/index";
import User from "./models/User";

// const isProd = true;

const config = devConfig;
console.log(config);
const init = async () => {
  const server = hapi.server({ port: 3000, host: "localhost" });
  await server.register(require("@hapi/cookie"));

  await server.register({
    plugin: require("hapi-mongodb"),
    // options: { uri: config.mongoOptions.uri },
  });
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "ma-tool",
      password: config.cookiePassword,
      isSecure: true,
    },
    redirectTo: "/sign-in",
    validateFunc: async (_request: any, session: any) => {
      const account = await User.findOne({ id: session.id });
      console.log(account);
      if (!account) {
        return { valid: false };
      }

      return { valid: true, credentials: account };
    },
  });
  await server.start();
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
