import api from './api';

export async function getCurriculum() {
  return api.get('/api/curriculum');
}

export async function getWeek(weekNumber) {
  return api.get(`/api/curriculum/week/${weekNumber}`);
}

export async function getDailyTask() {
  return api.get('/api/daily-task');
}

export async function getProgress() {
  return api.get('/api/progress');
}

export async function completeTask({ taskId, weekNumber, dayNumber }) {
  return api.post('/api/progress/complete-task', { taskId, weekNumber, dayNumber });
}

export async function saveOnboarding(onboardingData) {
  return api.patch('/api/progress/onboarding', { onboardingData });
}

export async function sendChatMessage({ messages, weekNumber, phase }) {
  return api.post('/api/chat', { messages, weekNumber, phase });
}
