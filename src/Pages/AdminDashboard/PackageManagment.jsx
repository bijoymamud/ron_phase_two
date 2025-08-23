import { LuPlus } from "react-icons/lu";

const PackageManagment = () => {
  return (
    <section>
      <div className="border-b">
        <div className="flex items-end   justify-between mb-5">
          <div>
            <h1 className="text-[#0A112F] text-[24px] font-semibold">
              Package Management
            </h1>
            <p className="text-[#585860] text-[16px] font-medium">
              All packages are shown as cards. Create or edit anytime.
            </p>
          </div>

          <div className="bg-[#0A3161] w-[200px] py-[10px] rounded-[8px] hover:cursor-pointer dark:text-white text-white flex items-center justify-center ">
            <button className="uppercase flex items-center gap-2 dark:te">
              <LuPlus className="dark:text-white text-white" />
              subscription
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageManagment;
