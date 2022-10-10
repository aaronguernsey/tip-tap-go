type Props = {
  isActive?: boolean;
  classes?: string;
  children?: any;
  onClick?: any;
};

export const Button = ({ onClick, children, isActive, classes }: Props) => {
  // className={`button button-primary button-primary-${
  //   isActive ? "active" : "inactive"
  // }`}
  return (
    <button
      className={`min-w-[10rem] text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
        classes ?? ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
