import React, { FC } from 'react'

type SpinerProps = {
    size?: string
}

export const Spinner: FC<SpinerProps> = ({size}) => {
    switch (size) {
        case 'small':
            return <div className="tw-m-2 tw-w-8 tw-h-8 tw-rounded-full tw-border-4 tw-border-gray-400 tw-border-t-gray-900 tw-animate-spin"></div>
        default:
            return <div className="tw-mx-auto tw-mt-12 tw-w-20 tw-h-20 tw-rounded-full tw-border-8 tw-border-gray-400 tw-border-t-gray-900 tw-animate-spin"></div>
    }
}