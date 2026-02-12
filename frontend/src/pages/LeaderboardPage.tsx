import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { getLeaderboard, getMyRank, type LeaderboardItem, type MyRankResponse } from "../api/leaderboard";
import { useAuth } from "../auth/AuthContext";
import PixelLogo from "../components/PixelLogo";

const LeaderboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<LeaderboardItem[]>([]);
  const [myRank, setMyRank] = useState<MyRankResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const leaderboardPromise = getLeaderboard({ mode: "time", page: 1, pageSize: 20 });
        const myRankPromise = user ? getMyRank("time") : Promise.resolve(null);
        const [leaderboard, mine] = await Promise.all([leaderboardPromise, myRankPromise]);

        if (cancelled) return;
        setItems(leaderboard.items);
        setMyRank(mine);
      } catch (e) {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : "Failed to load leaderboard";
        setError(message);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const mySummary = useMemo(() => {
    if (!user) return "Sign in to view your personal rank";
    if (!myRank || myRank.rank === null) return "You do not have any match records yet";
    return `Current Rank: #${myRank.rank} | Best Speed: ${myRank.bestWpm ?? 0} WPM`;
  }, [myRank, user]);

  const topThree = items.slice(0, 3);
  const others = items.slice(3);

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-mono">
      <PixelLogo />

      <ThemeToggle />

      <div className="fixed top-7 right-20 z-50 flex items-center gap-3">
        <Link to="/profile" className="pixel-button text-sm font-bold">
          Profile
        </Link>
        <Link to="/typing" className="pixel-button text-sm font-bold">
          Practice
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="pixel-button text-sm font-bold"
        >
          Log out
        </button>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-4 tracking-wider uppercase">
            Leaderboard
          </h2>
          <div className="inline-block px-4 py-2 border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-600 dark:text-slate-400">
            {mySummary}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl animate-pulse text-slate-500">Loading...</div>
          </div>
        )}
        
        {error && (
          <div className="pixel-card border-red-500 text-red-500 text-center my-10">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Top 3 Section */}
            <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-16 px-4">
              {/* 2nd Place */}
              {topThree[1] && (
                <div className="w-full md:w-64 order-2 md:order-1">
                  <div className="text-center mb-2 font-bold text-slate-500">2ND</div>
                  <div className="pixel-card pixel-card-silver flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 border-4 border-slate-400 mb-3 flex items-center justify-center text-2xl">
                      🥈
                    </div>
                    <div className="font-bold text-xl mb-1 truncate w-full px-2">
                      {topThree[1].username}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                      {topThree[1].bestWpm} WPM
                    </div>
                    <div className="text-xs text-slate-500">
                      Acc: {topThree[1].bestAccuracy !== null ? `${Math.round(topThree[1].bestAccuracy * 100)}%` : "-"}
                    </div>
                  </div>
                </div>
              )}

              {/* 1st Place */}
              {topThree[0] && (
                <div className="w-full md:w-72 order-1 md:order-2">
                  <div className="text-center mb-2 font-bold text-yellow-500 text-xl animate-bounce">1ST</div>
                  <div className="pixel-card pixel-card-gold flex flex-col items-center text-center py-8">
                    <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-800/50 border-4 border-yellow-500 mb-4 flex items-center justify-center text-4xl">
                      👑
                    </div>
                    <div className="font-black text-2xl mb-1 truncate w-full px-2 text-yellow-700 dark:text-yellow-400">
                      {topThree[0].username}
                    </div>
                    <div className="text-yellow-800 dark:text-yellow-300 font-bold text-lg mb-2">
                      {topThree[0].bestWpm} WPM
                    </div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-500">
                      Accuracy: {topThree[0].bestAccuracy !== null ? `${Math.round(topThree[0].bestAccuracy * 100)}%` : "-"}
                    </div>
                  </div>
                </div>
              )}

              {/* 3rd Place */}
              {topThree[2] && (
                <div className="w-full md:w-64 order-3 md:order-3">
                  <div className="text-center mb-2 font-bold text-orange-500">3RD</div>
                  <div className="pixel-card pixel-card-bronze flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 border-4 border-orange-400 mb-3 flex items-center justify-center text-2xl">
                      🥉
                    </div>
                    <div className="font-bold text-xl mb-1 truncate w-full px-2">
                      {topThree[2].username}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                      {topThree[2].bestWpm} WPM
                    </div>
                    <div className="text-xs text-slate-500">
                      Acc: {topThree[2].bestAccuracy !== null ? `${Math.round(topThree[2].bestAccuracy * 100)}%` : "-"}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Others List Section */}
            <div className="w-full overflow-hidden">
              <div className="pixel-card p-0! overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-100 dark:bg-slate-700 border-b-4 border-slate-800 dark:border-slate-100">
                    <tr>
                      <th className="px-6 py-4 font-black uppercase text-sm">Rank</th>
                      <th className="px-6 py-4 font-black uppercase text-sm">Player</th>
                      <th className="px-6 py-4 font-black uppercase text-sm text-right">Best WPM</th>
                      <th className="px-6 py-4 font-black uppercase text-sm text-right">Accuracy</th>
                      <th className="px-6 py-4 font-black uppercase text-sm text-right hidden sm:table-cell">Games</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-slate-200 dark:divide-slate-700">
                    {others.map((item) => {
                      const isMe = user?.id === item.userId;
                      return (
                        <tr
                          key={item.userId}
                          className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                            isMe ? "bg-yellow-50 dark:bg-yellow-900/20" : ""
                          }`}
                        >
                          <td className="px-6 py-4 font-bold">#{item.rank}</td>
                          <td className="px-6 py-4">
                            <span className="font-bold">{item.username}</span>
                            {isMe && <span className="ml-2 text-[10px] bg-yellow-400 text-yellow-900 px-1 py-0.5 font-black uppercase">You</span>}
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-blue-600 dark:text-blue-400">{item.bestWpm ?? 0}</td>
                          <td className="px-6 py-4 text-right">
                            {item.bestAccuracy !== null ? `${Math.round(item.bestAccuracy * 100)}%` : "-"}
                          </td>
                          <td className="px-6 py-4 text-right hidden sm:table-cell text-slate-500">
                            {item.totalGames}
                          </td>
                        </tr>
                      );
                    })}
                    {others.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-slate-500 italic">
                          No more data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
