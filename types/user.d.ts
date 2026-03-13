type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    created_at: string;
    access_token: string;
    preferences: UserPreferences | null;
}

type UserPreferences = {
    language?: string | null;
    dark_mode?: boolean | null;
    sidebar_collapse?: boolean | null;
    notifications?: boolean | null;
}


type GetUserResponse =  User

type SubmitUpdateUserRequest = Partial<Pick<User, 'name' | 'email' | 'phone'>>
type SubmitUpdateUserResponse = Partial<User>


type SubmitUpdatePasswordRequest = {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}
type SubmitUpdatePasswordResponse = {
    message: string;
    status: string;
}

type SubmitUpdatePreferencesRequest = {
    language?: string | null;
    dark_mode?: boolean | null;
    sidebar_collapse?: boolean | null;
    default_board_id?: string | null;
    board_view?: 'list' | 'grid' | null;
    notifications?: boolean | null;
}

type SubmitUpdateAvatarRequest = {
    image: File;
}