interface Props {
    size?: number;
    fill?: string;
    width?: number;
    height?: number;
 }
 
 export const CloseIcon = ({fill, size, height, width, ...props}: Props) => {
    return (
       <svg
            width={size || width || 24}
            height={size || height || 24}
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
            {...props}
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
        </svg>
    );
 };
 