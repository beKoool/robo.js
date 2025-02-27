import type { LogDrain, LogLevel } from '../core/logger.js'
import type { ClientOptions, PermissionsString } from 'discord.js'
import type { Plugin, SageOptions } from './index.js'

export interface Config {
	clientOptions: ClientOptions
	defaults?: {
		help?: boolean
	}
	excludePaths?: string[]
	experimental?: {
		buildDirectory?: string
		incrementalBuilds?: boolean
		legacyProcess?: boolean
	}
	flashcore?: {
		keyv?: unknown
	}
	heartbeat?: {
		debug?: boolean
		interval?: number
		url: string
	}
	invite?: {
		autoPermissions?: boolean
		permissions?: PermissionsString[] | number
		scopes?: Scope[]
	}
	logger?: {
		drain?: LogDrain
		enabled?: boolean
		level?: LogLevel
	}
	plugins?: Plugin[]
	roboplay?: {
		node?: '18' | '20' | 'latest'
	}
	sage?: false | SageOptions
	timeouts?: {
		autocomplete?: number
		commandDeferral?: number
		commandRegistration?: number
		lifecycle?: number
	}
	type?: 'plugin' | 'robo'

	/** How often to check for updates to Robo.js in seconds. Default: 1 hour */
	updateCheckInterval?: number
}

export type Scope =
	| 'identify'
	| 'email'
	| 'connections'
	| 'guilds'
	| 'guilds.join'
	| 'guilds.members.read'
	| 'gdm.join'
	| 'rpc'
	| 'rpc.notifications.read'
	| 'rpc.voice.read'
	| 'rpc.voice.write'
	| 'rpc.activities.write'
	| 'bot'
	| 'webhook.incoming'
	| 'messages.read'
	| 'applications.builds.upload'
	| 'applications.builds.read'
	| 'applications.commands'
	| 'applications.store.update'
	| 'applications.entitlements'
	| 'activities.read'
	| 'activities.write'
	| 'relationships.read'
	| 'voice'
	| 'dm_channels.read'
	| 'role_connections.write'
	| 'applications.commands.permissions.update'
