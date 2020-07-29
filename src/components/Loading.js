import React from 'react';
import './Styles.scss';
export default () => {
    return (
        <div class="LoadingComponent">
            <div class="LoadingComponent__Spinner">
                <svg id="loading-spinner" width="45" height="45" viewBox="0 0 48 48">
                    <g fill="transparent" transform="translate(-8 -8)">
                        <path
                            fill="#7dcbb4"
                            d="M32,56 C18.745166,56 8,45.254834 8,32 C8,18.745166 18.745166,8 32,8 C45.254834,8 56,18.745166 56,32 C56,45.254834 45.254834,56 32,56 Z M32,52 C43.045695,52 52,43.045695 52,32 C52,20.954305 43.045695,12 32,12 C20.954305,12 12,20.954305 12,32 C12,43.045695 20.954305,52 32,52 Z"
                        />

                        <circle fill="#531c58" cx="16.59" cy="16" r="1.82" />
                    </g>
                </svg>
            </div>
        </div>
    );
};
