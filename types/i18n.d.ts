declare global {
  interface I18nResource {
    page_direction: string;
    new_chat: string;
    send: string;
    type_message: string;
    select_conversation: string;
    delete_conversation: string;
    no_conversations: string;
    start_new_chat: string;
    getting_started: string;
    project_planning: string;
    code_review: string;
    hello: string;
    help_message: string;
    ai_response: string;
  }

  interface I18nLanguage {
    code: string;
    name: string;
    flag: string;
  }

  interface I18nHook {
    t: (key: string) => string;
    changeLanguage: (languageCode: string) => void;
    currentLanguage: I18nLanguage;
    availableLanguages: I18nLanguage[];
    language: string;
  }
}

export {};