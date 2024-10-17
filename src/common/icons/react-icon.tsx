import React from 'react'
import { IconProps } from '@/common/types'

const ReactIcon = (props: IconProps) => {
  return (
    <svg viewBox='0 0 20 18' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M19.718 9C19.718 7.571 18.379 6.319 16.251 5.5C16.28 5.32 16.328 5.13 16.351 4.955C16.568 2.897 16.078 1.412 14.972 0.773004C13.737 0.0590035 11.989 0.587004 10.221 2.012C8.45 0.589004 6.7 0.0610035 5.468 0.773004C4.361 1.412 3.868 2.897 4.089 4.955C4.107 5.13 4.156 5.32 4.184 5.5C2.057 6.319 0.718 7.571 0.718 9C0.718 10.429 2.057 11.681 4.184 12.5C4.156 12.68 4.107 12.87 4.089 13.045C3.871 15.103 4.361 16.588 5.468 17.227C5.844 17.44 6.271 17.549 6.703 17.543C8.01374 17.4225 9.24849 16.8744 10.217 15.983C11.1858 16.8746 12.4209 17.4227 13.732 17.543C14.1647 17.5491 14.5913 17.4401 14.968 17.227C16.074 16.588 16.568 15.103 16.347 13.045C16.328 12.87 16.28 12.68 16.247 12.5C18.379 11.681 19.718 10.429 19.718 9ZM13.708 1.452C13.9734 1.44598 14.2357 1.51051 14.468 1.639C15.201 2.063 15.523 3.232 15.352 4.851C15.34 4.957 15.309 5.073 15.294 5.181C14.452 4.93767 13.5953 4.76334 12.724 4.658C12.1969 3.95376 11.6126 3.29419 10.977 2.686C11.7361 1.99955 12.6911 1.56803 13.708 1.452ZM5.791 10.233C5.963 10.573 6.126 10.913 6.32 11.25C6.514 11.587 6.715 11.906 6.92 12.219C6.37741 12.1254 5.84081 11.9998 5.313 11.843C5.43997 11.2973 5.59959 10.7596 5.791 10.233ZM5.312 6.157C5.83981 6.00018 6.37641 5.87463 6.919 5.781C6.71367 6.093 6.51367 6.416 6.319 6.75C6.124 7.085 5.962 7.427 5.79 7.767C5.59933 7.24034 5.44 6.70367 5.312 6.157ZM6.3 9C6.56566 8.40176 6.86205 7.81765 7.188 7.25C7.51867 6.682 7.87733 6.132 8.264 5.6C8.883 5.539 9.534 5.5 10.218 5.5C10.9013 5.50067 11.552 5.534 12.17 5.6C12.5567 6.13323 12.9168 6.68524 13.249 7.254C13.5743 7.82134 13.87 8.40334 14.136 9C13.6042 10.1987 12.9497 11.3391 12.183 12.403C10.8761 12.5375 9.55888 12.5375 8.252 12.403C7.86977 11.8698 7.51401 11.3182 7.186 10.75C6.86073 10.1823 6.56501 9.5982 6.3 9ZM14.116 11.25C14.316 10.913 14.474 10.573 14.646 10.233C14.8367 10.7603 14.996 11.2973 15.124 11.844C14.5956 11.9987 14.0592 12.1243 13.517 12.22C13.719 11.906 13.921 11.585 14.114 11.25H14.116ZM14.646 7.767C14.474 7.427 14.311 7.087 14.116 6.75C13.9253 6.42103 13.7252 6.09757 13.516 5.78C14.0587 5.87467 14.594 6 15.122 6.156C14.9951 6.70209 14.8354 7.24006 14.644 7.767H14.646ZM10.217 3.34C10.617 3.71534 10.9937 4.113 11.347 4.533C10.977 4.51234 10.6007 4.50134 10.218 4.5C9.644 4.498 9.458 4.513 9.087 4.533C9.44033 4.113 9.817 3.71534 10.217 3.34ZM5.968 1.64C6.20032 1.51151 6.46258 1.44698 6.728 1.453C7.74405 1.56915 8.69829 2.00029 9.457 2.686C8.82145 3.29419 8.23713 3.95376 7.71 4.658C6.83933 4.76334 5.983 4.938 5.141 5.182C5.126 5.073 5.094 4.957 5.083 4.851C4.912 3.232 5.234 2.064 5.968 1.64ZM1.718 9C1.718 8.1 2.692 7.17 4.363 6.494C4.581 7.351 4.867 8.189 5.219 9C4.867 9.811 4.581 10.65 4.363 11.506C2.692 10.83 1.718 9.9 1.718 9ZM5.968 16.361C5.234 15.938 4.912 14.768 5.083 13.149C5.094 13.043 5.126 12.927 5.141 12.818C5.98233 13.0613 6.837 13.236 7.705 13.342C8.23627 14.049 8.82385 14.7118 9.462 15.324C8.041 16.433 6.748 16.812 5.968 16.361ZM9.078 13.466C9.45133 13.488 9.83133 13.4993 10.218 13.5C10.6047 13.4993 10.9843 13.488 11.357 13.466C11.0015 13.8933 10.6208 14.299 10.217 14.681C9.81356 14.299 9.43322 13.8932 9.078 13.466ZM14.468 16.361C13.686 16.812 12.393 16.433 10.968 15.323C11.6074 14.7123 12.1951 14.0497 12.725 13.342C13.5926 13.2363 14.4503 13.0614 15.29 12.819C15.305 12.927 15.336 13.043 15.348 13.149C15.523 14.768 15.2 15.938 14.468 16.361ZM16.068 11.507C15.8512 10.65 15.5663 9.81165 15.216 9C15.5687 8.18667 15.854 7.351 16.072 6.493C17.743 7.17 18.718 8.1 18.718 9C18.718 9.9 17.743 10.83 16.072 11.507H16.068Z'
        fill='currentColor'
      />
      <path
        d='M10.215 10.773C10.5693 10.7742 10.9161 10.6703 11.2114 10.4745C11.5067 10.2786 11.7373 9.99964 11.8741 9.67277C12.0109 9.3459 12.0477 8.98581 11.9799 8.63802C11.912 8.29024 11.7426 7.97036 11.4931 7.71883C11.2435 7.4673 10.9249 7.29541 10.5777 7.22487C10.2304 7.15434 9.87008 7.18834 9.54215 7.32256C9.21422 7.45679 8.93344 7.68522 8.73531 7.97899C8.53718 8.27276 8.43058 8.61867 8.429 8.973V8.979C8.42808 9.21418 8.47359 9.44722 8.56292 9.66478C8.65225 9.88233 8.78364 10.0801 8.94957 10.2468C9.11549 10.4134 9.31268 10.5457 9.52983 10.636C9.74698 10.7263 9.97982 10.7729 10.215 10.773Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default ReactIcon
