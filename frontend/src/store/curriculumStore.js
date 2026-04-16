import { create } from 'zustand';
import {
  getProgress,
  getDailyTask,
  completeTask,
  sendChatMessage,
} from '../services/curriculum.service';

export const useCurriculumStore = create((set, get) => ({
  progress: null,
  dailyTask: null,
  currentWeek: null,
  isLoading: false,
  isSendingMessage: false,
  chatMessages: [],

  fetchProgress: async () => {
    set({ isLoading: true });
    try {
      const data = await getProgress();
      set({ progress: data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch progress:', error);
      set({ isLoading: false });
    }
  },

  fetchDailyTask: async () => {
    set({ isLoading: true });
    try {
      const data = await getDailyTask();
      set({ dailyTask: data.task, currentWeek: data.week, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch daily task:', error);
      set({ isLoading: false });
    }
  },

  completeCurrentTask: async () => {
    const { dailyTask, currentWeek, progress } = get();
    if (!dailyTask || !currentWeek) return null;

    const weekNumber = currentWeek.week_number;
    const dayNumber = progress?.current_day ?? 1;

    const result = await completeTask({
      taskId: dailyTask.id,
      weekNumber,
      dayNumber,
    });

    // Refresh progress after completing
    await get().fetchProgress();
    return result;
  },

  addChatMessage: (message) => {
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    }));
  },

  sendMessage: async (content) => {
    const { chatMessages, currentWeek } = get();

    const userMessage = { role: 'user', content };
    const updatedMessages = [...chatMessages, userMessage];
    set({ chatMessages: updatedMessages, isSendingMessage: true });

    try {
      const response = await sendChatMessage({
        messages: updatedMessages,
        weekNumber: currentWeek?.week_number,
        phase: currentWeek?.phase,
      });

      set((state) => ({
        chatMessages: [
          ...state.chatMessages,
          { role: response.role || 'assistant', content: response.message },
        ],
        isSendingMessage: false,
      }));
    } catch (error) {
      console.error('Failed to send chat message:', error);
      set({ isSendingMessage: false });
    }
  },

  clearChat: () => {
    set({ chatMessages: [] });
  },
}));

export default useCurriculumStore;
