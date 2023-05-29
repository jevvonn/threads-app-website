export default function BaseFollowingWidget({
  changeBase,
  base,
  isFull = false,
}) {
  return (
    <div className={`w-full ${!isFull ? "md:w-11/12" : ""} flex`}>
      <button
        onClick={() => changeBase("")}
        className={
          base == ""
            ? `activeTabStyle rounded-l font-semibold`
            : `baseStyleTab rounded-l font-semibold`
        }
      >
        {"All Thred's"}
      </button>
      <button
        onClick={() => changeBase("following")}
        className={
          base == "following"
            ? `activeTabStyle rounded-r font-semibold`
            : `baseStyleTab rounded-r font-semibold`
        }
      >
        Following
      </button>
    </div>
  );
}
