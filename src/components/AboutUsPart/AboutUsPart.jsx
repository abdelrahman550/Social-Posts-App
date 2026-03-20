import DashBoardTile from "../AboutUsCard/DashBoardTile";

export default function AboutUsPart() {
  return (
    <>
      <div className="left-intro-pt w-[90%] md:w-[60%] xl:w-xl lg:w-lg order-2 lg:order-0">
        <div className="hidden lg:block">
          <h1 className="text-6xl font-extrabold tracking-tight text-blue-900">
            Route Posts
          </h1>
          <p className="mt-4 text-2xl font-medium text-slate-800">
            Connect with friends and the world around you on Route Posts.
          </p>
        </div>

        <div className="about-card mt-6 rounded-2xl border border-[#c9d5ff] bg-white/80 p-4 text-center shadow-sm backdrop-blur sm:p-5 lg:text-left">
          <p className="text-sm font-extrabold tracking-[1.96px] text-blue-900 uppercase">
            About Route Academy
          </p>
          <p className="mt-1 text-lg font-bold text-slate-900">
            Egypt's Leading IT Training Center Since 2012
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Route Academy is the premier IT training center in Egypt,
            established in 2012. We specialize in delivering high-quality
            training courses in programming, web development, and application
            development. We've identified the unique challenges people may face
            when learning new technology and made efforts to provide strategies
            to overcome them.
          </p>
          <div className="dashboard-info mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            <DashBoardTile text={"Founded"} value={"2012"} />
            <DashBoardTile text={"Graduates"} value={"40K+"} />
            <DashBoardTile text={"Partner Companies"} value={"50+"} />
            <DashBoardTile text={"Branches"} value={"5"} />
            <DashBoardTile text={"Diplomas Available"} value={"20"} />
          </div>
        </div>
      </div>
    </>
  );
}
