import ProfileCardDropDown from "./ProfileCardDropDown";

export default function ProfileCard({
  name,
  designation,
  imageUrl,
  employeeId,
}) {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <ProfileCardDropDown employeeId={employeeId} />
      <div className="flex flex-col items-center pb-10">
        <div className="w-20 h-20 bg-gray-200 rounded-full mb-3 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-4xl text-gray-500">{name.charAt(0)}</span>
          )}
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {designation}
        </span>
        <div className="flex mt-4 md:mt-6">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Message
          </a>
        </div>
      </div>
    </div>
  );
}
