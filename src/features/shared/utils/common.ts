import moment from 'moment';

export const formatTime = (date: Date): string => {
  return moment(date).format('HH:mm');
};

export const formatRelativeTime = (date: Date): string => {
  return moment(date).fromNow();
};

export const formatDate = (date: Date): string => {
  return moment(date).format('MMM DD, YYYY');
};

export const formatDateTime = (date: Date): string => {
  return moment(date).format('MMM DD, YYYY HH:mm');
};

export const generateId = (): string => {
  return Date.now().toString();
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export const sortConversationsByMostRecent = (conversations: Chat[]): Chat[] => {
  return [...conversations].sort((a, b) => {
    return moment(b.updated_at).valueOf() - moment(a.updated_at).valueOf();
  });
};