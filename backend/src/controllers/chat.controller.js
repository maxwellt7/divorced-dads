import { anthropic } from '../config/ai-models.js';

export const chatController = {
  async chat(req, res, next) {
    try {
      if (!anthropic) {
        return res.status(503).json({ error: 'AI chat not configured' });
      }

      const { messages, systemPrompt, weekNumber, phase } = req.body;

      const resolvedSystemPrompt = systemPrompt ||
        `You are a compassionate coach for divorced dads going through personal transformation. You are currently supporting a user in Week ${weekNumber} (${phase} phase) of their 16-week journey. Be supportive, practical, and encouraging. Focus on helping them process their experiences and grow.`;

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: resolvedSystemPrompt,
        messages: messages || [],
      });

      return res.json({
        message: response.content[0].text,
        role: 'assistant',
      });
    } catch (err) {
      next(err);
    }
  },
};
