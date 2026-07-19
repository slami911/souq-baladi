import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Conversation, Message, Notification, SearchFilters } from '@/types';

interface UserState {
  currentUser: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

interface SearchState {
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
}

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;
}

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Notification) => void;
}

interface ChatState {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  setConversations: (conversations: Conversation[]) => void;
  addMessage: (conversationId: string, message: Message) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
}

interface AppState {
  user: UserState;
  theme: ThemeState;
  search: SearchState;
  favorites: FavoritesState;
  notifications: NotificationsState;
  chat: ChatState;
}

const defaultFilters: SearchFilters = {
  query: undefined,
  city: undefined,
  category: undefined,
  subcategory: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  condition: undefined,
  sortBy: undefined,
  latitude: undefined,
  longitude: undefined,
  distance: undefined,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: {
        currentUser: null,
        setUser: (user) => set((state) => ({ user: { ...state.user, currentUser: user } })),
        logout: () => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
          }
          set((state) => ({ user: { ...state.user, currentUser: null } }));
        },
      },

      theme: {
        isDark: false,
        toggleTheme: () =>
          set((state) => {
            const newIsDark = !state.theme.isDark;
            if (typeof window !== 'undefined') {
              document.documentElement.classList.toggle('dark', newIsDark);
            }
            return { theme: { ...state.theme, isDark: newIsDark } };
          }),
      },

      search: {
        filters: defaultFilters,
        setFilters: (newFilters) =>
          set((state) => ({
            search: { ...state.search, filters: { ...state.search.filters, ...newFilters } },
          })),
        clearFilters: () =>
          set((state) => ({ search: { ...state.search, filters: defaultFilters } })),
      },

      favorites: {
        favorites: [],
        toggleFavorite: (listingId) =>
          set((state) => {
            const isFav = state.favorites.favorites.includes(listingId);
            const newFavorites = isFav
              ? state.favorites.favorites.filter((id) => id !== listingId)
              : [...state.favorites.favorites, listingId];
            return { favorites: { ...state.favorites, favorites: newFavorites } };
          }),
        isFavorite: (listingId) => get().favorites.favorites.includes(listingId),
      },

      notifications: {
        notifications: [],
        unreadCount: 0,
        setNotifications: (notifications) =>
          set((state) => ({
            notifications: {
              ...state.notifications,
              notifications,
              unreadCount: notifications.filter((n) => !n.read).length,
            },
          })),
        markAsRead: (id) =>
          set((state) => {
            const newNotifications = state.notifications.notifications.map((n) =>
              n.id === id ? { ...n, read: true } : n
            );
            return {
              notifications: {
                ...state.notifications,
                notifications: newNotifications,
                unreadCount: newNotifications.filter((n) => !n.read).length,
              },
            };
          }),
        markAllAsRead: () =>
          set((state) => ({
            notifications: {
              ...state.notifications,
              notifications: state.notifications.notifications.map((n) => ({ ...n, read: true })),
              unreadCount: 0,
            },
          })),
        addNotification: (notification) =>
          set((state) => ({
            notifications: {
              ...state.notifications,
              notifications: [notification, ...state.notifications.notifications],
              unreadCount: state.notifications.unreadCount + 1,
            },
          })),
      },

      chat: {
        conversations: [],
        messages: {},
        setConversations: (conversations) =>
          set((state) => ({ chat: { ...state.chat, conversations } })),
        addMessage: (conversationId, message) =>
          set((state) => ({
            chat: {
              ...state.chat,
              messages: {
                ...state.chat.messages,
                [conversationId]: [...(state.chat.messages[conversationId] || []), message],
              },
            },
          })),
        setMessages: (conversationId, messages) =>
          set((state) => ({
            chat: {
              ...state.chat,
              messages: {
                ...state.chat.messages,
                [conversationId]: messages,
              },
            },
          })),
      },
    }),
    {
      name: 'slami911-store',
      partialize: (state) => ({
        user: { currentUser: state.user.currentUser },
        theme: { isDark: state.theme.isDark },
        favorites: { favorites: state.favorites.favorites },
      }),
    }
  )
);
