export function DobContainer() {
  return (
    <div className="bg-white shadow sm:rounded-lg w-1/4">
      <div className="px-4 py-5 sm:p-6 align-center">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          What is your birthday?
        </h3>
        <form className="mt-5 sm:flex sm:items-center">
          <div className="w-full flex sm:max-w-xs">
            <div>
              <label htmlFor="Month" className="">
                Month
              </label>
              <input
                type="number"
                min={1}
                max={12}
                name="month"
                id="month"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="MM"
              />
            </div>
            <div>
              <label htmlFor="day" className="">
                Day
              </label>
              <input
                type="number"
                name="day"
                id="day"
                min={1}
                max={31}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="DD"
              />
            </div>
            <div>
              <label htmlFor="year" className="">
                Year
              </label>
              <input
                type="number"
                name="year"
                id="year"
                min={1900}
                max={9999}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="YYYY"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
