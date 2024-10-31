const Badge = (props: any) => {
  return (
    <>
      {props.type == "1" && (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
          {props.value}
        </span>
      )}
      {props.type == "dark" && (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
          {props.value}
        </span>
      )}
      {props.type == "danger" && (
        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
          {props.value}
        </span>
      )}
      {props.type == "3" && (
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          {props.value}
        </span>
      )}
      {props.type == "2" && (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
          {props.value}
        </span>
      )}
      {props.type == "indigo" && (
        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
          {props.value}
        </span>
      )}
      {props.type == "purple" && (
        <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
          {props.value}
        </span>
      )}
      {props.type == "pink" && (
        <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
          {props.value}
        </span>
      )}
    </>
  );
};

export default Badge;
