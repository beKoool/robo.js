import { AiEngine } from '../../core/engine.js'
import { logger } from '../../core/logger.js'
import { options as pluginOptions } from '../../events/_start.js'
import type { GptChatMessage } from '../../core/openai.js'
import type { RoboRequest } from '@roboplay/plugin-api'

interface ApiChatRequest {
	functionCall?: string
	messages: GptChatMessage[]
	model?: string
}

interface ApiChatResponse {
	message: string
}

export default (req: RoboRequest<ApiChatRequest>): Promise<ApiChatResponse> => {
	return new Promise((resolve, reject) => {
		(async () => {
			const { messages } = req.body
			if (!messages?.length) {
				return reject('No message provided')
			}

			// Only insert system message if none already provided & exists
			const gptMessages = messages
			const systemMessage = gptMessages.find((message) => message.role === 'system')

			if (!systemMessage && pluginOptions.systemMessage) {
				gptMessages.unshift({
					content: pluginOptions.systemMessage,
					role: 'system'
				})
			}

			AiEngine.chat(gptMessages, {
				onReply: (message) => {
					logger.debug('API Chat response:', message)
					resolve({
						message: message
					})
				}
			})
		})()
	})
}
