import { SparkleeLogo } from "./logo";

function Footer() {
  return (
    <div className="w-full p-4">
      <div className="flex w-full items-center justify-between px-24 opacity-50 hover:opacity-100 transition-all">
        <span className="scale-75">

        <SparkleeLogo />
        </span>
        <ul className="flex items-center justify-center gap-8 text-xs">
          <li className="cursor-pointer hover:text-indigo-500 hover:underline">
            Feedback
          </li>
          <li className="cursor-pointer hover:text-indigo-500 hover:underline">
            Accessibility
          </li>
          <li className="cursor-pointer hover:text-indigo-500 hover:underline">
            Info
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
