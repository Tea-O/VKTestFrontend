import {Dispatch, SetStateAction, createContext} from "react";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
    address: {
        city: string;
    }
}

export type SetIsLoadingAction = Dispatch<SetStateAction<boolean>>;

export interface SearchContextType {
    data: {
        users: User[];
    };
    setInput: Dispatch<SetStateAction<{
        users: User[];
    }>>;
}

export const SearchContext = createContext<SearchContextType>({
    data: {users: []},
    setInput: () => {}
});