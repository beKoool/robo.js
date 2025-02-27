# Adding to Discord Servers

You've crafted an amazing Robo, and now it's time to bring it to life on your Discord Servers! To add your Robo, you'll need special invite links with the necessary permissions and scopes.

Don't worry, we've got you covered with two ways to generate these links: the Robo.js CLI and the Discord Developer Portal. 

> **Note:** You can always re-generate invite links and add your Robo again to update the permissions given.

## Robo.js CLI: The Cool Way 🔥

Robo.js has a rad feature that lets you generate invite links in a snap. Just run the command below, and you'll get an invite link to share or use to add your Robo to Discord servers:

```bash
npx robo invite
```

> **Heads up!** The `robo invite` command is currently in beta, so it might not detect all the permissions necessary, or it could ask for extra ones you don't need.

## Discord Developer Portal: The Classic Way 🕰️

If you're a fan of the Discord Developer Portal, you can generate your invite link by following these steps:

1. Head over to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Pick your application (Robo) from the list.
3. Go to the "OAuth2" section in the left sidebar.
4. In the "Scopes" section, check the "bot" box.
5. In the "Bot Permissions" section, select the permissions your Robo requires.
6. Grab the generated invite link at the very bottom.

You're all set! Your invite link is ready to share or use to add your Robo to Discord servers! 🌟

## Customizing Permissions in the Config File 🛠️

Wanna personalize permissions and scopes for `robo invite`? Add an `invite` section to your config file like this:

```javascript
/**
 * @type {import('@roboplay/robo.js').Config}
 **/
export default {
  // ...rest of config
  invite: {
    autoPermissions: false,
    permissions: ['SendMessages', 'ReadMessageHistory', 'AddReactions'],
    scopes: ['applications.commands']
  }
}
```

By setting `autoPermissions` to `false`, Robo.js won't automatically add extra permissions it thinks you might need.

## Intents: Tuning in to Discord Events 📡

Intents let Robo.js know which permissions to add automatically. Set 'em up in the `clientOptions` field of your config. Keep in mind that some features, like message content, need Privileged Gateway Intents. You'll find these in the Discord Developer Portal under the "Bot" section.

Here's an example of setting up intents in your config file:

```javascript
/**
 * @type {import('@roboplay/robo.js').Config}
 **/
export default {
  // ...rest of config
  clientOptions: {
    intents: ['GUILD_MESSAGES', 'GUILD_PRESENCES']
  }
}
```

## Dive Deeper 📚

Curious about permissions, scopes, and intents? Check out these reference links to learn when they're needed and what they mean:

- [Discord Developer Docs: Gateway Intents](https://discord.com/developers/docs/topics/gateway#gateway-intents)
- [Discord Developer Docs: Permissions](https://discord.com/developers/docs/topics/permissions)
- [Discord Developer Docs: OAuth2 Scopes](https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes)

It's especially important to understand intents, as they help Robo.js know which permissions to add automatically.

> **Note:** Permissions and scopes are usually handled for you, but knowing the ins and outs of intents can be super helpful! 🧠
