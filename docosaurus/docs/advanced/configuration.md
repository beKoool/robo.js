# Configuration 🛠️

Customizing Robo.js to fit your needs is a piece of cake! 🍰 This guide will walk you through tweaking defaults, adding new intents, specifying permissions, changing sage mode behavior, and more.

To configure your Robo.js, create a config file named `robo.mjs` in a `config` folder.

> Alternatively, you can use CommonJS with the name `robo.cjs` or a simpler JSON format as `robo.json`. Using the JSON format is not as robust as JS, but it's a viable choice if you encounter issues with either `.cjs` or `.mjs` on your web host.

## Example configuration

You only need to provide configuration for the options you want to change. If you're happy with the default settings, there's no need to include them in your configuration file.

Here's an example implementation of a configuration file:

```javascript
// @ts-check

/**
 * @type {import('@roboplay/robo.js').Config}
 **/
export default {
	clientOptions: {
		intents: ['DirectMessages', 'Guilds', 'GuildMembers', 'GuildMessages', 'GuildVoiceStates', 'MessageContent']
	},
	logger: {
		level: 'info'
	},
	plugins: [],
	sage: {
		defer: true,
		deferBuffer: 2000,
		errorReplies: false
	}
}
```

## What it means

Now, let's break down each config key and their options:

### `clientOptions`

These are the options passed to the Discord.js client. Use this to specify intents that your Robo.js should handle.

Example:

```javascript
clientOptions: {
  intents: ['DirectMessages', 'Guilds', 'GuildMembers', 'GuildMessages', 'GuildVoiceStates', 'MessageContent'],
}
```

### `defaults`

Use this to customize default behavior, like enabling or disabling the help command.

Options:

- `help`: (boolean) Set to `false` to disable the help command.

Example:

```javascript
defaults: {
  help: false,
}
```

### `excludePaths`

Got files or directories you don't want to include in the final build? Use excludePaths. Just list the file or directory prefixes you want to exclude, and Robo.js will steer clear of them during the build process.

**Use cases:**

- Keeping test files out of the build.
- Preventing sensitive JSON files (like config or secrets) from being copied over

```js
excludePaths: ['/src/test', '/src/modules/example/statics.json']
```

In this example, any file or directory that starts with `/src/test` or `/src/modules/example/statics.json` will be ignored during the build process.

> **Note:** This feature works with directory and file prefixes, not glob patterns.

### `experimental`

Activate experimental features or revert to older behaviors for compatibility. This field takes an object containing the following optional boolean values:

- `buildDirectory`: Determine where to compile your code. The default is `.robo/build`, but you can specify another location.
- `incrementalBuilds`: Enable incremental builds to improve build performance by only recompiling changed files.
- `legacyProcess`: Switch back to the older child process runtime model. Recommended only if you encounter issues with the newer thread-based model.

```js
experimental: {
  buildDirectory: 'dist',
  incrementalBuilds: true,
  legacyProcess: false
}
```

> **Caution:** Features toggled through the experimental field may be unstable and are subject to change outside of semver. Use at your own risk.

### `heartbeat`

This config key is for customizing the heartbeat (ping) options.

Options:

- `debug`: (boolean) Set to `true` to enable debug mode.
- `interval`: (number) The interval in milliseconds between heartbeat pings.

Example:

```javascript
heartbeat: {
  debug: true,
  interval: 10000,
}
```

### `invite`

Configure your Robo's invite options.

Options:

- `permissions`: (PermissionsString[] | number) Specify permissions for your Robo.
- `scopes`: (Scope[]) Specify scopes for your Robo.

Example:

```javascript
invite: {
  permissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
  scopes: ['bot'],
}
```

### `logger`

Customize your logging preferences.

Options:

- `enabled`: (boolean) Set to `false` to disable logging.
- `level`: (LogLevel) Specify the log level.

Example:

```javascript
logger: {
  enabled: true,
  level: 'info',
}
```

### `plugins`

Specify the plugins you want to use in your Robo. You can add plugins to the configuration in a couple of ways:

1. Simply use the name of the plugin package as a string.
2. Provide an array with 2 to 3 values: the package name, plugin-specific options, and optional system-wide plugin settings.

The `failSafe` option ensures that plugin initialization won't crash your Robo, allowing it to still run even if some plugins require something you might not have (e.g., the GPT Plugin's OpenAI Key).

Example:

```javascript
plugins: [gptPlugin, '@roboplay/plugin-poll']
```

In the example above, `gptPlugin` is an array containing the package name, plugin-specific options, and optional system-wide plugin settings. The `@roboplay/plugin-poll` is added as a string, using the default settings for that plugin.

For more details about plugins and their options, check out the [Plugins](/docs/advanced/plugins) guide.

### `roboplay`

Customize RoboPlay-specific options, like picking the Node.js version to use.

Options:

- `node`: ('18' | '20' | 'latest') Select the Node.js version to use.

Example:

```javascript
roboplay: {
  node: 'latest',
}
```

### `sage`

Tweak the behavior of sage mode to suit your preferences.

Options:

- `defer`: (boolean) Set to `true` to defer the command until it's ready to be executed.
- `deferBuffer`: (number) The buffer time in milliseconds before a deferred command is executed.
- `ephemeral`: (boolean) Set to `true` to make the command's response ephemeral (visible only to the user who invoked the command).
- `errorReplies`: (boolean) Set to `true` to enable error replies for commands that fail.

Example:

```javascript
sage: {
  defer: true,
  deferBuffer: 2000,
  ephemeral: false,
  errorReplies: false,
}
```

### `timeouts`

Set custom timeout values for various operations in your Robo. This is useful for enforcing stricter limits than the default.

Options:

- `command`: (number) The timeout in milliseconds for command execution.
- `interaction`: (number) The timeout in milliseconds for interaction handling.

Example:

```javascript
timeouts: {
  command: 5000,
  interaction: 5000,
}
```

## Sensitive data

⚠️ **Heads up:** Keep sensitive data like API keys or tokens out of your configuration file. Instead, use a `.env` file to store secrets and refer to them with `process.env`. Configuration files are meant to be pushed to version control (git), while secrets inside `.env` should stay off-limits.

Take a look at the [Secrets guide](/docs/basics/secrets) for more info.
