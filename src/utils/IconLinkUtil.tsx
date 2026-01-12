import { IconLinkProps } from "../types/IconProps";

export function IconLink({href, label, icon, openInNewTab}:IconLinkProps) {
    const externalProps = openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {};

    return (
        <a
            href={href}
            aria-label={openInNewTab ? `${label} (opens in a new tab)` : label} 
            {...externalProps}
            className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-vt-maroon
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-maroon focus-visible:ring-offset-2">
            {icon}

            {/*tooltip*/}
            <span
                role="tooltip"
                className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2
                        max-w-[calc(100vw-2rem)] whitespace-normal wrap-break-words text-center
                        rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity
                        group-hover:opacity-100 group-focus-within:opacity-100"
                aria-hidden="true" >
                        {label}
            </span>
        </a>
    );
}