import React, {useContext} from "react";
import {SearchContext, SearchContextType} from "./SearchContext.ts";
import {UserCard} from "../UserCard/UserCard";
import {useVirtualizer} from "@tanstack/react-virtual";

import "./style.css";


export function SearchResults() {
    const {data} = useContext<SearchContextType>(SearchContext);

    const count: number = 1;
    const parentElement = React.useRef(null);
    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => parentElement.current,
        estimateSize: () => 128
    });


    return (
        data.users.length === 0 ? (
            <div className="zeroFound">
                <p>Don't found users</p>
            </div>
        ) : (
            <div className="usersList" ref={parentElement}>
                <div
                    style={{position: "relative", height: virtualizer.getTotalSize(), width: '100%'}}>
                    {virtualizer.getVirtualItems().map((virtualItem) => (
                        <div
                            key={virtualItem.key}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${virtualItem.size}px`,
                                transform: `translateY(${virtualItem.start}px)`,
                            }}
                        >
                            <div className="usersList">
                                {data.users.map((user) => (
                                    <UserCard key={user.id} {...user} />
                                ))} </div>

                        </div>
                    ))}
                </div>
            </div>
        )
    )
}
