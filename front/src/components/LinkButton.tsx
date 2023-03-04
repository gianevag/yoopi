import React from 'react'

export type LinkButtonType = 'google' | 'tripadvisor'

interface ButtonProperties {
    onClick: (e: any, type?: any) => void
    children: React.ReactNode
}

export const LinkButton: React.FC<ButtonProperties> = function Button(
    props: ButtonProperties
) {
    return (
        <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="#9ca3af"
            className="text-gray-500 font-bold text-left text-sm py-2 px-4 rounded-lg border border-gray-300 w-full"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
